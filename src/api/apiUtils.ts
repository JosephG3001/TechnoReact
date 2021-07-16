import { User } from "oidc-client";
import FileStoreResult from "../classes/fileStoreResult";
import TransactionError from "../classes/transaction-error";
import TransactionResult from "../classes/transaction-result";
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
  return fetch(url)
    .then((response: Response) => {
      if (response.status === 404 || response.status === 401) {
        // NotFound was returned from C# so handle null object in your calling function
        // return null;
      }
      const result = response.json();
      return result;
    })
    .then((data: TResult) => {
      return data;
    });
}

export const genericGetAuth = <TResult>(url: string): Promise<TResult> => {
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
};

export const genericPost = <TPostData, TResult>(
  url: string,
  data: TPostData
): Promise<TransactionResult<TResult>> => {
  return getHeaderWithAuthorization().then((headers: Headers) => {
    const tResult = new TransactionResult<TResult>();
    const content = JSON.stringify(data);
    return fetch(url, {
      headers,
      method: "POST",
      body: content,
    })
      .then((response) => {
        // 400 (bad request) here
        if (response.status === 400) {
          return response.json().then((r: Array<TransactionError>) => {
            tResult.success = false;
            tResult.errors = r;
            return tResult;
          });
        }

        return response.json().then((r: TResult) => {
          tResult.success = true;
          tResult.model = r;
          return tResult;
        });
      })
      .catch((err: any) => {
        // 500 (internal server error) here
        console.log(`Could not connect to back end: ${err}`);
        throw err;
      });
  });
};

export const genericPut = <TPostData>(
  url: string,
  data: TPostData
): Promise<TransactionResult<TPostData>> => {
  return getHeaderWithAuthorization().then((headers: Headers) => {
    const tResult = new TransactionResult<TPostData>();
    const content = JSON.stringify(data);
    return fetch(url, {
      headers,
      method: "PUT",
      body: content,
    })
      .then((response) => {
        // 400 (bad request) here
        if (response.status === 400) {
          return response.json().then((r: Array<TransactionError>) => {
            tResult.success = false;
            tResult.errors = r;
            return tResult;
          });
        }
        tResult.success = true;
        tResult.model = data;
        return tResult;
      })
      .catch((err: any) => {
        // 500 (internal server error) here
        console.log(`Could not connect to back end: ${err}`);
        throw err;
      });
  });
};

export const genericDelete = (
  url: string
): Promise<TransactionResult<undefined>> => {
  return getHeaderWithAuthorization().then((headers: Headers) => {
    const tResult = new TransactionResult<undefined>();
    return fetch(url, {
      headers,
      method: "DELETE",
    })
      .then((response) => {
        // 400 (bad request) here
        if (response.status === 400) {
          return response.json().then((r: Array<TransactionError>) => {
            tResult.success = false;
            tResult.errors = r;
            return tResult;
          });
        }
        tResult.success = true;
        return tResult;
      })
      .catch((err: any) => {
        // 500 (internal server error) here
        console.log(`Could not connect to back end: ${err}`);
        throw err;
      });
  });
};

export const postFileFormData = (
  url: string,
  blobInfo: any
): Promise<FileStoreResult> => {
  const promise = new Promise<FileStoreResult>((resolve, reject) => {
    userManager.getUser().then((user: User | null) => {
      const fd = new FormData();
      fd.append("fileUpload", blobInfo.blob(), blobInfo.filename());

      const xhr = new XMLHttpRequest();
      xhr.open("POST", url);
      xhr.responseType = "json";
      xhr.setRequestHeader("Authorization", `Bearer ${user?.access_token}`);

      xhr.onload = () => {
        const result = xhr.response as FileStoreResult;
        if (result) {
          resolve(result);
        } else {
          console.log(result);
          reject(result);
        }
      };

      xhr.send(fd);
    });
  });
  return promise;
};
