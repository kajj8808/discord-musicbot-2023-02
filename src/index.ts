import { Client as botClient, GatewayIntentBits } from "discord.js";
import { DisTube } from "distube";
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
      await play({ interaction, client });
      break;
    case "skip":
      await skip({ interaction, client });
      break;
    case "stop":
      await client.disTube.stop(getVoiceChannel(interaction, client));
      break;
  }
});

client.on("error", (err) => {
  /* play 실행도중 skip 이 들어올시 interaction 이 사라지는 error 가 생겨 작성..  */
});

client.login(getEnv("BOT_TOKEN"));
