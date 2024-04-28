/* eslint-disable @next/next/no-img-element */
export const StatCardWithIcon = ({ iconSrc, stat, text }) => {
  return (
    <div className='h-fit max-w-[420px] sm:max-w-[300px] rounded-lg border border-[#f3f3f3] px-4 py-3'>
      <div className='flex gap-8 items-center'>
        <div>
          {/* Icon */}
          <img src={iconSrc} loading='lazy' alt='google logo' />
        </div>
        <div className='flex flex-col'>
          {/* Other Info */}
          <p>{text}</p>
          <p className='text-5xl font-bold'>$ {stat}</p>
        </div>
      </div>
    </div>
  );
};
