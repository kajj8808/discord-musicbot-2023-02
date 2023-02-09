import { ChatInputCommandInteraction } from "discord.js";
import { IBot } from "../interfaces";
import skipEmbed from "../embeds/skipEmbed";
import { getVoiceChannel } from "../utils/getChannels";
import sleep from "../utils/sleep";

interface Skip {
  client: IBot;
  interaction: ChatInputCommandInteraction;
}

export default async ({ client, interaction }: Skip) => {
  const voiceChannel = getVoiceChannel(interaction, client);
  const queue = client.disTube.getQueue(voiceChannel);
  await interaction.deferReply();
  if (!voiceChannel) {
    await interaction.editReply("join voicechannel!");
    return;
  }
  if (!queue) {
    await interaction.editReply("not found queue...");
    return;
  }
  if (queue.songs.length === 1) {
    await interaction.editReply("last song... bye bye 👋");
    client.disTube.stop(voiceChannel);
    return;
  }
  client.disTube.skip(voiceChannel);
  const skipMessage = await skipEmbed();
  await interaction.editReply({
    embeds: [skipMessage],
  });
  await sleep(10);
  await interaction.deleteReply();
};
