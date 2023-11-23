import type { Action } from "@sveltejs/kit";



export const load: Action  = async ({params}) => {

    return { id: params.id };
}