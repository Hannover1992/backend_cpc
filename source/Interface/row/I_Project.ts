import {I_CRUD} from "../I_CRUD";

export interface I_Project extends I_CRUD{
    id: number;
    name: string;
}
