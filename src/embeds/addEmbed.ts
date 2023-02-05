import { EmbedBuilder } from "discord.js";
import randomColor from "../utils/randomColor";

export default async (songInfo) =>
  new EmbedBuilder()
    .setColor(randomColor())
    .setTitle(`Added [${songInfo.name}]`)
    .setDescription(`${songInfo.formattedDuration}`)
    .setTimestamp();
