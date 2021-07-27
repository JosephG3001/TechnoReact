export interface IGlobal {
  identityUrl: string;
  spaUrl: string;
  contentUrl: string;
  newsUrl: string;
  fileStoreUrl: string;
}

export const Global: IGlobal = {
  identityUrl: "https://login.technolibrary.co.uk",
  // identityUrl: "https://localhost:5001",
  spaUrl: "https://technolibrary.co.uk",
  // spaUrl: "http://localhost:3000",
  contentUrl: "https://content.technolibrary.co.uk",
  // contentUrl: "http://localhost:4001",
  newsUrl: "https://news.technolibrary.co.uk",
  // newsUrl: "http://localhost:4002",
  fileStoreUrl: "https://filestore.technolibrary.co.uk",
  // fileStoreUrl: "http://localhost:4003",
};
