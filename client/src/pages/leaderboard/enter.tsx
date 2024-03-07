import React, { useEffect, useState } from "react";
import Teams from "./Teams";
import { useNavigate } from "react-router-dom";
import { getLeaderboard } from "../../Apis/juries";

interface Jury {
  name: string;
  number: string;
  teams: Team[];
}

interface Team {
  teamNumber: number;
  teamName: string;
  teamLead: string;
  timeSlot1: string;
}

const JuriesList: React.FC<{
  juries: Jury[];
  setSelectedJury: (jury: Jury | null) => void;
}> = ({ juries, setSelectedJury }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Juries</h2>
      <table className="border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 px-4 py-2">Jury Name</th>
            <th className="border border-gray-400 px-4 py-2">Panel Number</th>
          </tr>
        </thead>
        <tbody>
          {juries.map((jury) => (
            <tr
              key={jury.number}
              onClick={() => setSelectedJury(jury)}
              className="cursor-pointer hover:bg-gray-100"
            >
              <td className="border border-gray-400 px-4 py-2">{jury.name}</td>
              <td className="border border-gray-400 px-4 py-2">
                {jury.number}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TeamsList: React.FC<{ teams: Team[]; juryName: string }> = ({
  teams,
  juryName,
}) => {
  const navigate = useNavigate();
  const [response, setResponse] = useState<any>();
  const [submissionStatus, setSubmissionStatus] = useState<
    Record<number, boolean>
  >({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getLeaderboard();
        setResponse(res.payload);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchData();
  }, []);

  const isSubmitted = async (team: Team) => {
    try {
      const isAlreadySubmitted = response?.some(
        (x: { teamName: string; teamLead: any }) =>
          x.teamName === team.teamName && x.teamLead === team.teamLead
      );
      return isAlreadySubmitted;
    } catch (error) {
      console.error("Error checking submission status:", error);
      return false;
    }
  };

  useEffect(() => {
    if (response) {
      Promise.all(teams.map((team) => isSubmitted(team)))
        .then((results) => {
          const statusMap: Record<number, boolean> = {};
          teams.forEach((team, index) => {
            statusMap[team.teamNumber] = results[index];
          });
          setSubmissionStatus(statusMap);
        })
        .catch((error) => {
          console.error("Error fetching submission status:", error);
        });
    }
  }, [response, teams]);

  const handleTeamClick = (team: Team) => {
    navigate("/score", { state: { team, juryName } });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Teams</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Team Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Team Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Team Lead
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Time Slot - I
            </th>
            <th>📑</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {teams.map((team, index) => {
            return (
              <tr key={index}>
                <td className="px-4 py-4 whitespace-nowrap">
                  {team.teamNumber}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">{team.teamName}</td>
                <td className="px-4 py-4 whitespace-nowrap">{team.teamLead}</td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {team.timeSlot1}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <button
                    disabled={submissionStatus[team.teamNumber]}
                    className={`px-4 py-2 border rounded-lg font-bold ${
                      submissionStatus[team.teamNumber]
                        ? "bg-gray-400 text-gray-800"
                        : "bg-blue-500 text-white"
                    }`}
                    onClick={() => handleTeamClick(team)}
                  >
                    Grade Team
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const Enter: React.FC = () => {
  const [juries] = useState<Jury[]>(Teams);
  const [selectedJury, setSelectedJury] = useState<Jury | null>(null);

  useEffect(() => {
    const storedSelectedJury = sessionStorage.getItem("selectedJury");
    if (storedSelectedJury) {
      setSelectedJury(JSON.parse(storedSelectedJury));
    }
  }, []);

  useEffect(() => {
    if (selectedJury) {
      sessionStorage.setItem("selectedJury", JSON.stringify(selectedJury));
    } else {
      sessionStorage.removeItem("selectedJury");
    }
  }, [selectedJury]);

  return (
    <div className="container mx-auto">
      <div className="flex flex-col lg:flex-row">
        <div className="w-1/4 mr-4">
          <JuriesList juries={juries} setSelectedJury={setSelectedJury} />
        </div>
        <div className="w-3/4">
          {selectedJury && (
            <TeamsList
              teams={selectedJury.teams}
              juryName={selectedJury.name}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Enter;
