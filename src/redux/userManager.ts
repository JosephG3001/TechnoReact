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
  scope: "openid profile technoapi",
  authority: Global.identityUrl,
  silent_redirect_uri: `${Global.spaUrl}/silentrenew`,
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true,
  monitorSession: true,
  includeIdTokenInSilentRenew: false,
};

const userManager: UserManager = createUserManager(userManagerConfig);

export function updateAccessToken(): void {
  userManager.getUser().then((user: User | null) => {
    if (user) {
      // usersCurrentStoredToken = user.access_token;
      // const tokenObj: IAccessToken = JWT.default(user.access_token);
      // const teamsStore: TeamsStore = buildTeamStore(tokenObj);
      // const newUserActionType:INewAccessTokenActionType = {
      //     type: UserActionTypes.NEW_ACCESS_TOKEN,
      //     accessToken: tokenObj,
      //     teamsStore: teamsStore
      // }
      // store.dispatch(newUserActionType);
    } else {
      // const noTokenAction:INoTokenActionType = {
      //  type: UserActionTypes.NO_TOKEN,
      // }
      // store.dispatch(noTokenAction);
    }
  });
}

// export let usersCurrentStoredToken: string;

export default userManager;
