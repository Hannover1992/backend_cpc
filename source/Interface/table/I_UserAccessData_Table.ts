import { UserAccessData } from "../../Classes/row/UserAccessData";
import {I_CRUD} from "../I_CRUD";


export interface I_UserAccessData_Table extends I_CRUD{
    UserAccessData: UserAccessData[];
    length: number;
}
