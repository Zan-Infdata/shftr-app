import { fail, redirect, type Action } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import { APIController } from '$lib/lib'
import type { IArticleData } from '$lib/types';

export const load: PageServerLoad = async () => {
  // we only use this endpoint for the api
  // and don't need to see the page
  throw redirect(302, '/');
}


const article: Action = async ({ request, cookies }) => {
    
    const data: FormData = await request.formData();
    
    let aid: FormDataEntryValue|null = data.get('aid');
    let aName: FormDataEntryValue|null = data.get('aName');
    let aDesc: FormDataEntryValue|null = data.get('aDesc');
    let aDimId: FormDataEntryValue|null = data.get('aDimId');
    let aActive: FormDataEntryValue|null = data.get('aActive');



    if (aName === null || aDesc === null || aid === null || aDimId === null || aActive === null) {
        
        return fail(400, {err: true, message: 'Bad POST parameters'});
    }


    aid = aid.toString();
    aName = aName.toString();
    aDesc = aDesc.toString();
    aDimId = aDimId.toString();
    aActive = aActive.toString();
    
    const res_a: IArticleData = await APIController.updateArticle(aid,aName, aDesc, aDimId, aActive, cookies);



    //ERROR
    if (res_a.error){
        return fail(400, {err: true, message: res_a.error});
    }
    else {
        return {err: false};
    }
  }

  const verify: Action = async ({ request, cookies }) => {
    
    const data: FormData = await request.formData();
    
    let mid: FormDataEntryValue|null = data.get('mid');
    let weight: FormDataEntryValue|null = data.get('weight');



    if (weight === null || mid === null) {
        
        return fail(400, {err: true, message: 'Bad POST parameters'});
    }


    mid = mid.toString();
    weight = weight.toString();
    
    const res_a: IArticleData = await APIController.verifyMdModel(mid, weight, cookies);



    //ERROR
    if (res_a.error){
        return fail(400, {err: true, message: res_a.error});
    }
    else {
        return {err: false};
    }

  }

export const actions: Actions = { article, verify }; 
