import {ServerSetup} from "./ServerSetup";


function get_id_from_request(req: any) {
    let id = parseInt(req.params.id);
    return id;
}

export class Project extends ServerSetup {

    //toDo: create helper file with funciton form id to string
    //toDo: extract project Table

    constructor() {
        super();
    }


    //toDo: use this clean code

    // private async createProject(data: any) {
    //     try {
    //         await this.prisma.tblprojekte.create({ data });
    //         return true;
    //     } catch (error) {
    //         console.error("Error creating project:", error);
    //         return false;
    //     }
    // }
    //
    // private sendSuccessResponse(res: any, message: string) {
    //     res.status(200).send({ message });
    // }
    //
    // private sendErrorResponse(res: any, message: string, statusCode: number = 500) {
    //     res.status(statusCode).send({ message });
    // }
    //
    // private create() {
    //     this.app.post('/project/:id', async (req: any, res: any) => {
    //         this.allow_communikation_from_all_ip_adress(res);
    //         const success = await this.createProject(req.body);
    //
    //         if (success) {
    //             this.sendSuccessResponse(res, "Project created");
    //         } else {
    //             this.sendErrorResponse(res, "An error occurred while creating the project");
    //         }
    //     });
    // }


    create() {
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

    read() {
        this.app.get('/project/:id', (req: any, res: any) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            let id = get_id_from_request(req);
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


    update() {
        this.app.put('/project/:id', (req: any, res: any) => {
            this.allow_communikation_from_all_ip_adress(res);
            let id = get_id_from_request(req);
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

    deletee() {
        this.app.delete('/project/:id', (req: any, res: any) => {
            this.allow_communikation_from_all_ip_adress(res);
            let id = get_id_from_request(req);
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

export class ProjectTable extends ServerSetup{

    create(...args: any[]): any {
    }

    read(...args: any[]): any {
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

    deletee(...args: any[]): any {
    }


    update(...args: any[]): any {
    }
}




