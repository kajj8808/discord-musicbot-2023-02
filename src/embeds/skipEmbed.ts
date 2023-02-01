import { EmbedBuilder } from "discord.js";
import randomColor from "../utils/randomColor";

export default async () => {
  return new EmbedBuilder()
    .setColor(randomColor())
    .setTitle(`⏭️ song has been skipped~`)
    .setTimestamp();
};
