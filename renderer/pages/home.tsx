import Head from 'next/head';
import type { GetStaticProps } from 'next';
import { TopChampionsByLane } from '@/components';

interface PageProps {
  title: string;
  description: string;
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {  
  return {
    props: {
      title: 'LoL DataHub',
      description: 'Informações sobre build, items e habilidade de campeões do League of Legends.'
    }
  };
};

export default function Home ({title, description}: PageProps) {  
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
      </Head>
      <TopChampionsByLane />
    </>
  );
}
