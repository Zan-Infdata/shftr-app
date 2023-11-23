import { CookieManager } from "$lib/lib";
import type { IUser } from "$lib/types";
import type { Handle } from "@sveltejs/kit";


export const handle: Handle = async ({ event, resolve }) => {
  // get cookies from browser
  const jwt = event.cookies.get(CookieManager.JWT_COOKIE)
  const userStr = event.cookies.get(CookieManager.USER_COOKIE)

  if (!jwt || !userStr) {
    // if there is no session load page as normal
    return await resolve(event);
  }

  const user = JSON.parse(userStr) as IUser;
  
  // if `user` exists set `events.local`
  event.locals.user ??= user;

  // load page as normal

  return await resolve(event);
  
}
