import {generate_test_project, Project} from "../row/project";
import {PrismaClient} from "prisma/prisma-client/scripts/default-index";
import assert = require("assert");
import {I_Projects} from "../../Interface/table/I_Projects";
import {I_CRUD} from "../../Interface/I_CRUD";

//create public class ProjectTable
export  class ProjectTable implements I_Projects{
    private _project: Project[];
    private _length: number;
    private _prisma: PrismaClient;

    get project(): Project[] {
        return this._project;
    }
    get_project(number: number) : Project {
        for (let i = 0; i < this._project.length; i++) {
            if (this._project[i].ID == number) {
                return this._project[i];
            }
        }
        throw new Error("Project not found");
    }
    set project(value: Project[]) {
        this._project = value;
    }

    get length(): number {
        return this._length;
    }
    set length(value: number) {
        this._length = value;
    }

    get prisma(): PrismaClient {
        return this._prisma;
    }
    set prisma(value: PrismaClient) {
        this._prisma = value;
    }


    //create constructor
    constructor(prisma: PrismaClient) {
        this._prisma = prisma;
        this._project = []
        this._length = 0
    }

    //toDo: Promise.All
    async create(...args: any[]): Promise<any> {
        for (let i = 0; i < this._project.length; i++) {
            await this._project[i].create()
        }
        this._length = this._project.length;
    }
    async read(...args: any[]) {
        this._project = [];
        await this._prisma.tblprojekte.findMany()
            .then((result: any) => {
                for (let i = 0; i < result.length; i++) {
                    let project: Project = new Project(
                        this._prisma,
                        result[i].ID,
                        result[i].Standort,
                        result[i].Niederlassung,
                        result[i].Auftragsart,
                        result[i].Status,
                        result[i].Logistikkoordinator,
                        result[i].LK_1,
                        result[i].LK_2,
                        result[i].ZuKo,
                        result[i].Auftragsdatum,
                        result[i].Startdatum,
                        result[i].Endtermin,
                        result[i].Netto_Auftragswert,
                        result[i].Kommentar,
                        result[i].Anlagenummer,
                        result[i].PM_1,
                        result[i].PM_2
                    );
                    this._project.push(project);
                }
                this._length = this._project.length;
            });
    }

    async delete(...args: any[]) {
        return await this._prisma.tblprojekte.deleteMany()
            .then(() => {
              this._length = 0;
              this.project = [];
            }).then(() => {
                assert(this._length == 0);
        });
    }


    async update(...args: any[]): Promise<any> {
        for (let i = 0; i < this._project.length; i++) {
            await this._project[i].update();
        }
    }


    generate_array_of_projects(start: number, end: number) {
        this.project = [];
        for (let i = start; i <= end; i++) {
            let project: Project = generate_test_project(this._prisma, i);
            this._project.push(project);
        }
        this._length = this._project.length;
    }

    print() {
        for (let i = 0; i < this._project.length; i++) {
            console.log("Id:" + this._project[i].ID +
                " Standort:" + this._project[i].Standort +
                " Niederlassung:" + this._project[i].Niederlassung +
                " Auftragsart:" + this._project[i].Auftragsart +
                " Status:" + this._project[i].Status +
                " Logistikkoordinator:" + this._project[i].Logistikkoordinator +
                " LK_1:" + this._project[i].LK_1 +
                " LK_2:" + this._project[i].LK_2 +
                " ZuKo:" + this._project[i].ZuKo +
                " Auftragsdatum:" + this._project[i].Auftragsdatum +
                " Startdatum:" + this._project[i].Startdatum +
                " Endtermin:" + this._project[i].Endtermin +
                " Netto_Auftragswert:" + this._project[i].Netto_Auftragswert +
                " Kommentar:" + this._project[i].Kommentar +
                " Anlagenummer:" + this._project[i].Anlagenummer +
                " PM_1:" + this._project[i].PM_1 +
                " PM_2:" + this._project[i].PM_2
            );
        }
    }

    get_ready_to_send_over_rest_api() {
        let projects_to_send: any[] = [];
        for (let i = 0; i < this._project.length; i++) {
            projects_to_send.push(new Project_to_send(
                this._project[i].ID,
                this._project[i].Standort,
                this._project[i].Niederlassung,
                this._project[i].Auftragsart,
                this._project[i].Status,
                this._project[i].Logistikkoordinator,
                this._project[i].LK_1,
                this._project[i].LK_2,
                this._project[i].ZuKo,
                this._project[i].Auftragsdatum,
                this._project[i].Startdatum,
                this._project[i].Endtermin,
                this._project[i].Netto_Auftragswert,
                this._project[i].Kommentar,
                this._project[i].Anlagenummer,
                this._project[i].PM_1,
                this._project[i].PM_2
                )
            );
        }
        return projects_to_send
    }

    async create_project(project: Project) {
        try {
            this.get_project(project.ID)
        } catch ( error )
        {
            this._project.push(project);
            this._length = this._project.length;
            return await project.create();
        }
        throw  new Error("Project already exists");
    }
}

//toDo: implenet this as a sub class of Project
//create project send interface
export class Project_to_send implements Project_send {
    ID:                     number;
    Standort:               String;
    Niederlassung:          String;
    Auftragsart:            String;
    Status:                 String;
    Logistikkoordinator:    String;
    LK_1:                   String;
    LK_2:                   String;
    ZuKo:                   String;
    Auftragsdatum:          Date;
    Startdatum:             Date;
    Endtermin:              Date;
    Netto_Auftragswert:     String;
    Kommentar:              String;
    Anlagenummer:           number;
    PM_1:                   String;
    PM_2:                   String;

    constructor(
        ID: any, Standort: any, Niederlassung: any, Auftragsart: any, Status: any, Logistikkoordinator: any,
        LK_1: any, LK_2: any, ZuKo: any, Auftragsdatum: any, Startdatum: any,
        Endtermin: any, Netto_Auftragswert: any, Kommentar: any, Anlagenummer: any, PM_1: any, PM_2: any
    ) {
        this.ID = ID;
        this.Standort = Standort;
        this.Niederlassung = Niederlassung;
        this.Auftragsart = Auftragsart;
        this.Status = Status;
        this.Logistikkoordinator = Logistikkoordinator;
        this.LK_1 = LK_1;
        this.LK_2 = LK_2;
        this.ZuKo = ZuKo;
        this.Auftragsdatum = Auftragsdatum;
        this.Startdatum = Startdatum;
        this.Endtermin = Endtermin;
        this.Netto_Auftragswert = Netto_Auftragswert;
        this.Kommentar = Kommentar;
        this.Anlagenummer = Anlagenummer;
        this.PM_1 = PM_1;
        this.PM_2 = PM_2;
    }
}

export interface Project_send {
    ID:                     number;
    Standort:               String;
    Niederlassung:          String;
    Auftragsart:            String;
    Status:                 String;
    Logistikkoordinator:    String;
    LK_1:                   String;
    LK_2:                   String;
    ZuKo:                   String;
    Auftragsdatum:          Date;
    Startdatum:             Date;
    Endtermin:              Date;
    Netto_Auftragswert:     String;
    Kommentar:              String;
    Anlagenummer:           number;
    PM_1:                   String;
    PM_2:                   String;
}
