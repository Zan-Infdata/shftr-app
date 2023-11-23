import { fail, type Action, type Actions } from "@sveltejs/kit";
import { APIController, CookieManager } from "$lib/lib";
import type { IModelData, IModelUserData, IUser } from "$lib/types";


const loadData: Action = async ({ cookies }) => {

    const user = JSON.parse(cookies.get(CookieManager.USER_COOKIE)!) as IUser;
    const userId = user.c01.toString();

    const res: IModelUserData = await APIController.getModelsByUserId(userId, cookies);

    //ERROR
    if (res.error){
        return fail(400, {err: true, message: res.error});
    }
    else {
        return { res: res };
    }

}


export const actions: Actions = { loadData }; 


