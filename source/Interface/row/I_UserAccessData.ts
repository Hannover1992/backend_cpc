import {I_CRUD} from "../I_CRUD";

export interface I_UserAccessData extends I_CRUD {
    ID:                     number;
    Programm:               String;
    UserName:               String;
    Password:               String;
    Role:                   String;
}
