import { fail } from "@sveltejs/kit";
import type { Action, Actions } from "./$types";
import { APIController } from "$lib/lib";
import type { IArticleData } from "$lib/types";


const loadData: Action = async ({ request, cookies }) => {
    const data: FormData = await request.formData();
    var f: FormDataEntryValue|null = data.get('filter');

    if (f === null) {
        
        return fail(400, {err: true, message: 'Something wrong with filtering'});
    }

    f = f.toString();


    const res: IArticleData = await APIController.getAllArticleList(f, cookies);

    //ERROR
    if (res.error){
        return fail(400, {err: true, message: res.error});
    }
    else {
        return { res: res};
    }

}


export const actions: Actions = { loadData }; 


