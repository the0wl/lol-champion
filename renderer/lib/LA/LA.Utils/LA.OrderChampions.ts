import { Champion } from '../LA.DataTypes/LA.Interfaces';

const orderBy = {
  0: 'rank',
  1: 'name',
  2: 'winrate',
  3: 'games'
};

export default function OrderChampions(data: Champion[], indexFilter: number) {
  const filtered: Champion[] = Object.keys(data).sort((first, second) => {
    const firstValue = (orderBy[indexFilter] !== orderBy[1]) ? data[first][orderBy[indexFilter]] : Number(data[first][orderBy[indexFilter]]);
    const secondValue = (orderBy[indexFilter] !== orderBy[1]) ? data[second][orderBy[indexFilter]] : Number(data[second][orderBy[indexFilter]]);

    if (firstValue < secondValue) return -1;
    if (firstValue > secondValue) return 1;
    return 0;
  }).map(champ => {
    return data[champ];
  });

  return filtered;
}