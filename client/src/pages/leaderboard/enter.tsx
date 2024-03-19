import React, { useEffect, useState } from "react";
import Teams from "./Teams";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getJuryTeams,
  getLeaderboard,
  getTeamEvaluatedbyJury,
} from "../../Apis/juries";
import { getUserById } from "../../Apis/users";

interface Team {
  teamId: number;
  teamName: string;
  teamLead: string;
  timeSlot1: string;
}

// const JuriesList: React.FC<{
//   juries: Jury[];
//   setSelectedJury: (jury: Jury | null) => void;
// }> = ({ juries, setSelectedJury }) => {
//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-2">Juries</h2>
//       <table className="border-collapse border border-gray-400">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border border-gray-400 px-4 py-2">Jury Name</th>
//             <th className="border border-gray-400 px-4 py-2">Panel Number</th>
//           </tr>
//         </thead>
//         <tbody>
//           {juries.map((jury) => (
//             <tr
//               key={jury.number}
//               onClick={() => setSelectedJury(jury)}
//               className="cursor-pointer hover:bg-gray-100"
//             >
//               <td className="border border-gray-400 px-4 py-2">{jury.name}</td>
//               <td className="border border-gray-400 px-4 py-2">
//                 {jury.number}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

const TeamsList: React.FC<{
  teams: Team[];
  juryId: number;
  juryName: string;
}> = ({ teams, juryId, juryName }) => {
  const navigate = useNavigate();

  const [response, setResponse] = useState<any>();
  const [submissionStatus, setSubmissionStatus] = useState<
    Record<number, boolean>
  >({});
  const isSubmitted = async (team: Team) => {
    try {
      const isAlreadySubmitted = response?.some(
        (x: { teamId: number }) => x.teamId === team.teamId
      );
      return isAlreadySubmitted;
    } catch (error) {
      console.error("Error checking submission status:", error);
      return false;
    }
  };

  useEffect(() => {
    if (response) {
      Promise.all(teams?.map((team) => isSubmitted(team)))
        .then((results) => {
          const statusMap: Record<number, boolean> = {};
          teams.forEach((team, index) => {
            statusMap[team.teamId] = results[index];
          });
          setSubmissionStatus(statusMap);
        })
        .catch((error) => {
          console.error("Error fetching submission status:", error);
        });
    }
  }, [response, teams]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getTeamEvaluatedbyJury(juryId);
        setResponse(res.payload);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchData();
  }, []);

  const handleTeamClick = (team: Team) => {
    navigate("/score", { state: { team, juryId, juryName } });
  };

  return (
    <div>
      <h2 className="text-sm lg:text-xl font-semibold mb-2">Teams</h2>
      <table className=" text-xs lg:text-xl min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Team Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Team Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Team Lead
            </th>
            {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Time Slot - I
            </th> */}
            <th>📑</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {teams?.map((team, index) => {
            return (
              <tr key={index}>
                <td className="text-sm px-4 py-4 whitespace-nowrap">{team.teamId}</td>
                <td className="text-sm  px-4 py-4 whitespace-nowrap">{team.teamName}</td>
                <td className="text-sm px-4 py-4 whitespace-nowrap">{team.teamLead}</td>
                {/* <td className="px-4 py-4 whitespace-nowrap">
                  {team.timeSlot1}
                </td> */}
                <td className="px-4 py-4 whitespace-nowrap">
                  <button
                    disabled={submissionStatus[team.teamId]}
                    className={`text-xs px-4 py-2 border rounded-lg font-bold ${
                      submissionStatus[team.teamId]
                        ? "bg-gray-400 text-gray-800"
                        : "bg-blue-500 text-white"
                    }`}
                    onClick={() => handleTeamClick(team)}
                  >
                    {submissionStatus[team.teamId]?'Graded':'Grade Team'}
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
  const location = useLocation();
  const { state } = location;
  const { user } = state || { user: null };
  const [userData, setUserData] = useState(user);
  const userObjGDSC = localStorage.getItem("userObjGDSC");
  const userId = userObjGDSC ? JSON.parse(userObjGDSC).userId : null;

  const [teams, setTeams] = useState([]);

  useEffect(() => {
    if (!user) {
      if (userId) {
        getUserById(userId).then((userData) => {
          setUserData(userData.user);
        });
      }
    }
    if (userId) {
      getJuryTeams(userId).then((res) => {
        setTeams(res.payload);
      });
    }
  }, [user, userId]);

  return (
    <>
      {userData && (
        <div className="container mx-auto pt-5">
          <div className="text-center"> 
          <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded border border-blue-400">Jury</span>
           {userData.name}  
          </div> 
          
          <div className="flex flex-col lg:flex-row pt-5">
            <div className="w-3/4">
              <TeamsList
                teams={teams}
                juryId={userId}
                juryName={userData.name}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// interface Jury {
//   name: string;
//   number: string;
//   teams: Team[];
// }

export default Enter;
