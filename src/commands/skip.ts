import { ChatInputCommandInteraction } from "discord.js";
import { IBot, ISong } from "../interfaces";
import skipEmbed from "../embeds/skipEmbed";
import getVoiceChannel from "../utils/getVoiceChannel";

interface Skip {
  client: IBot;
  interaction: ChatInputCommandInteraction;
}

export default async ({ client, interaction }: Skip) => {
  const voiceChannel = getVoiceChannel(interaction, client);
  client.disTube.skip(voiceChannel).catch((err) => {
    if (err.errorCode === "NO_UP_NEXT") {
      interaction.reply("마지막 곡입니다~");
    }
  });
  const { username, discriminator } = interaction.member.user;
  await interaction.deferReply();
  const skipMessage = await skipEmbed({
    username: `${username}#${discriminator}`,
  });
  await interaction.editReply({
    embeds: [skipMessage],
  });
};
