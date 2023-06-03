import type { NextApiRequest } from 'next';
import puppeteer from 'puppeteer';

import LA from 'lib/LA/LA.DataTypes/LA.Constants';
import BuildURL from '@/utils/build-url';
import { ChampionRequest } from 'lib/API/API.Interfaces';
import { Item } from '../LA.DataTypes/LA.Interfaces';

export default async function GetChampionInfo(req: NextApiRequest): Promise<ChampionRequest> {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1024 });
  //page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  const route : string = LA.ChampionEndpoint.replace(':champion', req.query.champion as string);
  const championName = req.query.champion as string;

  console.log(BuildURL(route, req))

  await page.goto(BuildURL(route, req));  
  await new Promise(r => setTimeout(r, 2000));
        
  const champion: ChampionRequest = await page.evaluate((championName) => {
    const items = {
      3001: 'Abyssal Mask', 3105: 'Aegis of the Legion', 3113: 'Aether Wisp', 1052: 'Amplifying Tome', 3003: 'Archangel\'s Staff',
      3504: 'Ardent Censer', 1038: 'B. F. Sword', 6660: 'Bami\'s Cinder', 4642: 'Bandleglass Mirror', 3102: 'Banshee\'s Veil',
      3006: 'Berserker\'s Greaves', 3071: 'Black Cleaver', 3864: 'Black Mist Scythe', 3153: 'Blade of The Ruined King', 1026: 'Blasting Wand',
      4630: 'Blighting Jewel', 3072: 'Bloodthirster', 7008: 'Bloodward', 1001: 'Boots', 3009: 'Boots of Swiftness', 3076: 'Bramble Vest',
      2424: 'Broken Stopwatch', 3860: 'Bulwark of the Mountain', 7024: 'Caesura', 3133: 'Caulfield\'s Warhammer', 3803: 'Catalyst of Aeons',
      7015: 'Ceaseless Hunger', 1031: 'Chain Vest', 6609: 'Chempunk Chainsword', 3011: 'Chemtech Putrifier',
      1018: 'Cloak of Agility', 1029: 'Cloth Armor', 2419: 'Commencing Stopwatch', 2055: 'Control Ward',
      2033: 'Corrupting Potion', 4629: 'Cosmic Drive', 3801: 'Crystalline Bracer', 1083: 'Cull', 1042: 'Dagger',
      1082: 'Dark Seal', 3742: 'Dead Man\'s Plate', 6333: 'Death\'s Dance', 7017: 'Deicide', 4637: 'Demonic Embrace', 6632: 'Divine Sunderer',
      1055: 'Doran\'s Blade', 1056: 'Doran\'s Ring', 1054: 'Doran\'s Shield', 7002: 'Draktharr\'s Shadowcarver',
      7016: 'Dreamshatter', 6691: 'Duskblade of Draktharr', 6692: 'Eclipse', 3814: 'Edge of Night', 2138: 'Elixir of Iron',
      2139: 'Elixir of Sorcery', 2140: 'Elixir of Wrath', 1035: 'Emberknife', 7023: 'Equinox', 7014: 'Eternal Winter',
      3508: 'Essence Reaver', 6656: 'Everfrost', 3123: 'Executioner\'s Calling', 7013: 'Eye of Luden', 3513: 'Eye of the Herald', 1004: 'Faerie Charm',
      3363: 'Farsight Alteration', 3108: 'Fiendish Codex', 3114: 'Forbidden Idol', 4401: 'Force of Nature', 3851: 'Frostfang',
      7005: 'Frozen Fist', 3110: 'Frozen Heart', 6671: 'Galeforce', 3193: 'Gargoyle Stoneplate', 1011: 'Giant\'s Belt', 3024: 'Glacial Buckler',
      6630: 'Goredrinker', 3026: 'Guardian Angel', 3177: 'Guardian\'s Blade', 3184: 'Guardian\'s Hammer', 2051: 'Guardian\'s Horn',
      3112: 'Guardian\'s Orb', 3124: 'Guinsoo\'s Rageblade', 1102: 'Gustwalker Hatchling', 1039: 'Hailblade', 3863: 'Harrowing Crescent',
      2003: 'Health Potion', 3051: 'Hearthbound Axe', 3084: 'Heartsteel', 3155: 'Hexdrinker', 3145: 'Hextech Alternator', 3152: 'Hextech Rocketbelt',
      4628: 'Horizon Focus', 7009: 'Icathia\'s Curse', 6662: 'Iceborn Gauntlet', 6673: 'Immortal Shieldbow', 4005: 'Imperial Mandate',
      7028: 'Infinite Convergence', 7018: 'Infinity Dawn', 3031: 'Infinity Edge', 3158: 'Ionian Boots of Lucidity', 6029: 'Ironspike Whip',
      6665: 'Jak\'Sho, The Protean', 3600: 'Kalista\'s Black Spear', 3067: 'Kindlegem', 2015: 'Kircheis Shard', 3109: 'Knight\'s Vow', 6672: 'Kraken Slayer',
      3035: 'Last Whisper', 4635: 'Leeching Leer', 7025: 'Leviathan', 6653: 'Liandry\'s Anguish', 7012: 'Liandry\'s Lament', 3100: 'Lich Bane',
      3190: 'Locket of the Iron Solari', 1036: 'Long Sword', 3036: 'Lord Dominik\'s Regards', 3802: 'Lost Chapter', 6655: 'Luden\'s Tempest',
      3004: 'Manamune', 3156: 'Maw of Malmortius', 3041: 'Mejai\'s Soulstealer', 3139: 'Mercurial Scimitar', 3111: 'Mercury\'s Treads',
      3222: 'Mikael\'s Blessing', 2403: 'Minion Dematerializer', 3117: 'Mobility Boots', 6617: 'Moonstone Renewer', 3165: 'Morellonomicon',
      3033: 'Mortal Reminder', 1103: 'Mosstomper Seedling', 3043: 'Muramana', 3115: 'Nashor\'s Tooth', 6675: 'Navori Quickblades',
      1058: 'Needlessly Large Rod', 1057: 'Negatron Cloak', 4636: 'Night Harvester', 6670: 'Noonquiver', 1033: 'Null-Magic Mantle', 3916: 'Oblivion Orb',
      1040: 'Obsidian Edge', 3364: 'Oracle Lens', 3857: 'Pauldrons of Whiterock', 2423: 'Perfectly Timed Stopwatch', 3044: 'Phage', 3046: 'Phantom Dancer',
      1037: 'Pickaxe', 3047: 'Plated Steelcaps', 2052: 'Poro-Snax', 7027: 'Primordial Dawn', 6693: 'Prowler\'s Claw', 3140: 'Quicksilver Sash',
      3089: 'Rabadon\'s Deathcap', 6667: 'Radiant Virtue', 6677: 'Rageknife', 3143: 'Randuin\'s Omen', 3094: 'Rapid Firecannon', 3074: 'Ravenous Hydra',
      1043: 'Recurve Bow', 3107: 'Redemption', 2031: 'Refillable Potion', 1006: 'Rejuvenation Bead', 3858: 'Relic Shield',
      7019: 'Reliquary of the Golden Dawn', 4633: 'Riftmaker', 6657: 'Road of Ages', 1028: 'Ruby Crystal',
      3085: 'Runaan\'s Hurricane', 3855: 'Runesteel Spaulders', 3116: 'Rylai\'s Crystal Scepter', 7000: 'Sandshrikes\'s Claw',
      3181: 'Sanguine Blade', 1027: 'Sapphire Crystal', 3330: 'Scarecrow Effigy', 1101: 'Scorchclaw Pup', 7022: 'Seat of Command',
      3191: 'Seeker\'s Armguard', 3048: 'Seraph\'s Embrace', 6695: 'Serpent\'s Fang', 3134: 'Serrated Dirk', 6694: 'Serylda\'s Grudge',
      3853: 'Shard of True Ice', 3057: 'Sheen', 2065: 'Shurelya\'s Battlesong', 7020: 'Shurelya\'s Requiem', 6035: 'Silvermere Dawn',
      2422: 'Slightly Magical Footwear', 3020: 'Sorcerer\'s Shoes', 3862: 'Spectral Sickle', 3211: 'Spectre\'s Cowl', 3850: 'Spellthief\'s Edge',
      3065: 'Spirit Visage', 6616: 'Staff of Flowing Water', 7021: 'Starcaster', 3340: 'Stealth Ward',
      3854: 'Steel Shoulderguards', 3053: 'Sterak\'s Gage', 4641: 'Stirring Wardstone', 2420: 'Stopwatch', 3095: 'Stormrazor',
      6631: 'Stridebreaker', 3068: 'Sunfire Aegis', 7001: 'Syzygy', 3859: 'Targon\'s Buckler', 3070: 'Tear of the Goddess', 6676: 'The Collector',
      4403: 'The Golden Spatula', 7026: 'The Unspoken Parasite', 3075: 'Thornmail', 3077: 'Tiamat', 3748: 'Titanic Hydra',
      2010: 'Total Biscuit of Everlasting Will', 3078: 'Trinity Force', 6664: 'Turbo Chemtank', 7006: 'Typhoon', 3179: 'Umbral Glaive',
      7011: 'Upgraded Aeropack', 1053: 'Vampiric Scepter', 4632: 'Verdant Barrier', 7010: 'Vespertide',
      4643: 'Vigilant Wardstone', 3135: 'Void Staff', 3082: 'Warden\'s Mail', 3083: 'Warmog\'s Armor', 4638: 'Watchful Wardstone',
      3066: 'Winged Moonplate', 3091: 'Wit\'s End', 7007: 'Wyrmfallen Sacrifice', 3142: 'Youmuu\'s Ghostblade', 3400: 'Your Cut', 3086: 'Zeal',
      3050: 'Zeke\'s Convergence', 3157: 'Zhonya\'s Hourglass', 3161: 'Spear of Shojin'
    };
    
    const response : ChampionRequest =  {
      data: { 
        skills: {
          q: {
            imgURL: '',
            order: []
          },
          w: {
            imgURL: '',
            order: []
          },
          e: {
            imgURL: '',
            order: []
          },
          r: {
            imgURL: '',
            order: []
          }
        }, 
        build: [], 
        spells: [] 
      },
      error: {
        message: '',
        devMessage: ''
      }
    };

    let elements = document.querySelectorAll('.SkillOrder_light__iZaUW');

    elements.forEach((item) => {
      const RemoveTagsRegex = /(\d+(?=<))/g;

      const QElement = item.firstElementChild;
      const WElement = QElement.nextElementSibling;
      const EElement = WElement.nextElementSibling;
      const RElement = EElement.nextElementSibling;
    
      response.data.skills.q = {
        imgURL: `https://cdn.lolalytics.com/generated/spell64px/${championName}_q.jpg`,
        order: QElement.innerHTML.replaceAll('<div class=""></div>', '<div class="">0</div>').match(RemoveTagsRegex)
      };

      response.data.skills.w = {
        imgURL: `https://cdn.lolalytics.com/generated/spell64px/${championName}_w.jpg`,
        order: WElement.innerHTML.replaceAll('<div class=""></div>', '<div class="">0</div>').match(RemoveTagsRegex)
      };

      response.data.skills.e = {
        imgURL: `https://cdn.lolalytics.com/generated/spell64px/${championName}_e.jpg`,
        order: EElement.innerHTML.replaceAll('<div class=""></div>', '<div class="">0</div>').match(RemoveTagsRegex)
      };

      response.data.skills.r = {
        imgURL: `https://cdn.lolalytics.com/generated/spell64px/${championName}_r.jpg`,
        order: RElement.innerHTML.replaceAll('<div class=""></div>', '<div class="">0</div>').match(RemoveTagsRegex)
      };
    });

    elements = document.querySelectorAll('.SummaryStarting_starting__oqr6S');

    elements.forEach((item) => {
      const FirstElement = item.firstElementChild;
      const SecondElement = FirstElement.nextElementSibling;

      const data : Item[] = [];

      // remover esta monstruosidade quando soubermos algo melhor kkk
      Object.getOwnPropertyNames(items).forEach(function(val) {
        if (items[val] === FirstElement.firstElementChild.getAttribute('alt')) {
          data.push({
            icon: `https://cdn.lolalytics.com/generated/item64px/${val}.jpg`,
            name: FirstElement.firstElementChild.getAttribute('alt')
          });
        }
        else if (items[val] === SecondElement.firstElementChild.getAttribute('alt')) {
          data.push({
            icon: `https://cdn.lolalytics.com/generated/item64px/${val}.jpg`,
            name: SecondElement.firstElementChild.getAttribute('alt')
          });
        }
      });

      response.data.build.push({
        label: 'Starting items',
        items: data
      });
    });
    
    elements = document.querySelectorAll('.SummaryShowItem_item__MSQwR');
    
    const core : Item[] = [];
    
    core.push({
      icon: `https://cdn.lolalytics.com/generated/item64px/${elements[0].firstElementChild.getAttribute('data-id')}.jpg`,
      name: items[elements[0].firstElementChild.getAttribute('data-id')]
    });

    core.push({
      icon: `https://cdn.lolalytics.com/generated/item64px/${elements[1].firstElementChild.getAttribute('data-id')}.jpg`,
      name: items[elements[1].firstElementChild.getAttribute('data-id')]
    });

    core.push({
      icon: `https://cdn.lolalytics.com/generated/item64px/${elements[2].firstElementChild.getAttribute('data-id')}.jpg`,
      name: items[elements[2].firstElementChild.getAttribute('data-id')]
    });

    response.data.build.push({
      label: 'Core build',
      items: core
    });

    const item4 : Item[] = [];

    item4.push({
      icon: `https://cdn.lolalytics.com/generated/item64px/${elements[3].firstElementChild.getAttribute('data-id')}.jpg`,
      name: items[elements[3].firstElementChild.getAttribute('data-id')]
    });

    item4.push({
      icon: `https://cdn.lolalytics.com/generated/item64px/${elements[4].firstElementChild.getAttribute('data-id')}.jpg`,
      name: items[elements[4].firstElementChild.getAttribute('data-id')]
    });

    response.data.build.push({
      label: 'Item 4',
      items: item4
    });

    const item5 : Item[] = [];

    item5.push({
      icon: `https://cdn.lolalytics.com/generated/item64px/${elements[5].firstElementChild.getAttribute('data-id')}.jpg`,
      name: items[elements[5].firstElementChild.getAttribute('data-id')]
    });

    item5.push({
      icon: `https://cdn.lolalytics.com/generated/item64px/${elements[6].firstElementChild.getAttribute('data-id')}.jpg`,
      name: items[elements[6].firstElementChild.getAttribute('data-id')]
    });

    item5.push({
      icon: `https://cdn.lolalytics.com/generated/item64px/${elements[7].firstElementChild.getAttribute('data-id')}.jpg`,
      name: items[elements[7].firstElementChild.getAttribute('data-id')]
    });

    response.data.build.push({
      label: 'Item 5',
      items: item5
    });

    const item6 : Item[] = [];

    item6.push({
      icon: `https://cdn.lolalytics.com/generated/item64px/${elements[8].firstElementChild.getAttribute('data-id')}.jpg`,
      name: items[elements[8].firstElementChild.getAttribute('data-id')]
    });

    item6.push({
      icon: `https://cdn.lolalytics.com/generated/item64px/${elements[9].firstElementChild.getAttribute('data-id')}.jpg`,
      name: items[elements[9].firstElementChild.getAttribute('data-id')]
    });

    item6.push({
      icon: `https://cdn.lolalytics.com/generated/item64px/${elements[10].firstElementChild.getAttribute('data-id')}.jpg`,
      name: items[elements[10].firstElementChild.getAttribute('data-id')]
    });

    response.data.build.push({
      label: 'Item 6',
      items: item6
    });

    elements = document.querySelectorAll('.SummarySums_sums__yiSE3');

    elements.forEach((item) => {
      const FirstElement = item.firstElementChild;
      const SecondElement = FirstElement.nextElementSibling;

      response.data.spells.push(FirstElement.getAttribute('alt'));
      response.data.spells.push(SecondElement.getAttribute('alt'));
    });

    response.error = null;
    return response;
  }, championName).catch((error: Error) => {
    return {
      data: null,
      error: {
        message: 'Um erro ocorreu e a consulta não pôde ser efetuada!',
        devMessage: error.message
      }
    };    
  });
        
  await browser.close();
  
  return champion;
}
