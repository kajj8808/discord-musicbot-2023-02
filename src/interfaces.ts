import { Client as botClient } from "discord.js";
import { DisTube, Song } from "distube";

export interface IBot extends botClient<boolean> {
  disTube?: DisTube;
}

export interface ISong extends Song {
  id: string;
  name: string;
  isLive: boolean;
  duration: number;
  formattedDuration: string;
  url: string;
  streamURL: undefined;
  thumbnail: string;
  views: number;
  likes: number;
  dislikes: number;
  uploader: {
    name: string;
    url: string;
  };
  age_restricted: boolean;
  reposts: number;
}
