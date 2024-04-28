export const StatCard = ({ name, stat, textBased }) => {
  return (
    <div className="bg-white-600 p-4 rounded-md shadow-lg  text-black   w-[99%] mx-auto">
      <h2 className="text-[16px] sm:text-[18px]  text-nowrap font-medium">{name}</h2>
      {stat ? <p className="my-2 text-[16px] sm:text-[22px] font-bold">{textBased?stat : `£ ${stat}`}</p>:'-'}
    </div>
  );
};
