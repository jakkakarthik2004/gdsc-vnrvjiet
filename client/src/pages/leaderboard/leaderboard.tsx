import { useState, useEffect } from "react";
import { getLeaderboard } from "../../Apis/juries";

interface Teams {
  id?: number;
  name?: string;
  creativity: string;
  ideation: any;
  presentation: any;
  futureScope: any;
}

const Leaderboard = () => {
  const [teams, setTeams] = useState<Teams[]>([]);

  useEffect(() => {
    const getData = async () => {
      const x = await getLeaderboard();
      setTeams(x);
      console.log(x, "hiii");
    };
    getData();
  }, []);

  const calculateTotalScore = (team: {
    id?: number;
    name?: string;
    creativity: string;
    ideation: any;
    presentation: any;
    futureScope: any;
  }) => {
    const { creativity, futureScope, ideation, presentation } = team;
    return creativity + futureScope + ideation + presentation;
  };

  const teamRows = Array.isArray(teams)
    ? teams.map((team: Teams) => (
        <tr key={team.id}>
          <td className="border px-4 py-2">{team.name}</td>
          <td className="border px-4 py-2">{team.creativity}</td>
          <td className="border px-4 py-2">{team.futureScope}</td>
          <td className="border px-4 py-2">{team.ideation}</td>
          <td className="border px-4 py-2">{team.presentation}</td>
          <td className="border px-4 py-2">{calculateTotalScore(team)}</td>
        </tr>
      ))
    : null;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Leaderboard</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Team Name</th>
            <th className="px-4 py-2">creativity</th>
            <th className="px-4 py-2">futureScope</th>
            <th className="px-4 py-2">Implementation</th>
            <th className="px-4 py-2">Ideation</th>
            <th className="px-4 py-2">presentation</th>
            <th className="px-4 py-2">Total Score</th>
          </tr>
        </thead>
        <tbody>{teamRows}</tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
