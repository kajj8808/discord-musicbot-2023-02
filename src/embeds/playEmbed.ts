import { EmbedBuilder } from "discord.js";
import { SearchResult } from "distube";
import { ISong } from "../interfaces";
import randomColor from "../utils/randomColor";

export default async (songInfo) =>
  new EmbedBuilder()
    .setColor(randomColor())
    .setTitle(`▶️ [${songInfo.name}]`)
    .setDescription(`${songInfo.formattedDuration}`)
    .setImage(songInfo.thumbnail)
    //.setThumbnail(songInfo.thumbnail)
    .setTimestamp();
