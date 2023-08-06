import { ServerSetup } from "../ServerSetup";
import {PrismaClient} from "@prisma/client";


export class Role extends ServerSetup {
    //private secretKey: string;

    constructor() {
        super();
        this.readRoles();
        this.readRoleById();
    }
    create(): any {
            }
            update(): any {
        }
        read(): any {
        }
            deletee(): any {
        }

    readRoleById() {
        this.app.get('/roles/:id', async (req: any, res: any) => {
            try {
                const roleId = parseInt(req.params.id);
                const role = await this.prisma.role.findUnique({
                    where: { id: roleId }
                });

                if (!role) {
                    return res.status(404).json({ error: 'Role not found' });
                }

                res.status(200).json(role);
            } catch (error) {
                console.error('Error retrieving role:', error);
                res.status(500).json({ error: 'Failed to retrieve role' });
            }
        });
    }
    readRoles() {
        this.app.get('/allRoles', async (req: any, res: any) => {
            try {
                const roles = await this.prisma.role.findMany();
                res.status(200).json(roles);
            } catch (error) {
                console.error('Error retrieving roles:', error);
                res.status(500).json({ error: 'Failed to retrieve roles' });
            }
        });
    }
}