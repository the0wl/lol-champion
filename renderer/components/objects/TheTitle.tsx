import { ReactNode } from 'react';

interface TitleProps {
  type: 'primary' | 'primary-black' | 'primary-white' | 'secondary' | 'secondary-white';
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: ReactNode;
  className?: string;
}

/**
 * Componente de título padronizado para o restante do site.
 * @param {string} type Tipo do título: primary, secondary...
 * @param {string} level Tag atribuída ao título: h1, h3...
 * @return {ReactNode} Componente de título personalizável 
 */

const TheTitle = ({type, level, className, ...props}: TitleProps) => {
  const CustomTitle = level;
  let classes = 'inline-block text-[26px] font-bold ';

  switch(type) {
  case 'primary':
    classes = classes += 'text-white';
    break;
  case 'primary-black':
    classes = classes += 'text-black';
    break;
  case 'secondary':
    classes = classes += 'text-black bg-gradient-to-t to-0% from-secondary from-50% px-1';
    break;
  case 'secondary-white':
    classes = classes += 'text-white bg-gradient-to-t to-0% from-secondary from-50% px-1';
    break;
  }

  return (
    <CustomTitle className={className ? classes.concat(' ', className) : classes} {...props}>
      {props.children}
    </CustomTitle>
  );
};

export default TheTitle;
