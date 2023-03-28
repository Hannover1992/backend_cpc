import {Project} from "../../Classes/row/project";
import {I_CRUD} from "../I_CRUD";

export interface I_Projects extends I_CRUD{
    project: Project[];
    length: number;
}