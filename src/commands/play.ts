import { ChatInputCommandInteraction } from "discord.js";
import { SearchResult } from "distube";
import { IBot } from "../interfaces";
import playEmbed from "../embeds/playEmbed";

import getVoiceChannel from "../utils/getVoiceChannel";

const playList: SearchResult[] = [];

interface Play {
  client: IBot;
  interaction: ChatInputCommandInteraction;
}

export default async ({ client, interaction }: Play) => {
  const term = interaction.options.getString("term");
  const songInfos = await client.disTube.search(term);
  playList.push(songInfos[0]);
  if (playList.length !== 0) {
    const songInfo = playList.shift();
    const voiceChannel = getVoiceChannel(interaction, client);
    client.disTube.voices.join(voiceChannel);
    client.disTube.play(voiceChannel, songInfo);
    await interaction.deferReply();
    const playMessage = await playEmbed(songInfo);
    await interaction.editReply({
      embeds: [playMessage],
    });
  }
};
