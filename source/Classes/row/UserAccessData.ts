import { PrismaClient } from "prisma/prisma-client/scripts/default-index";
import { I_UserAccessData } from "../../Interface/row/I_UserAccessData";




export class UserAccessData implements I_UserAccessData {
    private _prisma: PrismaClient;
    private _ID: number;
    private _Programm: string;
    private _UserName: string;
    private _Password: string;
    private _Role: string;

    get ID(): number {
        return this._ID;
    }
    set ID(value: number) {
        this._ID = value;
    }
    get Programm(): string {
        return this._Programm;
    }
    set Programm(value: string) {
        this._Programm = value;
    }
    get UserName(): string {
        return this._UserName;
    }
    set UserName(value: string) {
        this._UserName = value;
    }
    get Password(): string {
        return this._Password;
    }
    set Password(value: string) {
        this._Password = value;
    }
    get Role(): string {
        return this._Role;
    }
    set Role(value: string) {
        this._Role = value;
    }
    get prisma(): PrismaClient {
        return this._prisma;
    }
    set prisma(value: PrismaClient) {
        this._prisma = value;
    }

    constructor(
        prisma: PrismaClient,
        ID: number,
        Programm?: string,
        UserName?: string,
        Password?: string,
        Role?: string
    ) {
        this.prisma = prisma;
        this.ID = ID;
        this.Programm = Programm ?? "";
        this.UserName = UserName ?? "";
        this.Password = Password ?? "";
        this.Role = Role ?? "";
    }


    // async create() {
    //     await this.prisma.tblprojekte.create({
    //         data: {
    //             ID: this.ID,
    //             Standort: this.Standort || "",
    //             Niederlassung: this.Niederlassung || "",
    //             Auftragsart: this.Auftragsart || "",
    //             Status: this.Status || "",
    //             Logistikkoordinator: this.Logistikkoordinator || "",
    //             LK_1: this.LK_1 || "",
    //             LK_2: this.LK_2 || "",
    //             ZuKo: this.ZuKo || "",
    //             Auftragsdatum: this.Auftragsdatum || "",
    //             Startdatum: this.Startdatum || "",
    //             Endtermin: this.Endtermin || "",
    //             Netto_Auftragswert: this.Netto_Auftragswert || "",
    //             Kommentar: this.Kommentar || "",
    //             Anlagenummer: this.Anlagenummer || 0,
    //             PM_1: this.PM_1 || "",
    //             PM_2: this.PM_2 || "",
    //         }
    //     })
    // }
    //

    async create(){
        await this.prisma.tbluseraccessdata.create({
            data:{
                ID: this.ID,
                Programm: this.Programm || "",
                UserName: this.UserName || "",
                Password: this.Password || "",
                Role: this.Role || ""
            }
        })
    }


    // async read(id?: number) {
    //     //read form database if projects exists then set this.name = name from db
    //     await this._prisma.tblprojekte.findMany({
    //         where: {
    //             ID: id || this.ID
    //         }
    //     }).then((result: any) => {
    //         if(result.length > 0) {
    //             this.Standort = result[0].Standort;
    //             this.Niederlassung = result[0].Niederlassung;
    //             this.Auftragsart = result[0].Auftragsart;
    //             this.Status = result[0].Status;
    //             this.Logistikkoordinator = result[0].Logistikkoordinator;
    //             this.LK_1 = result[0].LK_1;
    //             this.LK_2 = result[0].LK_2;
    //             this.ZuKo = result[0].ZuKo;
    //             this.Auftragsdatum = result[0].Auftragsdatum;
    //             this.Startdatum = result[0].Startdatum;
    //             this.Endtermin = result[0].Endtermin;
    //             this.Netto_Auftragswert = result[0].Netto_Auftragswert;
    //             this.Kommentar = result[0].Kommentar;
    //             this.Anlagenummer = result[0].Anlagenummer;
    //             this.PM_1 = result[0].PM_1;
    //             this.PM_2 = result[0].PM_2;
    //         } else {
    //             throw new Error("Project_old not found in db");
    //         }
    //     }).catch(
    //         () => {
    //             throw new Error("Project_old not found in db");
    //         }
    //     )
    // }
    //

    async read(id?: number){
        await this._prisma.tbluseraccessdata.findMany({
            where: {
                ID: id || this.ID
            }
        }).then((result: any) => {
            if(result.length > 0) {
                this.Programm = result[0].Programm;
                this.UserName = result[0].UserName;
                this.Password = result[0].Password;
                this.Role = result[0].Role;
            } else {
                throw new Error("User not found in db");
            }
        }).catch(
            () => {
                throw new Error("User not found in db");
            }
        )
    }


    // async update() {
    //     await this._prisma.tblprojekte.update({
    //         where: {
    //             ID: this.ID
    //         },
    //         data: {
    //             Standort: this.Standort,
    //             Niederlassung: this.Niederlassung,
    //             Auftragsart: this.Auftragsart,
    //             Status: this.Status,
    //             Logistikkoordinator: this.Logistikkoordinator,
    //             LK_1: this.LK_1,
    //             LK_2: this.LK_2,
    //             ZuKo: this.ZuKo,
    //             Auftragsdatum: this.Auftragsdatum,
    //             Startdatum: this.Startdatum,
    //             Endtermin: this.Endtermin,
    //             Netto_Auftragswert: this.Netto_Auftragswert,
    //             Kommentar: this.Kommentar,
    //             Anlagenummer: this.Anlagenummer,
    //             PM_1: this.PM_1,
    //             PM_2: this.PM_2,
    //         }
    //     }).then((result: any) => {
    //         console.log("updated");
    //     })
    // }
    //

    async update(){
        await this._prisma.tbluseraccessdata.update({
            where: {
                ID: this.ID
            },
            data: {
                Programm: this.Programm,
                UserName: this.UserName,
                Password: this.Password,
                Role: this.Role
            }
        }).then((result: any) => {
            console.log("updated");
        })
    }


    // async delete() {
    //     await this._prisma.tblprojekte.delete({
    //         where: {
    //             ID: this.ID
    //         }
    //     });
    // }

    async delete(){
        await this._prisma.tbluseraccessdata.delete({
            where: {
                ID: this.ID
            }
        });
    }


    // public async project_exists_in_db(): Promise<boolean> {
    //     const users = await this._prisma.tblprojekte.findMany
    //     (
    //         {
    //             where: {
    //                 ID: this.ID,
    //                 Standort: this.Standort,
    //                 Niederlassung: this.Niederlassung,
    //                 Auftragsart: this.Auftragsart,
    //                 Status: this.Status,
    //                 Logistikkoordinator: this.Logistikkoordinator,
    //                 LK_1: this.LK_1,
    //                 LK_2: this.LK_2,
    //                 ZuKo: this.ZuKo,
    //                 Auftragsdatum: this.Auftragsdatum,
    //                 Startdatum: this.Startdatum,
    //                 Endtermin: this.Endtermin,
    //                 Netto_Auftragswert: this.Netto_Auftragswert,
    //                 Kommentar: this.Kommentar,
    //                 Anlagenummer: this.Anlagenummer,
    //                 PM_1: this.PM_1,
    //                 PM_2: this.PM_2,
    //             }
    //         }
    //     );
    //     return users.length > 0;
    // }
    //

    public async user_exists_in_db(): Promise<boolean> {
        const users = await this._prisma.tbluseraccessdata.findMany
        (
            {
                where: {
                    ID: this.ID,
                    Programm: this.Programm,
                    UserName: this.UserName,
                    Password: this.Password,
                    Role: this.Role
                }
            }
        );
        return users.length > 0;
    }


    // get_ready_to_send_over_rest_api(): any {
    //     return {
    //         Prisma: null,
    //         ID: this.ID,
    //         Standort: this.Standort,
    //         Niederlassung: this.Niederlassung,
    //         Auftragsart: this.Auftragsart,
    //         Status: this.Status,
    //         Logistikkoordinator: this.Logistikkoordinator,
    //         LK_1: this.LK_1,
    //         LK_2: this.LK_2,
    //         ZuKo: this.ZuKo,
    //         Auftragsdatum: this.Auftragsdatum,
    //         Startdatum: this.Startdatum,
    //         Endtermin: this.Endtermin,
    //         Netto_Auftragswert: this.Netto_Auftragswert,
    //         Kommentar: this.Kommentar,
    //         Anlagenummer: this.Anlagenummer,
    //         PM_1: this.PM_1,
    //         PM_2: this.PM_2,
    //     }
    // }

    get_ready_to_send_over_rest_api(): any {
        return {
            Prisma: null,
            ID: this.ID,
            Programm: this.Programm,
            UserName: this.UserName,
            Password: this.Password,
            Role: this.Role
        }
    }



}
