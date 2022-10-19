import {Project} from "../../Classes/row/project";
import {PrismaClient} from "prisma/prisma-client/scripts/default-index";
import {I_CRUD} from "../I_CRUD";

export interface I_Projects extends I_CRUD{
    project: Project[];
    length: number;
}