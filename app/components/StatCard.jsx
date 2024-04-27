export const StatCard = ({ name, stat, textBased }) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-lg drop-shadow-md shadow-gray-100">
      <h2 className="text-lg font-medium">{name}</h2>
      {stat ? <p className="my-2 text-[22px] font-bold">{stat}</p>:'-'}
    </div>
  );
};
