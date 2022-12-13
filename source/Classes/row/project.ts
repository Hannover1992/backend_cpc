import {PrismaClient} from "prisma/prisma-client/scripts/default-index";
import {I_CRUD} from "../../Interface/I_CRUD";
import {I_Project} from "../../Interface/row/I_Project";

export class Project implements I_Project, I_CRUD {

    //toDo: fuhre LK, Zuko und Pm zu einer Tabelle zusammen
    private _prisma: PrismaClient;
    private _ID:                     number;
    private _Standort:               String;
    private _Niederlassung:          String;
    private _Auftragsart:            String;
    private _Status:                 String;
    private _Logistikkoordinator:    String;
    private _LK_1:                   String;
    private _LK_2:                   String;
    private _ZuKo:                   String;
    private _Auftragsdatum:          Date;
    private _Startdatum:             Date;
    private _Endtermin:              Date;
    private _Netto_Auftragswert:     String;
    private _Kommentar:              String;
    private _Anlagenummer:           number;
    private _PM_1:                   String;
    private _PM_2:                   String;

    get Endtermin(): Date {
        return this._Endtermin;
    }
    set Endtermin(value: Date) {
        this._Endtermin = value;
    }
    get PM_2(): String {
        return this._PM_2;
    }
    set PM_2(value: String) {
        this._PM_2 = value;
    }
    get PM_1(): String {
        return this._PM_1;
    }
    set PM_1(value: String) {
        this._PM_1 = value;
    }
    get Anlagenummer(): number {
        return this._Anlagenummer;
    }
    set Anlagenummer(value: number) {
        this._Anlagenummer = value;
    }
    get Kommentar(): String {
        return this._Kommentar;
    }
    set Kommentar(value: String) {
        this._Kommentar = value;
    }
    get Netto_Auftragswert(): String {
        return this._Netto_Auftragswert;
    }
    set Netto_Auftragswert(value: String) {
        this._Netto_Auftragswert = value;
    }
    get Startdatum(): Date {
        return this._Startdatum;
    }
    set Startdatum(value: Date) {
        this._Startdatum = value;
    }
    get Auftragsdatum(): Date {
        return this._Auftragsdatum;
    }
    set Auftragsdatum(value: Date) {
        this._Auftragsdatum = value;
    }
    get ZuKo(): String {
        return this._ZuKo;
    }
    set ZuKo(value: String) {
        this._ZuKo = value;
    }
    get LK_2(): String {
        return this._LK_2;
    }
    set LK_2(value: String) {
        this._LK_2 = value;
    }
    get LK_1(): String {
        return this._LK_1;
    }
    set LK_1(value: String) {
        this._LK_1 = value;
    }
    get Logistikkoordinator(): String {
        return this._Logistikkoordinator;
    }
    set Logistikkoordinator(value: String) {
        this._Logistikkoordinator = value;
    }
    get Status(): String {
        return this._Status;
    }
    set Status(value: String) {
        this._Status = value;
    }
    get Auftragsart(): String {
        return this._Auftragsart;
    }
    set Auftragsart(value: String) {
        this._Auftragsart = value;
    }
    get Niederlassung(): String {
        return this._Niederlassung;
    }
    set Niederlassung(value: String) {
        this._Niederlassung = value;
    }
    get Standort(): String {
        return this._Standort;
    }
    set Standort(value: String) {
        this._Standort = value;
    }
    get ID(): number {
        return this._ID;
    }
    set ID(value: number) {
        this._ID = value;
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
                Standort?: String,
                Niederlassung?: String,
                Auftragsart?: String,
                Status?: String,
                Logistikkoordinator?: String,
                LK_1?: String,
                LK_2?: String,
                ZuKo?: String,
                Auftragsdatum?: Date,
                Startdatum?: Date,
                Endtermin?: Date,
                Netto_Auftragswert?: String,
                Kommentar?: String,
                Anlagenummer?: number,
                PM_1?: String,
                PM_2?: String
    ) {
        this.prisma = prisma;
        this.ID = ID;
        this.Standort = Standort || "";
        this.Niederlassung = Niederlassung || "";
        this.Auftragsart = Auftragsart || "";
        this.Status = Status || "";
        this.Logistikkoordinator = Logistikkoordinator || "";
        this.LK_1 = LK_1 || "";
        this.LK_2 = LK_2 || "";
        this.ZuKo = ZuKo || "";
        this.Auftragsdatum = Auftragsdatum || new Date(0);
        this.Startdatum = Startdatum || new Date(0);
        this.Endtermin = Endtermin || new Date(0);
        this.Netto_Auftragswert = Netto_Auftragswert || "";
        this.Kommentar = Kommentar || "";
        this.Anlagenummer = Anlagenummer || 0;
        this.PM_1 = PM_1 || "";
        this.PM_2 = PM_2 || "";
    }

    async create() {
        await this.prisma.tblprojekte.create({
            data: {
                ID: this.ID,
                Standort: this.Standort || "",
                Niederlassung: this.Niederlassung || "",
                Auftragsart: this.Auftragsart || "",
                Status: this.Status || "",
                Logistikkoordinator: this.Logistikkoordinator || "",
                LK_1: this.LK_1 || "",
                LK_2: this.LK_2 || "",
                ZuKo: this.ZuKo || "",
                Auftragsdatum: this.Auftragsdatum || "",
                Startdatum: this.Startdatum || "",
                Endtermin: this.Endtermin || "",
                Netto_Auftragswert: this.Netto_Auftragswert || "",
                Kommentar: this.Kommentar || "",
                Anlagenummer: this.Anlagenummer || 0,
                PM_1: this.PM_1 || "",
                PM_2: this.PM_2 || "",
            }
        })
    }

    async read(id?: number) {
        //read form database if projects exists then set this.name = name from db
        await this._prisma.tblprojekte.findMany({
            where: {
                ID: id || this.ID
            }
        }).then((result: any) => {
            if(result.length > 0) {
                this.Standort = result[0].Standort;
                this.Niederlassung = result[0].Niederlassung;
                this.Auftragsart = result[0].Auftragsart;
                this.Status = result[0].Status;
                this.Logistikkoordinator = result[0].Logistikkoordinator;
                this.LK_1 = result[0].LK_1;
                this.LK_2 = result[0].LK_2;
                this.ZuKo = result[0].ZuKo;
                this.Auftragsdatum = result[0].Auftragsdatum;
                this.Startdatum = result[0].Startdatum;
                this.Endtermin = result[0].Endtermin;
                this.Netto_Auftragswert = result[0].Netto_Auftragswert;
                this.Kommentar = result[0].Kommentar;
                this.Anlagenummer = result[0].Anlagenummer;
                this.PM_1 = result[0].PM_1;
                this.PM_2 = result[0].PM_2;
            } else {
                throw new Error("Project not found in db");
            }
        }).catch(
            () => {
                throw new Error("Project not found in db");
            }
        )
    }

    async update() {
        await this._prisma.tblprojekte.update({
            where: {
                ID: this.ID
            },
            data: {
                Standort: this.Standort,
                Niederlassung: this.Niederlassung,
                Auftragsart: this.Auftragsart,
                Status: this.Status,
                Logistikkoordinator: this.Logistikkoordinator,
                LK_1: this.LK_1,
                LK_2: this.LK_2,
                ZuKo: this.ZuKo,
                Auftragsdatum: this.Auftragsdatum,
                Startdatum: this.Startdatum,
                Endtermin: this.Endtermin,
                Netto_Auftragswert: this.Netto_Auftragswert,
                Kommentar: this.Kommentar,
                Anlagenummer: this.Anlagenummer,
                PM_1: this.PM_1,
                PM_2: this.PM_2,
            }
        }).then((result: any) => {
            console.log("updated");
        })
    }

    async delete() {
        await this._prisma.tblprojekte.delete({
            where: {
                ID: this.ID
            }
        })
    }


    public async project_exists_in_db(): Promise<boolean> {
        const users = await this._prisma.tblprojekte.findMany
        (
            {
                where: {
                    ID: this.ID,
                    Standort: this.Standort,
                    Niederlassung: this.Niederlassung,
                    Auftragsart: this.Auftragsart,
                    Status: this.Status,
                    Logistikkoordinator: this.Logistikkoordinator,
                    LK_1: this.LK_1,
                    LK_2: this.LK_2,
                    ZuKo: this.ZuKo,
                    Auftragsdatum: this.Auftragsdatum,
                    Startdatum: this.Startdatum,
                    Endtermin: this.Endtermin,
                    Netto_Auftragswert: this.Netto_Auftragswert,
                    Kommentar: this.Kommentar,
                    Anlagenummer: this.Anlagenummer,
                    PM_1: this.PM_1,
                    PM_2: this.PM_2,
                }
            }
        );
        return users.length > 0;
    }

    get_ready_to_send_over_rest_api(): any {
        return {
            Prisma: null,
            ID: this.ID,
            Standort: this.Standort,
            Niederlassung: this.Niederlassung,
            Auftragsart: this.Auftragsart,
            Status: this.Status,
            Logistikkoordinator: this.Logistikkoordinator,
            LK_1: this.LK_1,
            LK_2: this.LK_2,
            ZuKo: this.ZuKo,
            Auftragsdatum: this.Auftragsdatum,
            Startdatum: this.Startdatum,
            Endtermin: this.Endtermin,
            Netto_Auftragswert: this.Netto_Auftragswert,
            Kommentar: this.Kommentar,
            Anlagenummer: this.Anlagenummer,
            PM_1: this.PM_1,
            PM_2: this.PM_2,
        }
    }

}


export function generate_test_project(prisma: PrismaClient, i: number): Project {

    let random_komments_rick_and_morty = [
        "I'm Pickle Rick!",
        "Wubba Lubba Dub Dub!",
        "I'm Mr. Meeseeks, look at me!",
        "Sometimes science is a lot more art, than science. A lot of people don't get that.",
        " I'm not a scientist. I'm a mad scientist.",
        "I did it. Your parents are going to do it. Break the cycle Morty, rise above, focus on science.",
        "Having a family doesn't mean that you stop being an individual.",
        "Great, now I have to take over an entire planet because of your stupid boobs.",
    ]

    let project = new Project(prisma, i);
    project.Standort = "Standort" + i;
    project.Niederlassung = "Niederlassung" + i;
    project.Auftragsart = "Auftragsart" + i;
    project.Status = "Status" + i;
    project.Logistikkoordinator = "Logistikkoordinator" + i;
    project.LK_1 = "LK_1" + i;
    project.LK_2 = "LK_2" + i;
    project.ZuKo = "ZuKo" + i;
    project.Auftragsdatum = new Date(i);
    project.Startdatum = new Date(i);
    project.Endtermin = new Date(i)
    project.Netto_Auftragswert = "Netto_Auftragswert" + i;
    project.Kommentar = random_komments_rick_and_morty[i % random_komments_rick_and_morty.length]
    project.Anlagenummer = i;
    project.PM_1 = "PM_1" + i;
    project.PM_2 = "PM_2" + i;
    return project;
}
