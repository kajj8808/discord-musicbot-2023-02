import { ApplicationCommandOptionType, REST, Routes } from "discord.js";
import getEnv from "../utils/getEnv";

interface ICommand {
  name: string;
  description: string;
  options?: [
    {
      name: string;
      description: string;
      type: ApplicationCommandOptionType;
      required: boolean;
    }
  ];
}

const commands: ICommand[] = [
  {
    name: "play",
    description: "play a song🎵~ ( youtube video )",
    options: [
      {
        name: "term",
        description: "검색어(spotipy 기반) | spotipy url | youtube url",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
  {
    name: "skip",
    description: "skip!",
  },
  {
    name: "stop",
    description: "노래가 중단되고 봇과 연결을 끊습니다.~",
  },
];

/** command Factory 명령어 object 를 보내줘 처리를 하게해줌.! */
export function commandFactory(commandObj: ICommand) {
  commands.push(commandObj);
  sendCommandsToDiscordServer();
}
/** 앱이 실행될떄 commands 에 있는 값들을 등록해줍니다. */
export function initalCommandLoading() {
  sendCommandsToDiscordServer();
}

async function sendCommandsToDiscordServer() {
  const rest = new REST({ version: "10" }).setToken(getEnv("BOT_TOKEN"));
  try {
    console.log(
      "APP의 (/) 를 새로고침 하여 새로운 명령어를 등록하는 중입니다..."
    );
    await rest.put(Routes.applicationCommands(getEnv("CLIENT_ID")), {
      body: [...commands],
    });
    console.log("APP의 (/) 를 새로고침 하여 명령어 등록에 성공하였습니다.");
  } catch (error) {
    console.log(error);
  }
}
