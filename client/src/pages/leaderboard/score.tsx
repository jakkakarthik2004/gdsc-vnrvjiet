import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { submitEval } from "../../Apis/juries";
import toast from "react-hot-toast";

interface Team {
  teamId: number;
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
  const { team, juryId, juryName } = location.state;
  const [metrics, setMetrics] = useState({
    creativity: 0,
    businessPerspective: 0,
    uiux: 0,
    implementation: 0,
  });

  const handleMetricChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMetrics((prevMetrics) => ({
      ...prevMetrics,
      [name]: parseInt(value) || 0,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const scores = {
      implementation: metrics.implementation,
      businessPerspective: metrics.businessPerspective,
      uiux: metrics.uiux,
      creativity: metrics.creativity,
    };

    const dataToSend = {
      juryId,
      teamId: team.teamId,
      scores,
    };

    console.log(dataToSend);

    submitEval(dataToSend);
    toast.success(`Graded team ${team.teamName} !`, 
      {style:{background:'#86efac'}}
      );
    navigate("/enter");
  };

  return (
    <div className="flex justify-center items-center p-6">
      <div className="gap-6">
        <form onSubmit={handleSubmit}>
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
                <th className="border border-gray-400 px-4 py-2">
                  Score (out of 10)
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(metrics).map(([metric, value]) => (
                <tr key={metric}>
                  <td className="border border-gray-400 px-4 py-2">
                    {metric.charAt(0).toUpperCase() + metric.slice(1)}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    <input
                      type="number"
                      name={metric}
                      value={value}
                      onChange={handleMetricChange}
                      className="border border-gray-300 p-1"
                      min={0}
                      max={10}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            // onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Score;
