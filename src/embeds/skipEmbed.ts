import { EmbedBuilder } from "discord.js";
import randomColor from "../utils/randomColor";

interface ISkip {
  username: string;
}

export default async ({ username }: ISkip) => {
  return new EmbedBuilder()
    .setColor(randomColor())
    .setTitle(`⏭️ song has been skipped~`)
    .setDescription(`Request by: ${username}`)
    .setTimestamp();
};
