import type { NextApiRequest } from 'next';
import puppeteer from 'puppeteer';

import LA from 'lib/LA/LA.DataTypes/LA.Constants';
import { Champion } from 'lib/LA/LA.DataTypes/LA.Interfaces';

import BuildURL from '@/utils/build-url';
import { ChampionsRequest } from 'lib/API/API.Interfaces';

export default async function GetTierListByLane(req: NextApiRequest): Promise<ChampionsRequest> {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1024 });
  //page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  await page.goto(BuildURL(LA.TierListEndpoint, req));
  await new Promise(r => setTimeout(r, 1000));  
        
  const champions: ChampionsRequest = await page.evaluate(() => {
    const items = document.querySelectorAll('.TierList_list__j33gd > div');
    const elements: Champion[] = [];     

    for (let i = 0; i < 10; i++) {
      const rankElement = items[i].firstElementChild as HTMLElement;
      const nameElement = rankElement.nextElementSibling.nextElementSibling as HTMLElement;
      const wiraElement = nameElement.nextElementSibling.nextElementSibling.nextElementSibling as HTMLElement;
      const gameElement = wiraElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling as HTMLElement;        

      elements.push({ 
        rank: rankElement.innerText,
        name: nameElement.innerText,
        winrate: wiraElement.innerText.substring(0,5),
        games: gameElement.innerText
      });
    }                 
    return {
      champions: elements,
      error: null      
    };
  }).catch((error: Error) => {
    return {
      champions: null,
      error:  {
        message: 'Um erro ocorreu e a consulta não pôde ser efetuada!',
        devMessage: error.message
      }
    };    
  });
        
  await browser.close();
  
  return champions;
}
