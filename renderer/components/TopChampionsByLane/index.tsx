import { capitalized } from '@/utils/general';
import API from 'lib/API/API.Constants';
import { ChampionsRequest } from 'lib/API/API.Interfaces';
import { Champion } from 'lib/LA/LA.DataTypes/LA.Interfaces';
import OrderChampions from 'lib/LA/LA.Utils/LA.OrderChampions';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { AppContext } from '../common/AppProvider';

export default function TopChampionsByLane() {
  const [champions, setChampions] = useState<Champion[]>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentLane, setCurrentLane] = useState<string>(null);
  const [filter, setFilter] = useState<string>(null);
  const router = useRouter();

  const Lanes = {
    0: 'top',
    1: 'jungle',
    2: 'middle',
    3: 'bottom',
    4: 'support'
  };

  const orderBy = {
    0: 'rank',
    1: 'name',
    2: 'winrate',
    3: 'games'
  };

  const getChampions = async (lane: number) => {
    setChampions(null);
    setLoading(true);
    setError(null);
    setCurrentLane(Lanes[lane]);    

    const data = Object.entries({
      region: 'br',
      tier: 'gold_plus',
      lane: Lanes[lane]
    });

    let params = '?';
        
    data.forEach((element) => {
      params += params === '?' ? '' : '&';
      params += element[0].concat('=', element[1]);
    });
    
    const req = await fetch(API.hostname.concat(params), { 
      method: 'GET',
      mode: 'no-cors',
      cache: 'default' 
    });
    const reqData: ChampionsRequest = await req.json();       

    if(!reqData.error) {
      setChampions(reqData.champions);
    } else {
      setChampions(null);
      setError(reqData.error.message);  
      console.error(reqData.error);          
    }
    
    setLoading(false);
  };

  const changeOrder = (filter: number) => {
    const newChampionsData: Champion[] = OrderChampions(champions, filter);   
    setChampions(newChampionsData);
    setFilter(orderBy[filter]);
  };

  const buttons = () => {
    const roleButtons = [];

    for(let i = 0; i < Object.keys(Lanes).length; i++) {
      roleButtons.push(
        <button 
          key={Lanes[i]}
          className='border border-secondary rounded hover:bg-secondary hover:text-white transition-all duration-200 w-[64px] h-[64px] text-[12px] bg-primary' 
          onClick={() => getChampions(i)}>
          {capitalized(Lanes[i])}
        </button>
      );
    }

    return roleButtons;
  };  

  const handleChampion = async (champion: Champion) : Promise<void> => {    
    router.push({
      pathname: `/champion/${champion.name.replace('\'', '').replace(' ', '').toLowerCase()}`,
      query: {
        lane: currentLane
      }
    })
  };
  
  return (
    <section id='top-champions'>
      <div className='container mx-auto'>
        <div className='flex gap-[20px] mb-[50px]'>{buttons()}</div>           
        <h1 className='text-xl mb-[10px]'>Best {currentLane && capitalized(currentLane)} Champions</h1>
        <table className='text-[12px] w-[min(100%,600px)] mb-[50px]'>
          <thead className='bg-secondary h-[40px]'>
            <tr>
              {
                ['Rank', 'Champion', 'Winrate', 'Games'].map((label, index) => (
                  <th key={label} className='border border-secondary text-left px-[10px] cursor-pointer' onClick={() => champions && changeOrder(index)}>
                    <span className='flex gap-2 items-baseline'>
                      {label}
                      <span className={filter === orderBy[index] ? 'rotate-90' : '-rotate-90' }>{'>'}</span>
                    </span>
                  </th>
                ))
              }
            </tr>
          </thead>
          <tbody className='bg-primary'>      
            {
              (loading || error || !champions) ?
                <tr>
                  <td className='px-[10px] h-[34px]' colSpan={4}>{error ? error : loading ? 'Aguarde...' : 'Selecione uma lane acima para buscar.'}</td>
                </tr> :
                <>
                  {
                    champions && champions.map((champion, i) => (
                      <tr key={`champ-${i}`} className='border-b border-l border-r border-secondary'>
                        {
                          Object.keys(champion).map((label, j) => (
                            <td key={`label-${j}`}>
                              <span 
                                className={`${label === orderBy[1] && 'flex items-center gap-2'} px-[10px] py-2 cursor-pointer rounded transition-colors duration-200 hover:bg-secondary hover:text-white`}
                                onClick={() => handleChampion(champion)}
                              >
                                {
                                  label === orderBy[1] && 
                                  <img 
                                    className='h-[45px] w-[45px] rounded-full' 
                                    src={`https://cdn.lolalytics.com/generated/champion280px/${champion.name.replace('\'', '').replace(' ', '').toLowerCase()}.jpg`} 
                                    alt={champion.name}
                                  />
                                }
                                {champion[label]}
                              </span>
                            </td>
                          ))
                        }
                      </tr>
                    ))
                  }
                </>
            }       
          </tbody>
        </table>   
      </div>
    </section>
  );
}
