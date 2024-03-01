import React, { useState } from "react";
import { useLocation } from "react-router-dom";

interface Team {
  teamNumber: number;
  teamName: string;
  teamLead: string;
  timeSlot1: string;
}

interface Props {
  team: Team;
  juryName: string;
}

const Score = () => {
  const location = useLocation();
  const { team, juryName } = location.state;
  const [metrics, setMetrics] = useState({
    communication: 0,
    feasibility: 0,
    implementation: 0,
    ideation: 0,
    design: 0,
  });

  const handleMetricChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMetrics((prevMetrics) => ({
      ...prevMetrics,
      [name]: parseInt(value) || 0,
    }));
  };

  const handleSubmit = () => {
    console.log({
      juryName,
      teamName: team.teamName,
      teamLead: team.teamLead,
      ...metrics,
    });
  };

  return (
    <div className="flex justify-center items-center p-6">
      <div className="gap-6">
        <div className="text-xl font-semibold mb-2">{team.teamName}</div>
        <div>
          Jury Name: <b>{juryName}</b>
        </div>
        <div>
          Team Lead: <b>{team.teamLead}</b>
        </div>
        <table className="border-collapse border border-gray-400 mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-4 py-2">Metric</th>
              <th className="border border-gray-400 px-4 py-2">Score</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(metrics).map(([metric, value]) => (
              <tr key={metric}>
                <td className="border border-gray-400 px-4 py-2">{metric}</td>
                <td className="border border-gray-400 px-4 py-2">
                  <input
                    type="number"
                    name={metric}
                    value={value}
                    onChange={handleMetricChange}
                    className="border border-gray-300 p-1"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Submit Metrics
        </button>
      </div>
    </div>
  );
};

export default Score;
