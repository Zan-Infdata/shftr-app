import { fail, type Action, type Actions } from "@sveltejs/kit";
import { APIController } from "$lib/lib";
import type { IArticleData, IModelData } from "$lib/types";


const loadData: Action = async ({ request, cookies }) => {
    const data: FormData = await request.formData();
    var f: FormDataEntryValue|null = data.get('filter');

    if (f === null) {
        
        return fail(400, {err: true, message: 'Something wrong with filtering'});
    }

    f = f.toString();


    const res: IModelData = await APIController.getUnverifiedMdModels(f, cookies);

    //ERROR
    if (res.error){
        return fail(400, {err: true, message: res.error});
    }
    else {
        return { res: res};
    }

}


export const actions: Actions = { loadData }; 


