export interface IGlobal {
  identityUrl: string;
  spaUrl: string;
  contentUrl: string;
  newsUrl: string;
  fileStoreUrl: string;
}

const GlobalDev: IGlobal = {
  identityUrl: "https://localhost:5001",
  spaUrl: "http://localhost:3000",
  contentUrl: "http://localhost:4001",
  newsUrl: "http://localhost:4002",
  fileStoreUrl: "http://localhost:4003",
};

const GlobalProd: IGlobal = {
  identityUrl: "https://login.technolibrary.co.uk",
  spaUrl: "https://www.technolibrary.co.uk",
  contentUrl: "https://content.technolibrary.co.uk",
  newsUrl: "https://news.technolibrary.co.uk",
  fileStoreUrl: "https://filestore.technolibrary.co.uk",
};
export const Global =
  process.env.NODE_ENV === "production" ? GlobalProd : GlobalDev;
