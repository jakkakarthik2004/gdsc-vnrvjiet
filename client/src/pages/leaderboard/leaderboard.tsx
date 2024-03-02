import React, { useState } from "react";
import { getAllEval } from "../../Apis/juries";

const Leaderboard = () => {
  const [teams, setTeams] = useState([
    {
      id: 1,
      name: "Team 1",
      problemStatement: "Statement 1",
      communication: 8,
      feasibility: 7,
      implementation: 9, 
      ideation: 6,
      design: 8,
    },
  ]);
  const updateScore = (teamId: number, field: any, value: any) => {
    const updatedTeams = teams.map((team) => {
      if (team.id === teamId) {
        return { ...team, [field]: value };
      }
      return team;
    });
    setTeams(updatedTeams);
  };

  const calculateTotalScore = (team: {
    id?: number;
    name?: string;
    problemStatement?: string;
    communication: any;
    feasibility: any;
    implementation: any;
    ideation: any;
    design: any;
  }) => {
    const { communication, feasibility, implementation, ideation, design } =
      team;
    return communication + feasibility + implementation + ideation + design;
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Leaderboard</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Team Name</th>
            <th className="px-4 py-2">Problem Statement</th>
            <th className="px-4 py-2">Communication</th>
            <th className="px-4 py-2">Feasibility</th>
            <th className="px-4 py-2">Implementation</th>
            <th className="px-4 py-2">Ideation</th>
            <th className="px-4 py-2">Design</th>
            <th className="px-4 py-2">Total Score</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.id}>
              <td className="border px-4 py-2">{team.name}</td>
              <td className="border px-4 py-2">{team.problemStatement}</td>
              <td className="border px-4 py-2">{team.communication}</td>
              <td className="border px-4 py-2">{team.feasibility}</td>
              <td className="border px-4 py-2">{team.implementation}</td>
              <td className="border px-4 py-2">{team.ideation}</td>
              <td className="border px-4 py-2">{team.design}</td>
              <td className="border px-4 py-2">{calculateTotalScore(team)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
