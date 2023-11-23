import type { PageLoad } from "../../../browse/[id]/$types";


export const load: PageLoad  = async ({params}) => {

    return { id: params.id };
}