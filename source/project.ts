interface IProject {
    id: number;
    name: string;
}

export class Project implements IProject{
    private _id: number;
    private _name: string;

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }
    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    constructor(id: number, name: string){
        this._id = id;
        this._name = name;
    }
}