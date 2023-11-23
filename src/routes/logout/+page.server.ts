import { redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import { CookieManager, Enviroment } from '$lib/lib'

export const load: PageServerLoad = async () => {
  // we only use this endpoint for the api
  // and don't need to see the page
  throw redirect(302, '/');
}

export const actions: Actions = {
  default({ cookies }) {
    
    CookieManager.eatCookie(cookies, CookieManager.JWT_COOKIE);
    CookieManager.eatCookie(cookies, CookieManager.USER_COOKIE);

    // redirect the user
    throw redirect(302, Enviroment.DEFAULT_PUBLIC_PAGE);
  },
}
