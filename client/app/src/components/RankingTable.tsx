const RankingTable = () => {
  return (
    <div className="bg-gradient-to-r from-[#6a11cb] to-[#2575fc] rounded-lg">
      <table className="min-w-full bg-transparent rounded-lg overflow-hidden">
        <thead className="bg-gray-200 bg-opacity-20">
          <tr>
            <th className="py-3 px-4 text-left text-sm font-semibold text-white">RK</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-white">Team</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-white">Total Points</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-white hidden md:table-cell">Previous Points</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-white hidden md:table-cell">+/−</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-white hidden lg:table-cell">Match Window</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-opacity-50 hover:bg-white transition duration-300">
            <td className="py-2 px-4 text-white">12</td>
            <td className="py-2 px-4 text-white">Colombia</td>
            <td className="py-2 px-4 text-white">1694.44</td>
            <td className="py-2 px-4 text-white hidden md:table-cell">1694</td>
            <td className="py-2 px-4 text-white hidden md:table-cell">+0.44</td>
            <td className="py-2 px-4 text-white hidden lg:table-cell"></td>
          </tr>
          <tr className="hover:bg-opacity-50 hover:bg-white transition duration-300">
            <td className="py-2 px-4 text-white">13</td>
            <td className="py-2 px-4 text-white">Croatia</td>
            <td className="py-2 px-4 text-white">1691.59</td>
            <td className="py-2 px-4 text-white hidden md:table-cell">1692</td>
            <td className="py-2 px-4 text-white hidden md:table-cell">-0.41</td>
            <td className="py-2 px-4 text-white hidden lg:table-cell"></td>
          </tr>
          <tr className="bg-opacity-20 bg-white hover:bg-opacity-80 transition duration-300">
            <td className="py-2 px-4 text-white">14</td>
            <td className="py-2 px-4 text-white">Morocco</td>
            <td className="py-2 px-4 text-white">1688.18</td>
            <td className="py-2 px-4 text-white hidden md:table-cell">1688</td>
            <td className="py-2 px-4 text-white hidden md:table-cell">+0.18</td>
            <td className="py-2 px-4 text-white hidden lg:table-cell"></td>
          </tr>
          <tr className="hover:bg-opacity-50 hover:bg-white transition duration-300">
            <td className="py-2 px-4 text-white">15</td>
            <td className="py-2 px-4 text-white">Japan</td>
            <td className="py-2 px-4 text-white">1652.79</td>
            <td className="py-2 px-4 text-white hidden md:table-cell">1653</td>
            <td className="py-2 px-4 text-white hidden md:table-cell">-0.21</td>
            <td className="py-2 px-4 text-white hidden lg:table-cell"></td>
          </tr>
          <tr className="hover:bg-opacity-50 hover:bg-white transition duration-300">
            <td className="py-2 px-4 text-white">16</td>
            <td className="py-2 px-4 text-white">USA</td>
            <td className="py-2 px-4 text-white">1651.23</td>
            <td className="py-2 px-4 text-white hidden md:table-cell">1652</td>
            <td className="py-2 px-4 text-white hidden md:table-cell">-0.77</td>
            <td className="py-2 px-4 text-white hidden lg:table-cell"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RankingTable;
