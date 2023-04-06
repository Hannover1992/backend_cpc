import {Project_old} from "../../Classes/row/project_old";
import {I_CRUD} from "../I_CRUD";

export interface I_Projects extends I_CRUD{
    project: Project_old[];
    length: number;
}