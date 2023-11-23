import { fail, redirect, type Action } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import { APIController, CookieManager, Enviroment, ImgController, ModelController } from '$lib/lib'
import type { IModelAdd } from '$lib/types';
import {writeFile} from 'fs/promises';

export const load: PageServerLoad = async () => {
  // we only use this endpoint for the api
  // and don't need to see the page
  throw redirect(302, '/');
}


const model: Action = async ({ request, cookies }) => {
  const data: FormData = await request.formData();
    
  let mName: FormDataEntryValue|null = data.get('modName');
  let uName: FormDataEntryValue|null = data.get('userName');
  let aid: FormDataEntryValue|null = data.get('aid');
  let file: FormDataEntryValue|null = data.get('file');


  if (mName === null || uName === null || aid === null || file === null) {
      
      return fail(400, {err: true, message: 'Bad POST parameters'});
  }

  mName = mName.toString();
  uName = uName.toString();
  aid = aid.toString();

  const res_a: IModelAdd = await APIController.addModel(uName, mName, aid, cookies);

  //ERROR
  if (res_a.error){
      return fail(400, {err: true, message: res_a.error});
  }
  else {
    const mid: string = res_a.DATA.insertId.toString();
    const uid: string = res_a.DATA.userId.toString();

    const res_b = await APIController.uploadModel(uid, mid, aid, file, cookies);


    if(res_b === undefined) {
      return fail(400, {err: true, message: "File upload failed"});
    }
    else {
      return {err: false};
    }

  }
}



const article: Action = async ({ request, cookies }) => {
  const data: FormData = await request.formData();
    
  let fileName: FormDataEntryValue|null = data.get('fileName');
  let aid: FormDataEntryValue|null = data.get('aid');
  let file: FormDataEntryValue|null = data.get('file');


  if (fileName === null || aid === null || file === null) {
      
      return fail(400, {err: true, message: 'Bad POST parameters'});
  }

  fileName = fileName.toString();
  aid = aid.toString();


  const res_a = await APIController.uploadDefModel(fileName, aid, file, cookies);


  if(res_a === undefined) {
    return fail(400, {err: true, message: "File upload failed"});
  }
  else {
    return {err: false};
  }

  
}


const image: Action = async ({ request, cookies }) => {
  const data: FormData = await request.formData();
    
  let fileName: FormDataEntryValue|null = data.get('fileName');
  let base64: FormDataEntryValue|null = data.get('base64');


  if (fileName === null || base64 === null) {
      
      return fail(400, {err: true, message: 'Bad POST parameters'});
  }

  fileName = fileName.toString();
  base64 = base64.toString();

  const imgData: string[] = base64.split(",");

  const img: Buffer = Buffer.from(imgData[1], "base64");

  await writeFile(ImgController.IMG_SAVE_PATH + fileName + ImgController.IMG_EXT, img);

  /*if(res_a === undefined) {
    return fail(400, {err: true, message: "File upload failed"});
  }
  else {
    return {err: false};
  }*/

  
}

export const actions: Actions = { model, article, image }
