import { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

export const Tooltip = ({...props}: IProps) => {
  return (
    <span className='absolute block shadow-lg text-center bottom-[calc(100%+10px)] left-[50%] translate-x-[-50%] z-[9999999] opacity-0 rounded p-2 text-white bg-secondary scale-0 transition-all duration-200 cun group-hover:scale-100 group-hover:opacity-100 min-w-[125px]'>
      {props.children}
      <span className='absolute left-[50%] translate-x-[-50%] bottom-[-6px] w-0 h-0 border-t-[6px] border-l-[5px] border-r-[5px] border-t-secondary border-l-[transparent] border-r-[transparent]'></span>
    </span>
  );
};

export default Tooltip;
