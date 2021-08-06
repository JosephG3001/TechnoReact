import React from "react";
import { processSilentRenew } from "redux-oidc";

const SilentRenewPage: React.FC = () => {
  processSilentRenew();
  return <div>silent renew</div>;
};

export default SilentRenewPage;
