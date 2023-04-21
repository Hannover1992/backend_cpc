import {ServerSetup} from "../ServerSetup";
import {get_id_from_request} from "../Function/string_manipulation";


export class Asset extends ServerSetup {

    constructor() {
        super();
    }

   async create(req: any, res: any) {

       this.app.post('/assets', async (req: any, res: any) => {
           this.allow_communikation_from_all_ip_adress(res);
           const {assets: {Inventarnummer}, ...artikelData} = req.body;


           try {
               // Create a new article
               const createdArtikel = await this.prisma.artikel.create({
                   data: artikelData,
               });

               // Create a new asset connected to the new article
               const createdAsset = await this.prisma.assets.create({
                   data: {
                       Inventarnummer: Number(Inventarnummer),
                       artikel: {
                           connect: {
                               artikel_id: createdArtikel.artikel_id,
                           },
                       },
                   },
               });

               res.status(200).send({
                   message: "Asset created",
                   data: createdAsset,
               });
           } catch (error) {
               console.error(error);
               res.status(500).send({message: error.message});
           }
       });
    }

    read() {
        this.app.get('/assets', async (req: any, res: any) => {
            this.allow_communikation_from_all_ip_adress(res);
            await this.prisma.assets.findMany({
                include: {
                    artikel: true,
                },
            }).then((assets: any) => {
                res.status(200).send(assets);
            }).catch((error: any) => {
                res.status(500).send({"message": error.message});
            });
        });
    }

    update() {
        // this.app.put('/project/:id', async (req: any, res: any) => {
        //     this.allow_communikation_from_all_ip_adress(res);
        //     let id = get_id_from_request(req);
        //     await this.prisma.tblprojekte.update({
        //         where: {
        //             ID: id
        //         },
        //         data: req.body
        //     }).then((result: any) => {
        //         console.log("Project with ID: " + id + " wurde updated");
        //     }).then(() => {
        //         res.status(200).send({"message": "Project updated"});
        //     }).catch((error: any) => {
        //         res.status(404).send({"message": error.message});
        //     });
        // });
    }

    deletee() {
        // this.app.delete('/project/:id', async (req: any, res: any) => {
        //     this.allow_communikation_from_all_ip_adress(res);
        //     let id = get_id_from_request(req);
        //     console.log(id);
        //     await this.prisma.tblprojekte.delete({
        //         where: {
        //             ID: id
        //         }
        //     }).then(() => {
        //         res.status(200).send({"message": "Project deleted"});
        //     }).catch((error: any) => {
        //         res.status(404).send({"message": error.message});
        //     });
        // });
    }
}





