/* eslint-disable @typescript-eslint/no-unused-vars */
import { User, UserManager, UserManagerSettings } from "oidc-client";
import { createUserManager } from "redux-oidc";
import { Global } from "../techno.config";
// import { UserActionTypes, INewAccessTokenActionType, INoTokenActionType } from '../redux/actions/userActions';
// import { TeamsStore, buildTeamStore } from '../userState/teams';

export interface IAccessToken {
  nbf: number;
  exp: number;
  iss: string;
  aud: string[];
  // eslint-disable-next-line camelcase
  client_id: string;
  sub: string;
  // eslint-disable-next-line camelcase
  auth_time: number;
  idp: string;
  permissions: string[];
  teams: string[];
  roles: string;
  scope: string[];
  amr: string[];
}

const userManagerConfig: UserManagerSettings = {
  client_id: "reactSpa",
  redirect_uri: `${Global.spaUrl}/callback`,
  response_type: "code",
  scope: "openid profile contentapi newsapi",
  authority: Global.identityUrl,
  silent_redirect_uri: `${Global.spaUrl}/silentrenew`,
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true,
  monitorSession: true,
  includeIdTokenInSilentRenew: false,
};

const updateAccessToken = (userManager: UserManager) => {
  userManager.getUser().then((user: User | null) => {
    if (user) {
      // usersCurrentStoredToken = user.access_token;
      // const tokenObj: IAccessToken = JWT.default(user.access_token);
      // const teamsStore: TeamsStore = buildTeamStore(tokenObj);
      // store.dispatch(newUserActionType);
    } else {
      // const noTokenAction:INoTokenActionType = {
      //  type: UserActionTypes.NO_TOKEN,
      // }
      // store.dispatch(noTokenAction);
    }
  });
};

const createManager = () => {
  const localUserManager = createUserManager(userManagerConfig);

  localUserManager.events.addUserSignedOut(() => {
    console.log("addUserSignedOut");
  });

  localUserManager.events.addSilentRenewError((error) => {
    console.error("Error while renewing the access token", error);
  });

  localUserManager.events.addAccessTokenExpiring((event: any) => {
    console.log("Access Token Expiring");
  });

  localUserManager.events.addAccessTokenExpired((event: any) => {
    console.error("Access Token Expired");
  });

  localUserManager.events.addUserLoaded((event: any) => {
    console.log("User loaded / Silent refresh completed");
    updateAccessToken(localUserManager);
  });

  return localUserManager;
};

export const userManager: UserManager = createManager();

export default userManager;
