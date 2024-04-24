import { Progress } from "antd";

/* eslint-disable @next/next/no-img-element */
export const CategoryProgress = ({ iconSrc, text, stat }) => {
  return (
    <div className='flex gap-4'>
      {/* <div>
        <img src={iconSrc} alt='icon' />
      </div> */}

      <div className='flex flex-col w-full'>
        <div className='flex justify-between'>
          <p className="font-bold">{text}</p>
          <p>$ {stat}</p>
        </div>

        <div>
          <Progress percent={100} showInfo={false}/>
        </div>
      </div>
    </div>
  );
};
