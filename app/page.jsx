import Image from 'next/image';
import { StatCard } from './components/StatCard';

export default function Home() {
  return (
    <main className='container mx-auto'>
      <div className='grid grid-cols-4 my-10 gap-6'>
        <StatCard name={'Overall Spent'} stat={200} />
        <StatCard name={'This Year'} stat={120} />
        <StatCard name={'This Month'} stat={45} />
        <StatCard name={'This Week'} stat={45} />
        <StatCard name={'Today'} stat={45} />
        <StatCard textBased name={'Most Spent on'} stat={'Investment'} />
        <StatCard name={'Most Spent day'} stat={'Saturday'} textBased />
        <StatCard name={'Least Spent Day'} stat={'Friday'} textBased />
      </div>
    </main>
  );
}
