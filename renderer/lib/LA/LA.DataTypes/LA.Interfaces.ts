export interface ChampionRequestData{ 
  skills: Skills;
  build: Blocks[];
  spells: string[]; 
}

export interface Champion {
  rank: string;
  name: string;
  winrate: string;
  games: string;
}

export interface Skills {
  q: Skill;
  w: Skill;
  e: Skill;
  r: Skill;
}

export interface Skill {
  imgURL: string;
  order: string[];
}

export interface Blocks {
  label: string,
  items: Item[]  
}

export interface Item {
  icon: string;
  name: string;
}