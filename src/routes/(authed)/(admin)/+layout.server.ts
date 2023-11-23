import { redirect, type Action } from "@sveltejs/kit";
import { CookieManager, Enviroment } from "$lib/lib";


export const load: Action = async ({ locals }) => {

    //redirect non admin users
    if (locals.user.c03 == 0) {
        throw redirect(303, Enviroment.DEFAULT_AUTH_PAGE );
    }

}

export const ssr = true;