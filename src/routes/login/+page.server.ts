import { fail, redirect} from "@sveltejs/kit";
import type { Action, Actions, PageServerLoad } from "./$types";
import { Enviroment, APIController, CookieManager } from "$lib/lib";
import type { IJwt, IUser } from "$lib/types";

export const load: PageServerLoad = async ({ locals }) => {
    if (locals.user) {
      throw redirect(302, Enviroment.DEFAULT_AUTH_PAGE);
    }
  }
  

const login: Action = async ({ cookies, request }) => {
    const data: FormData = await request.formData();
    var u: FormDataEntryValue|null = data.get('username');
    var p: FormDataEntryValue|null = data.get('password');


    if (!u || !p) {
        return fail(400, {err: true, message: 'Invalid username or password'});
    }

    u = u.toString();
    p = p.toString();


    const res: IJwt = await APIController.APIlogin(u, p);

    //ERROR
    if (res.message){
        return fail(400, {err: true, message: res.message});
    }
    else {

        const res_u = await APIController.getUserByName(u);
        
        if(res_u.error){
            return fail(500, {err: true, message: res_u.error});
        }
        else {
            const user: IUser = res_u.DATA[0]!;

            const userStr: string = JSON.stringify(user);

            CookieManager.generateCookie(cookies, CookieManager.JWT_COOKIE, res.token!);
            CookieManager.generateCookie(cookies, CookieManager.USER_COOKIE, userStr);
            
            throw redirect(302, Enviroment.DEFAULT_AUTH_PAGE);
        }



    }

}


export const actions: Actions = { login }; 

