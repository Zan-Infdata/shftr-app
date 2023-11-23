import { fail } from "@sveltejs/kit";
import type { Action, Actions } from "./$types";
import { APIController, PageLoader } from "$lib/lib";
import type { IArticleData, IModelData } from "$lib/types";


const loadData: Action = async ({ request }) => {


    const data: FormData = await request.formData();
    var id: FormDataEntryValue|null = data.get('id');

    if (id === null) {
        
        return fail(400, {err: true, message: 'No ID provided'});
    }

    id = id.toString();


    const res_a: IModelData = await APIController.getModelById(id);
    //TODO: get other data obout the model
    const res_c: ArrayBuffer = await APIController.downloadModel(res_a.DATA[0].c06);

    //ERROR
    if (res_a.error){
        return fail(400, {err: true, message: res_a.error});
    }
    else {

        const res_b: IArticleData = await APIController.getArticleById(res_a.DATA[0].c05.toString());

        if(res_b.error) {
            return fail(400, {err: true, message: res_b.error});
        }
        else {
            
            return { res_a: res_a, res_b: res_b, res_c: PageLoader.bufferToString(res_c)};
        }

    }

}




export const actions: Actions = { loadData }; 