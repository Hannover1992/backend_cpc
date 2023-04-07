import {PrismaClient} from "@prisma/client";
import {ServerSetup} from "./ServerSetup";


export class Project extends ServerSetup {


    constructor() {
        super();
    }

    private projects_CRUD() {
        this.projects_read();
    }

    private projects_read() {
        this.app.get('/projects', (req: any, res: any) => {
            this.allow_communikation_from_all_ip_adress(res);
            this.prisma.tblprojekte.findMany().
            then((projects: any) => {
                res.status(200).send(projects);
                // console.log(projects)
            } ).catch((error: any) => {
                res.status(500).send({"message": error.message});
            } );
        });
    }
    //

    CRUD() {
        this.read();
        this.create();
        this.update();
        this.deletee();
    }

    private read() {
        this.app.get('/project/:id', (req: any, res: any) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            let id = this.get_id(req);
            this.prisma.tblprojekte.findUnique({
                where: {
                    ID: id
                }
            }).then((project: any) => {
                res.status(200).send(project);
            } ).catch((error: any) => {
                res.status(500).send({"message": error.message});
            } );
        });
    }

    public get_id(req: any) {
        let id_as_string = req.params.id;
        let id = parseInt(id_as_string);
        return id;
    }


    private create() {
        this.app.post('/project/:id', async (req: any, res: any) => {
            this.allow_communikation_from_all_ip_adress(res);
            this.prisma.tblprojekte.create({
                data: req.body
            }) .then((project: any) => {
                res.status(200).send({"message" : "Project created"});
            } ).catch((error: any) => {
                res.status(500).send({"message": error.message});
            });
        });
    }

    private update() {
        this.app.put('/project/:id', (req: any, res: any) => {
            this.allow_communikation_from_all_ip_adress(res);
            let id = this.get_id(req);
            this.prisma.tblprojekte.update({
                where: {
                    ID: id
                },
                data: req.body
            }).then((result: any) => {
                console.log("Project with ID: " + id + " wurde updated");
            }).then(() => {
                res.status(200).send({"message" : "Project updated"});
            }).catch((error: any) => {
                res.status(404).send({"message" : error.message});
            });
        });
    }

    private deletee() {
        this.app.delete('/project/:id', (req: any, res: any) => {
            this.allow_communikation_from_all_ip_adress(res);
            let id = this.get_id(req);
            this.prisma.tblprojekte.delete({
                where: {
                    ID: id
                }
            }) .then(() => {
                res.status(200).send({"message" : "Project deleted"});
            }).catch((error: any) => {
                res.status(404).send({"message" : error.message});
            });
        });
    }

}




