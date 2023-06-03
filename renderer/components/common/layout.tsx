import TheHeader from '@/structure/TheHeader';
import TheFooter from '@/structure/TheFooter';
import { useEffect, useRef, useState } from 'react';

export default function Layout({ children }) {
  const headerRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const [compensation, setCompensation] = useState<number>(0);

  useEffect(() => {
    if(headerRef.current && footerRef.current) {
      setCompensation(headerRef.current.getBoundingClientRect().height + footerRef.current.getBoundingClientRect().height);      
    }        
  }, []);

  return (
    <>
      <TheHeader ref={headerRef}/>
      <main className='py-7' style={{
        minHeight: `calc(100vh - ${compensation}px)`
      }}>{children}</main>
      <TheFooter ref={footerRef}/>
    </>
  );
}