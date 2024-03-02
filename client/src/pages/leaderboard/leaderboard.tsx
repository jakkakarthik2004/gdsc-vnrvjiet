import React, { useState, useEffect } from "react";
import { getLeaderboard } from "../../Apis/juries";

interface Teams {
  _id?: string;
  teamName?: string;
  teamLead?: string;
  metrics: {
    creativity: number;
    ideation: number;
    presentation: number;
    futureScope: number;
  };
}

const Leaderboard = () => {
  const [teams, setTeams] = useState<Teams[]>([]);

  const getData = async () => {
    try {
      const response = await getLeaderboard();
      setTeams(response);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  useEffect(() => {
    
    getData();
  }, []);

  const calculateTotalScore = (team: Teams) => {
    const { creativity, futureScope, ideation, presentation } = team.metrics;
    return creativity + futureScope + ideation + presentation;
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-row ">
      <h1 className="text-2xl font-bold mb-4">Leaderboard</h1>
      <button className="mx-auto" onClick={()=>getData()}> Refresh </button>
      {/* <img src="https://assets-v2.lottiefiles.com/a/b60eaa18-118b-11ee-a837-7f9ff7261f26/PoxLPX9DzF.gif"/> */}
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Sno</th>
            <th className="px-4 py-2">Team Name</th>
            <th className="px-4 py-2">creativity</th>
            <th className="px-4 py-2">futureScope</th>
            <th className="px-4 py-2">Implementation</th>
            <th className="px-4 py-2">Ideation</th>
            <th className="px-4 py-2">presentation</th>
            <th className="px-4 py-2">Total Score</th>
          </tr>
        </thead>
        <tbody>
          {teams.length > 0 ? (
            teams.map((team: Teams) => (
              <tr key={team._id}>
                <td className="border px-4 py-2">{team.teamName}</td>
                <td className="border px-4 py-2">{team.metrics.creativity}</td>
                <td className="border px-4 py-2">{team.metrics.futureScope}</td>
                <td className="border px-4 py-2">{team.metrics.ideation}</td>
                <td className="border px-4 py-2">
                  {team.metrics.presentation}
                </td>
                <td className="border px-4 py-2">
                  {calculateTotalScore(team)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border px-4 py-2" colSpan={8}>
                Loading...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
