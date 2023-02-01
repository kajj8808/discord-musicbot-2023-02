import { Client as botClient, GatewayIntentBits } from "discord.js";
import { DisTube, SearchResult, Song } from "distube";
import { SpotifyPlugin } from "@distube/spotify";
import getEnv from "./utils/getEnv";
import play from "./commands/play";
import { IBot } from "./interfaces";
import skip from "./commands/skip";
import { initalCommandLoading } from "./commands/init";
import getVoiceChannel from "./utils/getVoiceChannel";

const client: IBot = new botClient({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
  ],
});

client.disTube = new DisTube(client, {
  leaveOnFinish: true,
  emitAddSongWhenCreatingQueue: true,
  plugins: [
    new SpotifyPlugin({
      api: {
        clientId: getEnv("SPOTIFY_CLIENT_ID"),
        clientSecret: getEnv("SPOTIFY_CLIENT_SECRET"),
      },
    }),
  ],
  ytdlOptions: {
    highWaterMark: 1024 * 1024 * 64,
    quality: "highestaudio",
    format: "audioonly",
    liveBuffer: 60000,
    dlChunkSize: 1024 * 1024 * 4,
    /*     quality: "highestaudio", //      quality?: 'lowest' | 'highest' | 'highestaudio' | 'lowestaudio' | 'highestvideo' | 'lowestvideo' | string | number | string[] | number[];
    filter: "audioonly", */
  },
});

client.on("ready", () => {
  console.log("bot is ready!");
  //initalCommandLoading();
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return; // (/)를 치고 뜨는 커멘드를 선택해서 쓸때 빼고는 작동을 하지않음.!

  switch (interaction.commandName) {
    case "play":
      play({ interaction, client });
      break;
    case "skip":
      skip({ interaction, client });
      break;
    case "stop":
      client.disTube.stop(getVoiceChannel(interaction, client));
      break;
  }
});

client.on("error", () => {});
client.login(getEnv("BOT_TOKEN"));
