
export interface I_CRUD{
    create  (...args: any[]): any;
    read    (...args: any[]): any;
    update  (...args: any[]): any;
    delete  (...args: any[]): any;
}