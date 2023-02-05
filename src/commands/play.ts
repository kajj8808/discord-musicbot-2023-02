import { ChatInputCommandInteraction } from "discord.js";
import { Queue, Song } from "distube";
import addEmbed from "../embeds/addEmbed";
import playEmbed from "../embeds/playEmbed";
import { IBot } from "../interfaces";

import { getMessageChannel, getVoiceChannel } from "../utils/getChannels";
import sleep from "../utils/sleep";

interface Play {
  client: IBot;
  interaction: ChatInputCommandInteraction;
}

export default async ({ client, interaction }: Play) => {
  await interaction.deferReply();
  const term = interaction.options.getString("term");
  const songInfos = await client.disTube.search(term);

  const songInfo = songInfos[0];
  const voiceChannel = getVoiceChannel(interaction, client);
  if (!voiceChannel) {
    interaction.reply("먼저 음성채널에 들어와주세요~");
    return;
  }
  client.disTube.voices.join(voiceChannel);
  client.disTube.play(voiceChannel, songInfo, {
    textChannel: getMessageChannel(interaction),
  });
  await interaction.editReply("play 실행중입니다...");
  await sleep(3);
  await interaction.deleteReply();
};

export async function sendPlayMessage(queue: Queue, song: Song) {
  const playMessage = await playEmbed({ ...song });
  queue.textChannel.send({ embeds: [playMessage] });
}
export async function sendSongAddMessage(queue: Queue, song: Song) {
  const addMessage = await addEmbed({ ...song });
  queue.textChannel.send({ embeds: [addMessage] });
}
