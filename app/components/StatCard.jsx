export const StatCard = ({ name, stat, textBased }) => {
  return (
    <div className="bg-[#F6F6F6] p-4 rounded-md ">
      <h2 className="text-lg font-medium">{name}</h2>
      {textBased? <p className="my-2 text-2xl font-bold">{stat}</p>: <p className="my-2 text-5xl font-bold">£ {stat}</p>}
    </div>
  );
};
