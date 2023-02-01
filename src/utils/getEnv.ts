import { config as envSetup } from "dotenv";

envSetup();

type envs =
  | "CLIENT_SECRET"
  | "CLIENT_ID"
  | "BOT_TOKEN"
  | "PREFIX"
  | "SPOTIFY_CLIENT_ID"
  | "SPOTIFY_CLIENT_SECRET";

export default (tokenName: envs): string => {
  const envs = process.env;
  return envs[tokenName];
};
