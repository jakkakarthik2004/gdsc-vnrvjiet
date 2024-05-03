import React from "react";
import sollutionChallengeImage from "../images/sollutionChallengeImage.png";
import "./SolutionChallenge.css";
import winnerHero from "../images/winners-hero.png";
function SolutionChallenge() {
  return (
    <div>
      <div className="p-8 flex flex-col max-w-[1060px] text-[16px] text-[#202126] m-auto">
        <div className={` shrink-0 h-[222px] overflow-hidden `}>
          <img
            src={sollutionChallengeImage}
            alt="image"
            className="img w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="parent1 mx-10 px-10">
        <div className="child11 ">
          <p className="text-3xl text-slate-800 font-bold my-5 ">
            2024 Solution Challenge
          </p>
          <p>
            The mission of the Solution Challenge is to solve for one or more of
            the United Nations' 17 Sustainable Development Goals using Google
            technology.
            <br />
            Since 2020, Google Developer Student Clubs (GDSC) members from
            around the world come together to create innovative solutions to
            tackle some of the world's most pressing challenges. Solution
            Challenge is open to GDSC members from universities all over. Join a
            GDSC to{" "}
            <a className="text-primary" href="https://gdsc.community.dev/">
              learn more
            </a>
            .<br />
            <b>Submissions for the 2024 Solution Challenge are closed.</b> The
            Global Top 100 teams have offically been announced.
          </p>
        </div>
        {/* <div className="child12"><img alt="" src={sollutionChallengeImage} /></div> */}
      </div>
      <div className="parent2 my-10">
        <div className="child21">
          <img
            className="prize"
            src="https://developers.google.com/static/community/images/gdsc-solution-challenge/groups_outlined_72.png"
          />
          <p className="text-2xl text-slate-800 font-bold mt-10 ">Top 100</p>
          <p>
            Win a T-shirt, certificate, and mentorship from Google and other
            experts to improve and submit a solution for the top prize.
          </p>
        </div>
        <div className="child22">
          <img
            className="prize"
            src="https://developers.google.com/static/community/images/gdsc-solution-challenge/workspace_premium_72.png"
          />
          <p className="text-2xl text-slate-800 font-bold mt-10 ">Final 10</p>
          <p>
            Win a <b>$1,000</b> cash prize per team member and a feature in the
            Google Developers Blog and global Demo Day livestream, plus
            mentorship with a Google expert, swag, and a certificate.
          </p>
        </div>
        <div className="child23">
          <img
            className="prize"
            src="https://developers.google.com/static/community/images/gdsc-solution-challenge/emoji_events_72.png"
          />
          <p className="text-2xl text-slate-800 font-bold mt-10 ">Winning 3</p>
          <p>
            Win a <b>$3,000</b> cash prize per team member and a feature in the
            Google Developers Blog and global Demo Day livestream, plus
            mentorship with a Google expert, swag, and a certificate.
          </p>
        </div>
      </div>
      <p className="text-3xl text-slate-800 font-bold my-5 text-center">
        Winner's prototype
      </p>
      <video className="m-5 mx-auto " controls>
        <source src=""></source>
      </video>
      <div className="grid grid-cols-3 gap-4">
        <img src="https://res.cloudinary.com/startup-grind/image/upload/c_limit,dpr_2,f_auto,g_center,h_1440,q_auto:good,w_2048/v1/gcs/platform-data-dsc/event_wrapup/Screenshot%25202024-02-23%2520230854.png" />
        <img src="https://res.cloudinary.com/startup-grind/image/upload/c_limit,dpr_2,f_auto,g_center,h_1440,q_auto:good,w_2048/v1/gcs/platform-data-dsc/event_wrapup/Screenshot%25202024-02-23%2520233920.png" />
        <img src="https://res.cloudinary.com/startup-grind/image/upload/c_limit,dpr_2,f_auto,g_center,h_1440,q_auto:good,w_2048/v1/gcs/platform-data-dsc/event_wrapup/Screenshot%25202024-02-23%2520232113.png" />
        <img src="https://res.cloudinary.com/startup-grind/image/upload/c_limit,dpr_2,f_auto,g_center,h_1440,q_auto:good,w_2048/v1/gcs/platform-data-dsc/event_wrapup/WhatsApp%2520Image%25202024-02-27%2520at%252009.49.57.jpeg" />
        <img src="https://res.cloudinary.com/startup-grind/image/upload/c_limit,dpr_2,f_auto,g_center,h_1440,q_auto:good,w_2048/v1/gcs/platform-data-dsc/event_wrapup/WhatsApp%2520Image%25202024-02-27%2520at%252009.50.49.jpeg" />
        <img src="https://res.cloudinary.com/startup-grind/image/upload/c_limit,dpr_2,f_auto,g_center,h_1440,q_auto:good,w_2048/v1/gcs/platform-data-dsc/event_wrapup/Screenshot%25202024-02-24%2520164953.png" />
      </div>
    </div>
  );
}

export default SolutionChallenge;
