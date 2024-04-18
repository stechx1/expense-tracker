import { CategoryProgress } from './CategoryProgress';

/* eslint-disable @next/next/no-img-element */
export const CategoryCard = () => {
  return (
    <div className='h-fit max-w-[300px] rounded-lg border border-[#f3f3f3] px-4 py-3'>
      <div className='flex flex-col gap-2 '>
        <CategoryProgress iconSrc={"/food.svg"} text={"Food"} stat={150} />
        <CategoryProgress iconSrc={"/clothes.svg"} text={"Clothing"} stat={20} />
      </div>
    </div>
  );
};
