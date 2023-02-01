import { EmbedBuilder } from "discord.js";
import randomColor from "../utils/randomColor";

export default async () =>
  new EmbedBuilder().setColor(randomColor()).setTitle(`play`).setTimestamp();
