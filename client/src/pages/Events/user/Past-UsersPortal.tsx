import React, { useState, useEffect } from "react";
import {
  getAllEvents,
  getEventById,
  getPastEvents,
  getUpcomingEvents,
} from "../../../Apis/events";
import {
  getAllRegistrationsByUserId,
  updateRegistration,
} from "../../../Apis/registrations";
import ConfettiExplosion from "react-confetti-explosion";
import { getUserById } from "../../../Apis/users";
// import noEvents from "../noEvents.png";
import { format } from 'date-fns';

interface Event {
  eventId: number;
  name: string;
  startDate: string;
  endDate: string;
  venue: string;
  description: string;
  // image: string;
}

function UserPortalPast() {
  const [registeredEvents, setRegisteredEvents] = useState<Event[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const userId = localStorage.getItem("userIdGDSC");
  const [userData, setUserData] = useState<{ id: number; name: string }>();
  const [explodingEvent, setExplodingEvent] = React.useState<number | null>(
    null
  );
  const [message, setMessage] = useState("Loading...")

  async function fetchData() {
    try {
      const fetchedEvents = await getPastEvents();
      setEvents(fetchedEvents.payload.reverse());
      setMessage("No past events for now :(")
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);


  const heroStyle = {
    backgroundImage: `url('https://res.cloudinary.com/startup-grind/image/fetch/c_scale,w_2560/c_crop,h_650,w_2560,y_0.0_mul_h_sub_0.0_mul_650/c_crop,h_650,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/https://res.cloudinary.com/startup-grind/image/upload/c_fill%2Cdpr_2.0%2Cf_auto%2Cg_center%2Cq_auto:good/v1/gcs/platform-data-goog/chapter_banners/IOE22-Bevy-ChapterBanner-2560x650_x6zWRuV.png')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100px",
  };

  return (
    <div className="min-h-full p-4">
      <div
        className="HeroSection flex flex-col  bg-cover bg-center bg-no-repeat m-4"
        style={heroStyle}
      >
        <img src="" />
        <h2 className="text-2xl font-bold mb-4 my-auto">
          Welcome 
          {/* back, {userData?.name}. */}
        </h2>
      </div>

      <div>
        {events.length ? (
          <>
            <h3 className="text-xl font-semibold mb-4">Past Events</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {events.map((event) => (
                <div
                  key={event.eventId}
                  className="bg-white rounded shadow-lg max-w-sm hover:scale-105 duration-200 border border-slate-400 p-4"
                >
                  <h4 className="text-lg font-semibold mb-3">{event.name}</h4>
                  <p>
                    {" "}
                    <strong>What's Happening : </strong>
                    {event.description}
                  </p>
                  <p className="py-2">
                  <strong>When : </strong>{" "}
                    {event.startDate}{' - '}{event.endDate}
                  </p>
                  <p>
                    <strong>Where : </strong>
                    {event.venue}
                  </p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center ">
            <p>{message}</p>
            <img
              src="https://hadibuttt.github.io/GDSC-Portfolio-Site/img/main.png"
              alt="image"
              className="w-[75vw] md:w-[40vw]"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default UserPortalPast;



// import React, { useState, useEffect } from "react";
// import { getPastEvents } from "../../../Apis/events";

// interface Event {
//   eventId: number;
//   name: string;
//   startDate: string;
//   endDate: string;
//   venue: string;
//   description: string;
// }

// function UserPortalPast() {
//   const [events, setEvents] = useState<Event[]>([]);
//   const [flippedCard, setFlippedCard] = useState<number | null>(null);
//   const [message, setMessage] = useState("Loading...");

//   async function fetchData() {
//     try {
//       const fetchedEvents = await getPastEvents();
//       setEvents(fetchedEvents.payload.reverse());
//       setMessage("No past events for now :(");
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleCardClick = (eventId: number) => {
//     setFlippedCard(flippedCard === eventId ? null : eventId);
//   };

//   return (
//     <div className="min-h-full p-4">
//       <div
//         className="HeroSection flex flex-col bg-cover bg-center bg-no-repeat m-4"
//         style={{
//           backgroundImage: `url('https://res.cloudinary.com/startup-grind/image/fetch/c_scale,w_2560/c_crop,h_650,w_2560,y_0.0_mul_h_sub_0.0_mul_650/c_crop,h_650,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/https://res.cloudinary.com/startup-grind/image/upload/c_fill%2Cdpr_2.0%2Cf_auto%2Cg_center%2Cq_auto:good/v1/gcs/platform-data-goog/chapter_banners/IOE22-Bevy-ChapterBanner-2560x650_x6zWRuV.png')`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//           height: "100px",
//         }}
//       >
//         <h2 className="text-2xl font-bold mb-4 my-auto">Welcome</h2>
//       </div>

//       <div>
//         {events.length ? (
//           <>
//             <h3 className="text-xl font-semibold mb-4">Past Events</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               {events.map((event) => (
//                 <div
//                   key={event.eventId}
//                   className="relative w-full h-64 perspective"
//                 >
//                   <div
//                     onClick={() => handleCardClick(event.eventId)}
//                     className={`relative w-full h-full transition-transform duration-500 transform ${
//                       flippedCard === event.eventId ? 'rotate-y-180' : ''
//                     }`}
//                   >
//                     <div className="absolute w-full h-full flex items-center justify-center backface-hidden">
//                       {flippedCard === event.eventId ? (
//                         <div className=" text-black flex items-center justify-center w-full h-full text-2xl font-bold">
//                           {/* <p>Hello</p> */}
//                         </div>
//                       ) : (
//                         <div className="bg-white rounded shadow-lg border border-slate-400 p-4 w-full h-full flex flex-col justify-between">
//                           <h4 className="text-lg font-semibold mb-3">{event.name}</h4>
//                           <p>
//                             <strong>What's Happening: </strong>
//                             {event.description}
//                           </p>
//                           <p className="py-2">
//                             <strong>When: </strong>{" "}
//                             {event.startDate} {' - '}{event.endDate}
//                           </p>
//                           <p>
//                             <strong>Where: </strong>
//                             {event.venue}
//                           </p>
//                         </div>
//                       )}
//                     </div>
//                     {flippedCard === event.eventId && (
//                       <div className="absolute w-full h-full rotate-y-180 ">
//                         <div className="text-black flex items-center justify-center w-full h-full text-2xl font-bold">
//                           <p>Hello</p>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         ) : (
//           <div className="flex items-center justify-center">
//             <p>{message}</p>
//             <img
//               src="https://hadibuttt.github.io/GDSC-Portfolio-Site/img/main.png"
//               alt="image"
//               className="w-[75vw] md:w-[40vw]"
//             />
//           </div>
//         )}
//       </div>

//       <style>
//         {`
//           .perspective {
//             perspective: 1000px;
//           }
//           .backface-hidden {
//             backface-visibility: hidden;
//           }
//           .rotate-y-180 {
//             // transform: rotateY(180deg);
//           }
//         `}
//       </style>
//     </div>
//   );
// }

// export default UserPortalPast;
