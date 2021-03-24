export interface IGlobal {
  identityUrl: string;
  spaUrl: string;
  contentUrl: string;
  newsUrl: string;
}

export const Global: IGlobal = {
  identityUrl: "https://localhost:5001",
  spaUrl: "http://localhost:3000",
  // apiUrl: "http://api.technolibrary.co.uk",
  // apiUrl: "http://localhost:4010",
  contentUrl: "http://localhost:4001",
  newsUrl: "http://localhost:4002",
};
