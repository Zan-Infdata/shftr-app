import { redirect, type Action } from "@sveltejs/kit";
import { CookieManager, Enviroment } from "$lib/lib";


export const load: Action = async ({ cookies, locals }) => {


    if (!cookies.get(CookieManager.JWT_COOKIE)) {
        throw redirect(303, Enviroment.LOGIN_PAGE );
    }

    return {
        user: locals.user,
    }

}

export const ssr = true;