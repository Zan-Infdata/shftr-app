import type { Cookies } from "@sveltejs/kit";
import type { IArtUpdateBody, IArticleData, IJwt, ILoginBody, IModelAdd, IModelAddBody, IModelData, IModelPlusData, IModelUser, IModelUserData, IModelVerifyBody, IUser, IUserData } from "./types";
import { applyAction, deserialize } from "$app/forms";
import { invalidateAll } from "$app/navigation";


export class Enviroment {
    static DEFAULT_AUTH_PAGE: string  = "/browse";
    static DEFAULT_PUBLIC_PAGE: string = "/articles";
    static LOGIN_PAGE: string = "/login";

    static ROOT_URL: string = "http://localhost:5173";


}

export class ImgController{

    static IMG_SAVE_PATH: string = "static/thumbnails/";
    static IMG_LOAD_PATH: string = "/thumbnails/";
    static IMG_ART_PFX: string = "a-";

    static IMG_DUMY: string = "dumy";

    static IMG_HEIGHT: number = 350;
    static IMG_WIDTH: number = 400;

    static IMG_MIME: string = "image/png";
    static IMG_EXT: string = ".png";

}


export class ModelController {
    static CANVAS_HEIGHT: number = 700;
    static CANVAS_WIDTH: number = 800;

    static CANVAS_BG_COLOR_HEX = 0xcab69e;

    static EXTENTIONS: string[] = [ "glb" ];

    static getAspectRatio(): number {
        return this.CANVAS_WIDTH / this.CANVAS_HEIGHT;
    }


}

export class PageLoader {
    
    static async fetchData(fd: FormData, url: string){

        const headers: Headers = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');

        const request: RequestInfo = new Request(url, {
            method: 'POST',
            body: fd,
        });

        const res = await fetch(request);

        const result = deserialize(await res.text());

        if(result.status == 200){
            await invalidateAll();
        }

        applyAction(result);


    }

    static bufferToString(ab: ArrayBuffer): string {
        return JSON.stringify(Array.from(new Uint8Array(ab)));
    }

    static stringToBuffer(str: string): ArrayBuffer {
        return new Uint8Array(JSON.parse(str)).buffer;
    }
}


export class APIController {

    static API_ROOT: string = "http://localhost:3001";
    static API_LOGIN: string = "/login";
    static API_USER: string = "/user";
    static API_USER_ID: string = "/user/id";
    static API_ARTICLE_LIST: string = "/article/list";
    static API_ARTICLE_LIST_ALL: string = "/article/list/all";
    static API_ARTICLE: string = "/article";
    static API_ARTICLE_MODELS: string = "/article/models";
    static API_ARTICLE_UPDATE: string = "/article/update";
    static API_ARTICLE_UPLOAD: string = "/article/upload";
    static API_MODEL: string = "/model";
    static API_MODEL_USER: string = "/model/user";
    static API_MODEL_VERIFY: string = "/model/verify";
    static API_DOWNLOAD: string = "/model/download";
    static API_MODEL_ADD: string = "/model/add";
    static API_MODEL_UPLD: string = "/model/upload";
    static API_MODEL_UNVERIFIED: string = "/model/unverified";

    static UNAME_FIELD = "uname";
    static USER_ID_FIELD = "uid";
    static FILTER_FIELD = "filter";
    static PWT_FIELD = "pwd";
    static ART_ID_FIELD = "aid";
    static MODEL_ID_FIELD = "mid";
    static FILE_FIELD = "file";

    static getErrorMessage(error: unknown): string {
        if (error instanceof Error) return error.message
        return String(error)
    }


    static async APIlogin(u: string, p: string): Promise<IJwt>{

        const headers: Headers = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');

        let body: ILoginBody = {
            uname: u,
            pwd: p,
        }


        const request: RequestInfo = new Request(this.API_ROOT + this.API_LOGIN, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        });

        try {
            const response = await fetch(request);
            return await response.json() as IJwt;
        }
        catch (e) {
            const err: IJwt = {
                message: this.getErrorMessage(e),
            }
            return err;
        }
    }


    static async getUserByName(u: string): Promise<IUserData>{


        const headers: Headers = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');

        const request: RequestInfo = new Request(this.API_ROOT + this.API_USER+`?${this.UNAME_FIELD}=${u}`, {
            method: 'GET',
            headers: headers,
        });

        try {
            const response = await fetch(request);
            
            return await response.json() as IUserData;
        }
        catch (e) {
            const errU: IUserData = {
                DATA: [],
                CNT: 0,
                error: this.getErrorMessage(e),
            }
            return errU;
        }
    }


    static async getUserById(i: string): Promise<IUserData>{


        const headers: Headers = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');

        const request: RequestInfo = new Request(this.API_ROOT + this.API_USER_ID+`?${this.USER_ID_FIELD}=${i}`, {
            method: 'GET',
            headers: headers,
        });

        try {
            const response = await fetch(request);
            
            return await response.json() as IUserData;
        }
        catch (e) {
            const errU: IUserData = {
                DATA: [],
                CNT: 0,
                error: this.getErrorMessage(e),
            }
            return errU;
        }
    }


    static async getArticleList(f: string): Promise<IArticleData>{


        const headers: Headers = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');

        const request: RequestInfo = new Request(this.API_ROOT + this.API_ARTICLE_LIST+`?${this.FILTER_FIELD}=${f}`, {
            method: 'GET',
            headers: headers,
        });

        try {
            const response = await fetch(request);
            
            return await response.json() as IArticleData;
        }
        catch (e) {
            const errU: IArticleData = {
                DATA: [],
                CNT: 0,
                error: this.getErrorMessage(e),
            }
            return errU;
        }
    }


    static async getAllArticleList(f: string, cookies: Cookies): Promise<IArticleData>{


        const headers: Headers = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');
        headers.set('Authorization', 'Bearer ' + cookies.get(CookieManager.JWT_COOKIE));

        const request: RequestInfo = new Request(this.API_ROOT + this.API_ARTICLE_LIST_ALL+`?${this.FILTER_FIELD}=${f}`, {
            method: 'GET',
            headers: headers,
        });

        try {
            const response = await fetch(request);
            
            return await response.json() as IArticleData;
        }
        catch (e) {
            const errU: IArticleData = {
                DATA: [],
                CNT: 0,
                error: this.getErrorMessage(e),
            }
            return errU;
        }
    }


    static async getArticleById(i: string|undefined): Promise<IArticleData>{


        const headers: Headers = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');

        const request: RequestInfo = new Request(this.API_ROOT + this.API_ARTICLE+`?${this.ART_ID_FIELD}=${i}`, {
            method: 'GET',
            headers: headers,
        });

        try {
            const response = await fetch(request);
            
            return await response.json() as IArticleData;
        }
        catch (e) {
            const errU: IArticleData = {
                DATA: [],
                CNT: 0,
                error: this.getErrorMessage(e),
            }
            return errU;
        }
    }


    static async getArticleModelsById(i: string|undefined): Promise<IModelData>{


        const headers: Headers = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');

        const request: RequestInfo = new Request(this.API_ROOT + this.API_ARTICLE_MODELS+`?${this.ART_ID_FIELD}=${i}`, {
            method: 'GET',
            headers: headers,
        });

        try {
            const response = await fetch(request);
            
            return await response.json() as IModelData;
        }
        catch (e) {
            const errU: IModelData = {
                DATA: [],
                CNT: 0,
                error: this.getErrorMessage(e),
            }
            return errU;
        }
    }



    static async getModelsByUserId(i: string|undefined, cookies: Cookies): Promise<IModelUserData>{


        const headers: Headers = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');
        headers.set('Authorization', 'Bearer ' + cookies.get(CookieManager.JWT_COOKIE));

        const request: RequestInfo = new Request(this.API_ROOT + this.API_MODEL_USER+`?${this.USER_ID_FIELD}=${i}`, {
            method: 'GET',
            headers: headers,
        });

        try {
            const response = await fetch(request);
            
            return await response.json() as IModelUserData;
        }
        catch (e) {
            const errU: IModelUserData = {
                DATA: [],
                CNT: 0,
                error: this.getErrorMessage(e),
            }
            return errU;
        }
    }



    static async getModelById(i: string|undefined): Promise<IModelData>{


        const headers: Headers = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');

        const request: RequestInfo = new Request(this.API_ROOT + this.API_MODEL+`?${this.MODEL_ID_FIELD}=${i}`, {
            method: 'GET',
            headers: headers,
        });

        try {
            const response = await fetch(request);
            
            return await response.json() as IModelData;
        }
        catch (e) {
            const errU: IModelData = {
                DATA: [],
                CNT: 0,
                error: this.getErrorMessage(e),
            }
            return errU;
        }
    }

    static async getUnverifiedMdModels(f: string, cookies: Cookies): Promise<IModelPlusData>{


        const headers: Headers = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');
        headers.set('Authorization', 'Bearer ' + cookies.get(CookieManager.JWT_COOKIE));

        const request: RequestInfo = new Request(this.API_ROOT + this.API_MODEL_UNVERIFIED+`?${this.FILTER_FIELD}=${f}`, {
            method: 'GET',
            headers: headers,
        });

        try {
            const response = await fetch(request);
            
            return await response.json() as IModelPlusData;
        }
        catch (e) {
            const errU: IModelPlusData = {
                DATA: [],
                CNT: 0,
                error: this.getErrorMessage(e),
            }
            return errU;
        }
    }



    static async updateArticle(i: string|undefined, n: string | undefined, d: string | undefined, dim: string | undefined, ia: string | undefined, cookies: Cookies): Promise<IArticleData>{

        const body: IArtUpdateBody = {
            aid: i!,
            aName: n!,
            aDesc: d!,
            dimId: dim!,
            ia: ia!
        }


        const headers: Headers = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');
        headers.set('Authorization', 'Bearer ' + cookies.get(CookieManager.JWT_COOKIE));

        const request: RequestInfo = new Request(this.API_ROOT + this.API_ARTICLE_UPDATE, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body),
        });

        try {
            const response = await fetch(request);
            
            return await response.json() as IArticleData;
        }
        catch (e) {
            const errU: IArticleData = {
                DATA: [],
                CNT: 0,
                error: this.getErrorMessage(e),
            }
            return errU;
        }
    }


    static async verifyMdModel(i: string|undefined, w: string | undefined, cookies: Cookies): Promise<IArticleData>{

        const body: IModelVerifyBody = {
            mid: i!,
            weight: w!,
        }


        const headers: Headers = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');
        headers.set('Authorization', 'Bearer ' + cookies.get(CookieManager.JWT_COOKIE));

        const request: RequestInfo = new Request(this.API_ROOT + this.API_MODEL_VERIFY, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body),
        });

        try {
            const response = await fetch(request);
            
            return await response.json() as IArticleData;
        }
        catch (e) {
            const errU: IArticleData = {
                DATA: [],
                CNT: 0,
                error: this.getErrorMessage(e),
            }
            return errU;
        }
    }



    static async addModel(un: string|undefined, modN: string | undefined, aid: string | undefined, cookies: Cookies ): Promise<IModelAdd>{


        const body: IModelAddBody = {
            artId: aid!,
            modName: modN!,
            uname: un!
        }


        const headers: Headers = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');
        headers.set('Authorization', 'Bearer ' + cookies.get(CookieManager.JWT_COOKIE));

        const request: RequestInfo = new Request(this.API_ROOT + this.API_MODEL_ADD, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body),
        });

        try {
            const response = await fetch(request);
            
            return await response.json() as IModelAdd;
        }
        catch (e) {
            const errU: IModelAdd = {
                DATA: {
                    fieldCount: 0,
                    affectedRows: 0,
                    insertId: -1,
                    info: "error",
                    serverStatus: 500,
                    warningStatus: -1,
                    userId: -1
                },
                error: this.getErrorMessage(e),
            }
            return errU;
        }
    }


    static async uploadModel(uid: string|undefined, mid: string | undefined, aid: string | undefined, file: any, cookies: Cookies ): Promise<object|undefined>{


        const data = new FormData();
        data.append("user", uid!);
        data.append("model", mid!);
        data.append("article", aid!);
        data.append("file", file );


        const headers: Headers = new Headers();
        headers.set('Authorization', 'Bearer ' + cookies.get(CookieManager.JWT_COOKIE));

        const request: RequestInfo = new Request(this.API_ROOT + this.API_MODEL_UPLD, {
            method: 'POST',
            headers: headers,
            body: data,
        });

        try {
            const response = await fetch(request);
            
            return response;
        }
        catch (e) {
            return undefined;
        }
    }

    static async uploadDefModel(fileName: string | undefined, aid: string | undefined, file: any, cookies: Cookies ): Promise<object|undefined>{


        const data = new FormData();
        data.append("fileName", fileName!);
        data.append("aid", aid!);
        data.append("file", file );


        const headers: Headers = new Headers();
        headers.set('Authorization', 'Bearer ' + cookies.get(CookieManager.JWT_COOKIE));

        const request: RequestInfo = new Request(this.API_ROOT + this.API_ARTICLE_UPLOAD, {
            method: 'POST',
            headers: headers,
            body: data,
        });

        try {
            const response = await fetch(request);
            
            return response;
        }
        catch (e) {
            return undefined;
        }
    }


    static async downloadModel(fn: string|undefined): Promise<ArrayBuffer>{


        const headers: Headers = new Headers();
        headers.set('Content-Type', 'application/octet-stream');
        headers.set('Accept', 'application/octet-stream');

        const request: RequestInfo = new Request(this.API_ROOT + this.API_DOWNLOAD+`?${this.FILE_FIELD}=${fn}`, {
            method: 'GET',
            headers: headers,
        });

        try {
            const response = await fetch(request);
            
            return await response.arrayBuffer();
        }
        catch (e) {
            return PageLoader.stringToBuffer(this.getErrorMessage(e));
        }
    }


}

export class Test {
    static delay(timeInMillis: number): Promise<void> {
        return new Promise((resolve) => setTimeout(() => resolve(), timeInMillis));
    }
}


export class CookieManager {
    static JWT_COOKIE: string = "ses_jwt";
    static USER_COOKIE: string = "ses_usr";

    static eatCookie(cookies: Cookies, cookie: string): void {
        cookies.set(cookie, '', {
            path: '/',
            expires: new Date(0),
          })
    }


    static generateCookie (cookies: Cookies, cookie: string , value:string): void {
        cookies.set(cookie, value, {
            // send cookie for every page
            path: '/',
            // server side only cookie so you can't use `document.cookie`
            httpOnly: true,
            // only requests from same site can send cookies
            // https://developer.mozilla.org/en-US/docs/Glossary/CSRF
            sameSite: 'strict',
            //TODO: change this bad boy
            // only sent over HTTPS in production
            secure: process.env.NODE_ENV === 'production',
            // set cookie to expire after a month
            maxAge: 60 * 60 * 24 * 30,
          })
    }

}




