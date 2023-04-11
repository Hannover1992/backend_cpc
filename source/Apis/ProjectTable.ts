import {ServerSetup} from "../ServerSetup";

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
