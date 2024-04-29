import { CategoryProgress } from './CategoryProgress';

/* eslint-disable @next/next/no-img-element */
export const CategoryCard = ({cat}) => {
  return (
    <div className='h-fit   w-full  rounded-lg border border-[#f3f3f3] px-4 py-3'>
      <div className='flex flex-col gap-2 '>

        {cat && Object?.keys(cat)?.map((item,index)=>(
            <CategoryProgress iconSrc={""} text={item} stat={cat[item]} />
        ))}
        
      </div>
    </div>
  );
};
