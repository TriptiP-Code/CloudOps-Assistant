// const StatCard = ({ title, value }) => {
//   return (
//     <div className="bg-white rounded-xl shadow p-6">
//       <h3 className="text-gray-500">
//         {title}
//       </h3>

//       <p className="text-3xl font-bold mt-2">
//         {value}
//       </p>
//     </div>
//   );
// };

// export default StatCard;

const StatCard = ({ title, value }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">

      <p className="text-slate-400 text-sm">
        {title}
      </p>

      <h2 className="text-3xl font-bold text-white mt-3">
        {value}
      </h2>

    </div>
  );
};

export default StatCard;