import {I_CRUD} from "../I_CRUD";
import {Project} from "../../Classes/Project";

export interface I_Projects extends I_CRUD{
    project: Project[];
    length: number;
}