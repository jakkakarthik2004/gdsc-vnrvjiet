import React from "react";
import sollutionChallengeImage from "../images/sollutionChallengeImage.png";

function SolutionChallenge() {
  return (
    <div className="p-8 flex flex-col max-w-[1060px] text-[16px] text-[#202126] m-auto">
      <div className={` shrink-0 h-[222px] overflow-hidden `}>
        <img
          src={sollutionChallengeImage}
          alt="image"
          className=" shrink-0 rounded-full w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default SolutionChallenge;
