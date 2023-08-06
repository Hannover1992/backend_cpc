import { ServerSetup } from "../ServerSetup";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
//import speakeasy from "speakeasy";
import * as speakeasy from 'speakeasy';
import * as qrcode from 'qrcode';
import { PrismaClient } from "@prisma/client";
interface SpeakeasySecret {
    ascii: string;
    hex: string;
    base32: string;
    otpauth_url?: string;
}
interface UserInterface {
    id: number;
    name: string;
    email: string;
    password: string;
    twoFactorSecret: string | null;
    role: string;
    isActive: boolean;
}
declare module 'express' {
    interface Request {
        user?: UserInterface;
    }
}
export class User extends ServerSetup {
    get speakeasy(): any {
        return this._speakeasy;
    }

    set speakeasy(value: any) {
        this._speakeasy = value;
    }

    private secretKey: string;
    private _speakeasy: any;
    private qrcode: any;

    constructor(secretKey: string) {
        super();
        this.secretKey = secretKey;
        this._speakeasy = speakeasy;
        this.login();
        this.create();
        this.read();
        this.update();
        this.deletee();
        this.readUsers();
        this.updateStatus();
        //this.TwoFactorAuth();
        this.verifyOTP();
    }

    create() {
        this.app.post('/user', async (req: any, res: any) => {
            try {
                const { name, email, password } = req.body;

                const existingUser = await this.prisma.user.findUnique({ where: { email } });
                if (existingUser) {
                    res.status(400).json({ error: "User with this email already exists" });
                    return;
                }

                const hashedPassword = await bcrypt.hash(password, 10);

                const createdUser = await this.prisma.user.create({
                    data: {
                        name,
                        email,
                        password: hashedPassword,
                    },
                });

                const token = this.generateToken(createdUser.id); // Generate JWT token

                res.status(201).json({ user: createdUser, token });
            } catch (error) {
                console.error("Error creating user:", error);
                res.status(500).json({ error: "Failed to create user" });
            }
        });
    }

    readUsers() {
        this.app.get('/allusers', async (req: any, res: any) => {
            try {
                const users = await this.prisma.user.findMany({
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                        isActive: true
                    }
                });
                res.status(200).json(users);
            } catch (error) {
                console.error('Error retrieving users:', error);
                res.status(500).json({ error: 'Failed to retrieve users' });
            }
        });
    }


    read() {
        this.app.get('/user/:id', async (req: any, res: any) => {
            try {
                const userId = req.params.id;
                const user = await this.prisma.user.findUnique({
                    where: { id: userId },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                        isActive: true
                    },
                });
                if (user) {
                    res.status(200).json(user);
                } else {
                    res.status(404).json({ error: "User not found" });
                }
            } catch (error) {
                console.error("Error retrieving user:", error);
                res.status(500).json({ error: "Failed to retrieve user" });
            }
        });
    }

    update() {
        this.app.put('/user/:id', async (req: any, res: any) => {
            try {
                const userId = req.params.id;
                const userData = req.body;
                const updatedUser = await this.prisma.user.update({
                    where: { id: userId },
                    data: userData,
                });
                res.status(200).json(updatedUser);
            } catch (error) {
                console.error("Error updating user:", error);
                res.status(500).json({ error: "Failed to update user" });
            }
        });
    }

    updateStatus() {
        this.app.put('/updateStatus/:id', async (req: any, res: any) => {
            try {
                const userId = req.params.id;
                const { role, isActive } = req.body;
                const loginAttempts = 0;
                const updatedUser = await this.prisma.user.update({
                    where: { id: userId },
                    data: {loginAttempts, role, isActive},
                });
                res.status(200).json(updatedUser);
            } catch (error) {
                console.error("Error updating user:", error);
                res.status(500).json({ error: "Failed to update user" });
            }
        });
    }


    deletee() {
        this.app.delete('/user/:id', async (req: any, res: any) => {
            try {
                const userId = req.params.id;
                await this.prisma.user.delete({
                    where: { id: userId },
                });
                res.status(204).send();
            } catch (error) {
                console.error("Error deleting user:", error);
                res.status(500).json({ error: "Failed to delete user" });
            }
        });
    }

    login() {
        this.app.post('/login', async (req: any, res: any) => {
            this.allow_communikation_from_all_ip_adress(res);

            const { email, password } = req.body;

            try {
                const user = await this.prisma.user.findUnique({ where: { email } });

                if (!user) {
                    return res.status(400).json({ success: false, message: "invalid username or password" });
                }

                if (!user.isActive) {
                    return res.status(401).json({ success: false, message: "User is not activated. Please contact the admin." });
                }

                const passwordMatches = await bcrypt.compare(password, user.password);

                if (!passwordMatches) {
                    user.loginAttempts += 1;

                    if (user.loginAttempts >= 8) { // adjust this value as necessary
                        user.isActive = false;
                    }

                    await this.prisma.user.update({
                        where: { id: user.id },
                        data: { loginAttempts: user.loginAttempts, isActive: user.isActive },
                    });

                    return res.status(401).json({ success: false, message: "invalid username or password" });
                }

                user.loginAttempts = 0;
                await this.prisma.user.update({
                    where: { id: user.id },
                    data: { loginAttempts: user.loginAttempts },
                });

                // Generate access token
                const pre2FAToken = jwt.sign({ id: user.id,role:user.role, pre2FA: true }, this.secretKey, { expiresIn: '3m' });
                // instade of 8h -> 15m !
                // If 2FA is enabled for the user, return a specific status code
                if (user.twoFactorSecret) {
                    return res.status(200).json({ success: true, message: "OTP required for 2FA verification", pre2FAToken });
                } else {
                    const { otpAuthUrl, qrCodeData } = await this.enableTwoFactorAuth(user);

                    return res.status(200).json({ success: true, message: "Two-factor auth enabled", otpAuthUrl, qrCodeData, pre2FAToken });
                }

                return res.status(200).json({ success: true, message: "Login successful", pre2FAToken });

            } catch (error) {
                console.error("Error logging in user:", error);
                return res.status(500).json({ success: false, message: "Something went wrong. Please try later" });
            }
        });
    }


/*

    async enableTwoFactorAuth(user: UserInterface) {
        const secret = speakeasy.generateSecret({ length: 20 });
       ///// const otpAuthUrl = 'otpauth://totp/backend_22?secret=${secret.base32}&issuer=backend_22';
           speakeasy.otpauthURL({
            secret: secret.base32,
            label: 'backend_22',
            issuer: 'backend_22',
        });

        const qrCodeData = await qrcode.toDataURL(otpAuthUrl);

        // Save the twoFactorSecret to the user's record in the database
        await this.prisma.user.update({
            where: { id: user.id },
            data: { twoFactorSecret: secret.base32 },
        });
        const updatedUser = await this.prisma.user.findUnique({ where: { id: user.id } });
        console.log('Saved Secret (Base32):', updatedUser?.twoFactorSecret);

        return { otpAuthUrl, qrCodeData };
    }
*/
///////////////////////////////////////7




    async enableTwoFactorAuth(user: UserInterface) {
        // Generate Secret
        const secret = this.generateSecret();

        // Generate QR code
        const qrCodeData = await this.generateQRCode(secret);

        // Save the twoFactorSecret to the user's record in the database
        await this.updateUserSecret(user, secret);

        // Fetch updated user
        const updatedUser = await this.getUser(user.id);

        // Return the OTP Auth URL and QR code
        return { otpAuthUrl: this.createOTPAuthURL(secret), qrCodeData };
    }

    private generateSecret(): SpeakeasySecret {
        const secret = speakeasy.generateSecret({ length: 20 });
        return secret;
    }

    private async generateQRCode(secret: SpeakeasySecret) {
        const otpAuthUrl = this.createOTPAuthURL(secret);
        const qrCodeData = await qrcode.toDataURL(otpAuthUrl);
        return qrCodeData;
    }


    private createOTPAuthURL(secret: SpeakeasySecret) {

            return `otpauth://totp/backend_22?secret=${secret.base32}&issuer=backend_22`;
        }

    private async updateUserSecret(user: UserInterface, secret: SpeakeasySecret) {
        await this.prisma.user.update({
            where: { id: user.id },
            data: { twoFactorSecret: secret.base32 },
        });
    }

    private async getUser(id: number) {
        return await this.prisma.user.findUnique({ where: { id: id } });
    }



//////////////////////////////////////

/*
    // Add types to the method parameters:
    async enableTwoFactorAuth(req: Request, res: Response) {
        const secret = speakeasy.generateSecret({ length: 20 });
        const otpAuthUrl = speakeasy.otpauthURL({
            secret: secret.base32,
            label: 'backend_22',
            issuer: 'backend_22',
        });

        // Generate QR code
        qrcode.toDataURL(otpAuthUrl)
            .then(async (qrCodeData: string) => {
                // Assuming `req.user` holds the authenticated user information
                const user = req.user as UserInterface;

                if (!user) {
                    return res.status(404).json({ error: "User not found" });
                }

                try {
                    // Save the twoFactorSecret to the user's record in the database
                    await this.prisma.user.update({
                        where: { id: user.id },
                        data: { twoFactorSecret: secret.base32 },
                    });

                    res.status(200).json({ otpAuthUrl, qrCodeData });

                } catch (error) {
                    console.error("Error saving 2FA secret:", error);
                    res.status(500).json({ error: "Failed to save 2FA secret" });
                }
            })
            .catch((err: any) => {
                console.error("Error generating QR code:", err);
                return res.status(500).json({ error: "Failed to generate QR code" });
            });
    }

*/

    verifyOTP() {
        this.app.post('/verify-otp', async (req: any, res: any) => {
            this.allow_communikation_from_all_ip_adress(res);
            const { otp } = req.body;

            // Extract access token from authorization header
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];

            if (!token) {
                return res.status(401).json({ message: "No token provided" });
            }

            // Verify and decode the token
            jwt.verify(token, this.secretKey, async (err: any, decoded: any) => {
                if (err) {
                    console.error("Error verifying token:", err);
                    return res.status(401).json({ message: "Failed to authenticate token" });
                }

                // Use the id from decoded token to fetch user
                const user = await this.prisma.user.findUnique({ where: { id: decoded.id } });

                if (!user) {
                    return res.status(400).json({ message: "User not found" });
                }

                if (!user.twoFactorSecret) {
                    return res.status(400).json({ message: "Two-factor authentication is not enabled for this user" });
                }

                const verified = this._speakeasy.totp.verify({
                    secret: user.twoFactorSecret,
                    encoding: 'base32',
                    token: otp,
                });

                if (!verified) {
                    return res.status(401).json({ message: "Incorrect OTP" });
                }

                const response = { id: user.id, role:user.role};
                const fullAccessToken  = jwt.sign(response, this.secretKey, { expiresIn: '4h' });
                // instade of 8h -> 15m !
                return res.status(200).json({ fullAccessToken  });
            });
        });
    }

/*
    TwoFactorAuth() {
        this.app.post('/enable-2fa', this.authenticateToken.bind(this), (req: Request, res: Response) => {
            this.enableTwoFactorAuth(req, res);
        });
    }
*/
    private generateToken(userId: number): string {
        const payload = { userId };
        const options = { expiresIn: '1h' };
        return jwt.sign(payload, this.secretKey, options);
    }



    async authenticateToken(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (token == null) {
            res.sendStatus(401);
            return;
        }

        jwt.verify(token, this.secretKey, async (err: jwt.VerifyErrors | null, user: any) => {
            if (err) {
                res.sendStatus(403);
                return;
            }
            const dbUser = await this.prisma.user.findUnique({ where: { id: user.id } });
            if (!dbUser) {
                res.status(404).json({ error: "User not found" });
                return;
            }
            req.user = dbUser;
            next();
        });
    }


}
