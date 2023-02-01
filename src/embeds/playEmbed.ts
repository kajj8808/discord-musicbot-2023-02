import { EmbedBuilder } from "discord.js";
import randomColor from "../utils/randomColor";

export default async (songInfo) =>
  new EmbedBuilder()
    .setColor(randomColor())
    .setTitle(`[${songInfo.name}]`)
    .setDescription(`${songInfo.formattedDuration}`)
    .setImage(`https://i1.ytimg.com/vi/${songInfo.id}/maxresdefault.jpg`)
    .setTimestamp();
