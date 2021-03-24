import { User } from "oidc-client";
import userManager from "../redux/userManager";
import { Global } from "../techno.config";

export function getHeaderWithAuthorization(): Promise<Headers> {
  return userManager.getUser().then((user: User | null) => {
    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("content-type", "application/json");
    headers.append("Origin", Global.identityUrl);
    if (user) {
      headers.append("Authorization", `Bearer ${user.access_token}`);
    }

    return headers;
  });
}

// export function getHeaders(token: string): Array<Object>{
//   return [
//       {'Accept': 'application/json'},
//       {"content-type": "application/json"},
//       {"Authorization": "Bearer " + token}
//   ]
// }

export function genericGet<TResult>(url: string): Promise<TResult> {
  return getHeaderWithAuthorization().then((headers: Headers) => {
    return fetch(url, {
      headers,
    })
      .then((response: Response) => {
        if (response.status === 404 || response.status === 401) {
          // NotFound was returned from C# so handle null object in your calling function
          return null;
        }
        const result = response.json();
        return result;
      })
      .then((data: TResult) => {
        return data;
      })
      .catch((err: any) => {
        console.log(`Could not connect to back end: ${err}`);
        throw err;
      });
  });
}
