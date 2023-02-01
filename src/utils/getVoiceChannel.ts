import { Interaction } from "discord.js";
import { IBot } from "../interfaces";

export default function getVoiceChannel(
  interaction: Interaction,
  client: IBot
) {
  const guild = client.guilds.cache.get(interaction.guildId);
  const member = guild.members.cache.get(interaction.member.user.id);
  const voiceChannel = member.voice.channel;
  return voiceChannel;
}
