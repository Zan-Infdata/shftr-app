import { redirect } from '@sveltejs/kit'
import type { PageServerLoad  } from './$types';
import { Enviroment } from "$lib/lib";

export const load: PageServerLoad  = async () => {
    throw redirect(302, Enviroment.DEFAULT_PUBLIC_PAGE);
}