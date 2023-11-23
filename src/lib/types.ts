export interface IJwt {
    message?: string;
    token?: string;
}

export interface IUserData {
    DATA: Array<IUser>,
    CNT: number;
    error?: string;
}

export interface IArticleData {
    DATA: Array<IArticle>,
    CNT: number;
    error?: string;
}


export interface IModelData {
    DATA: Array<IModel>,
    CNT: number;
    error?: string;
}

export interface IModelPlusData {
    DATA: Array<IModelPlus>,
    CNT: number;
    error?: string;
}

export interface IModelUserData {
    DATA: Array<IModelUser>,
    CNT: number;
    error?: string;
}


export interface IModelAdd {
    DATA: {
        fieldCount: number;
        affectedRows: number;
        insertId: number;
        info: string;
        serverStatus: number;
        warningStatus: number;
        userId: number;
    }
    error?: string;
}


export interface IArticle {
    c01: number; // id
    c02: string; // name
    c03: string; // desc
    c04: string; // file
    c05: number; // dimId
    c06: boolean; // isActive
}

export interface IUser {
    c01: number; // id
    c02: string; // name
    c03: boolean; // isAdmin
}

export interface IModel {
    c01: number; // id
    c02: string; // name
    c03: number; // syUserId
    c04: boolean; // isActive 
    c05: number; // artId
    c06: string; // file
    c07: number; // weight
    c08: boolean; // isVerified
}

export interface IModelPlus {
    c01: number; // id
    c02: string; // name
    c03: boolean; // isActive
    c04: string; // syUserName
}

export interface IModelUser {
    c01: number; // id
    c02: string; // name
    c03: boolean; // isActive
    c08: boolean; // isVerified
    c09: string; // article name
}





export interface ILoginBody {
    uname: string;
    pwd: string;
}


export interface IModelAddBody {
    uname: string;
    modName: string;
    artId: string;
}

export interface IArtUpdateBody {
    aid: string;
    aName: string;
    aDesc: string;
    dimId: string;
    ia: string;
}

export interface IModelVerifyBody {
    mid: string;
    weight: string;
}


