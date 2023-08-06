import { ServerSetup } from "../ServerSetup";
import {PrismaClient} from "@prisma/client";


export class DeliveryNote extends ServerSetup {

    constructor() {
        super();
        this.getArticlesByProject();
    }
    create(): any {
    }
    update(): any {
    }
    read(): any {
    }
    deletee(): any {
    }

    getArticlesByProject() {
        this.app.get('/project/:id/articles', async (req: any, res: any) => {
            try {
                const projectId = req.params.id;

                const articles = await this.prisma.projekt_artikel.findMany({
                    where: {
                        projekt_id: parseInt(projectId)
                    },
                    include: {
                        artikel: true
                    }
                });

                if (!articles) {
                    return res.status(404).json({ error: "No articles found for this project" });
                }

                res.status(200).json(articles);
            } catch (error) {
                console.error("Error retrieving articles:", error);
                res.status(500).json({ error: "Failed to retrieve articles" });
            }
        });
    }


}