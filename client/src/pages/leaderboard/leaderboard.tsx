import React, { useState, useEffect } from "react";
import { getLeaderboard } from "../../Apis/juries";
import { getDate } from "date-fns";
import acmlogo from "../images/acmlogo.png";
import { useNavigate } from "react-router-dom";

interface Teams {
  _id: number;
  teamName: string;
  records: {
    juryId: number;
    scores: {
      [key: string]: number;
    };
    totalScore: number;
    juryName: string;
  }[];
}

const Leaderboard = () => {
  const [teams, setTeams] = useState<Teams[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getLeaderboard();
      setTeams(response.payload);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  useEffect(() => {
    getData();

    const intervalId = setInterval(() => {
      getData();
    }, 120000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const calculateTotalScore = (team: Teams) => {
    const totalScore1 = team.records[0]?.totalScore || 0;
    return totalScore1;
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-row ">
        <h1 className="text-lg lg:text-2xl font-bold mb-4">
          Webathon 2.0 Leaderboard
        </h1>
        <button
          className="mx-auto text-2xl"
          onClick={() => getData()}
          disabled={loading}
        >
          🔃
        </button>
        <button
          className="mx-auto bg-blue-500 text-white font-bold rounded-md px-3 my-2 text-sm"
          onClick={() => navigate("/analysis")}
          disabled={loading}
        >
          View Analysis
        </button>
      </div>
      {loading ? (
        <div className="flex items-center justify-center">
          <p>Loading...</p>
          <img
            src="https://hadibuttt.github.io/GDSC-Portfolio-Site/img/main.png"
            alt="image"
            className="w-[75vw] md:w-[40vw]"
          />
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-xs md:text-sm">
              <thead className="bg-gray-800">
                <tr>
                  <th className="text-center border-x w-10 text-xs font-medium text-gray-300 uppercase tracking-tight">
                    Sno
                  </th>
                  <th className="text-center border-x text-xs font-medium text-gray-300 uppercase tracking-tight">
                    Team Name
                  </th>
                  <th className="text-center border-x text-xs font-medium text-gray-300 uppercase tracking-tight">
                    Jury
                  </th>
                  <th className="text-center border-x text-xs font-medium text-gray-300 uppercase tracking-tight">
                    Implementation
                  </th>
                  <th className="border-x border-gray-400 text-center text-xs font-medium text-gray-300 uppercase">
                    Business Perspective
                  </th>
                  <th className="border-x border-gray-400 text-center text-xs font-medium text-gray-300 uppercase">
                    UI / UX
                  </th>
                  <th className="border-x border-gray-400 text-center text-xs font-medium text-gray-300 uppercase">
                    Creativity
                  </th>
                  <th className="text-center text-xs font-medium text-gray-300 uppercase">
                    Total
                  </th>
                  {/* <th className=" w-28 border-x text-left text-xs font-medium text-gray-300 uppercase tracking-tight">
                    Average
                  </th> */}
                </tr>
              </thead>
              <tbody className="bg-white text-center">
                {teams &&
                  teams
                    .slice()
                    .sort(
                      (a: Teams, b: Teams) =>
                        calculateTotalScore(b) - calculateTotalScore(a)
                    )
                    .map((team: Teams, index: number) => (
                      <tr key={team._id}>
                        <td className="border px-1 py1 text-xs lg:text-md md:px-4 md:py-2">
                          {index + 1}
                        </td>
                        <td className="border px-1 py1 text-xs lg:text-md md:px-4 md:py-2">
                          {team.teamName}
                        </td>
                        <td className="border px-1 py1 text-xs lg:text-md md:px-4 md:py-2">
                          {team.records[0]?.juryName || "-"}
                        </td>
                        <td className="border px-1 py1 text-xs lg:text-md md:px-4 md:py-2">
                          {team.records[0]?.scores?.implementation || "-"}
                        </td>
                        <td className="border px-1 py1 text-xs lg:text-md md:px-4 md:py-2">
                          {team.records[0]?.scores?.businessPerspective || "-"}
                        </td>
                        <td className="border px-1 py1 text-xs lg:text-md md:px-4 md:py-2">
                          {team.records[0]?.scores?.uiux || "-"}
                        </td>
                        <td className="border px-1 py1 text-xs lg:text-md md:px-4 md:py-2">
                          {team.records[0]?.scores?.creativity || "-"}
                        </td>
                        <td className="border px-1 py1 text-xs lg:text-md md:px-4 md:py-2">
                          {team.records[0]?.totalScore || "-"}
                        </td>
                        {/* <td className="border px-1 py1 text-xs lg:text-md md:px-4 md:py-2">
                          {calculateTotalScore(team)}
                        </td> */}
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Leaderboard;
