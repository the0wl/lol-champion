import { Champion, ChampionRequestData } from 'lib/LA/LA.DataTypes/LA.Interfaces';

interface RequestError {
  message: string;
  devMessage: string;
}
export interface ChampionsRequest {
  champions: Champion[];
  error: RequestError;
}

export interface ChampionRequest {
  data: ChampionRequestData;
  error: RequestError;
}

export interface Items {
  icon: string;
  name: string;
  description: string;
}

export interface Buy {
  champion: string;
  build: Array<{label: string,items: Items[]}>;
}

export interface ChampionInfo {
  champion: Champion;
  build: Array<{
    label: string;
    items: Items[];
  }>
}