import { Champion } from 'lib/LA/LA.DataTypes/LA.Interfaces';
import Link from 'next/link';
import { LegacyRef, createRef, forwardRef, useContext, useEffect, useState } from 'react';
import { champions as championList } from 'data';
import { useRouter } from 'next/router';
import { AppContext } from '@/components';

const TheHeader = forwardRef(function TheHeader(props, ref: LegacyRef<HTMLElement>){
  const [selectedChampion, setSelectedChampion] = useState<Champion>(null);
  const [champions, setChampions] = useState<Champion[]>(null);
  const [focus, setFocus] = useState<boolean>(false);
  const [name, setName] = useState<string>(null);
  const router = useRouter();
  const { setGlobalState } = useContext(AppContext);
  const wrapperRef = createRef<HTMLInputElement>();

  const handleInput = (championName: string): void => {
    if(!championName) {      
      setFocus(false);
      setChampions(null);
      setName(null);
      setSelectedChampion(null);
      return;
    }
    
    setFocus(true); 
    setName(championName);   
    
    const list = championList.filter(champ => champ.name.toUpperCase().includes(championName.toUpperCase()));
    setChampions(list); 
  }; 

  const handleChampion = async (champion: Champion) : Promise<void> => {
    setFocus(false);
    setSelectedChampion(champion);
    setName(champion.name); 
    setGlobalState(prevState => {
      return {
        ...prevState,
        modalContent: `Aguarde enquanto buscamos os dados de ${champion.name}`,
        openModal: true
      };
    });

    router.push(`/champion/${champion.name.toLowerCase()}`).then(() => {      
      setGlobalState(prevState => {
        return {
          ...prevState,
          openModal: false
        };
      });
    });
  };

  useEffect(() => {
    function handleClick(event) {      
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setFocus(false);
      }
    }
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [wrapperRef]);

  return (
    <header className='px-2 pt-2 pb-0' ref={ref}>
      <div className='league-border shadow-lg'>
        <div className='bg-primary container lg:max-w-[100%] flex justify-between items-baseline py-3 mx-auto'>
          <Link
            href='/'
            className='text-white text-xl font-bold bg-gradient-to-t to-0% from-secondary from-50% px-1'
          >
        LoL DataHub
          </Link>
          <div className='relative' ref={wrapperRef}>
            <div className='relative rounded-md'>
              <input 
                onChange={(el) => handleInput(el.currentTarget.value)}
                type='text'
                name='champ-name' 
                id='champ-name' 
                className={'block bg-primary w-full rounded-md border border-secondary py-1.5 pl-3 pr-20 min-w-[340px] text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6'} 
                placeholder='Jax, Aatrox, Lucian...'
                value={name ? name : ''}
                autoComplete='off'
              />
              <button 
                onClick={() => handleChampion(selectedChampion)}
                className='absolute inset-y-0 right-0 flex items-center rounded-r bg-secondary h-[100%] px-2 text-white'
              >
                Buscar
              </button>
            </div>
            <ul id='champ-list' className={`absolute border border-secondary w-[100%] top-[calc(100%+6px)] left-0 bg-primary rounded transition-opacity duration-300 ${(champions && champions.length > 0) && focus ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
              {
                champions &&
              champions.map((champ, index) => (
                <li 
                  key={`champ-${index}`} 
                  className='px-3 py-1 cursor-pointer hover:bg-secondary transition-all duration-200'
                  onClick={() => handleChampion(champ)}
                >
                  {champ.name}
                </li>
              ))
              }
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
});

export default TheHeader;
