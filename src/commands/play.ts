import { ChatInputCommandInteraction } from "discord.js";
import { Queue, Song } from "distube";
import addEmbed from "../embeds/addEmbed";
import playEmbed from "../embeds/playEmbed";
import { IBot } from "../interfaces";

import { getMessageChannel, getVoiceChannel } from "../utils/getChannels";
import secondsConverter from "../utils/secondsConverter";
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
  if (voiceChannel) {
    client.disTube.voices.join(voiceChannel);
    client.disTube.play(voiceChannel, songInfo, {
      textChannel: getMessageChannel(interaction),
    });
    if (client.disTube.getQueue(interaction).songs.length <= 0) {
      // 초기 play delay 가 좀있기에..
      await interaction.editReply("play 실행중입니다...");
      await sleep(5);
    }
  } else {
    interaction.editReply("먼저 음성채널에 들어와주세요~");
    await sleep(5);
  }
  await interaction.deleteReply();
};

export async function sendPlayMessage(queue: Queue, song: Song) {
  const playMessage = await playEmbed({ ...song });
  const message = await queue.textChannel.send({ embeds: [playMessage] });
  await sleep(secondsConverter(song.formattedDuration) + 3);
  message.delete();
}
export async function sendSongAddMessage(queue: Queue, song: Song) {
  const addMessage = await addEmbed({ ...song });
  const message = await queue.textChannel.send({ embeds: [addMessage] });
  await sleep(3);
  message.delete();
}
