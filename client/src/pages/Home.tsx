import React, { useState, useEffect, useRef } from "react";
import { createUser } from "../Apis/users";import Hero from "./Hero";

import {motion,useInView, useAnimation, easeIn} from "framer-motion"


const cards = [
  {
    image: "https://global.discourse-cdn.com/business6/uploads/codeorgforum/original/2X/5/5850a08813648555f34c29bea7b6d1de15f01655.gif",
    title: "Web Developement",
    description:
      "Focuses on empowering students to build responsive, user-friendly websites and web applications using modern web technologies and frameworks.",
  },
  {
    image: "https://cdn.dribbble.com/users/330915/screenshots/3587000/10_coding_dribbble.gif",
    title: "Competitive Programming",
    description:
      "Cultivates competitive programming skills, encouraging students to hone their algorithmic problem-solving abilities, participate in coding competitions, and develop efficient solutions to real-world challenges.",
  },
  {
    image: "https://connect.ignatiuz.com/hs-fs/hubfs/AI%20and%20Deep%20Learning.gif?width=1000&name=AI%20and%20Deep%20Learning.gif",
    title: "Machine Learning",
    description:
      "Immerses students in the intricacies of Machine Learning, motivating them to delve into and apply sophisticated algorithms, conduct data analysis, and create predictive models to address intricate problems.",
  },
  {
    image: "https://mir-s3-cdn-cf.behance.net/project_modules/hd/ea5d0476339699.5c6694d453222.gif",
    title: "Management",
    description:
      "Provides students with leadership and organizational skills, fostering a community that not only excels in technical expertise but also effectively manages projects, events, and teams.",
  },
  {
    image: "https://cdn.dribbble.com/users/3943049/screenshots/14032596/media/9e39cf22d33b4d2b77e9f270f2f06f6e.gif",
    title: "Cyber Security",
    description:
      "Engages students in learning and applying best practices to secure digital systems, prevent cyber threats, and promote online safety.",
  },
];

const getTitleColor = (index: number) => {
  const colors = ['#0F71F2', '#318C07', '#F2A20C', '#D92929'];
  return colors[index % colors.length];
};

interface props {
  darkMode: boolean;
}

const createAdminUser = async () => {
  try {
    await createUser({
      name: "admin",
      email: "admin@gmail.com",
      password: "adminpassword",
      isAdmin: 1,
    });
  } catch (error) {
    console.log(error);
  }
};

function Home() {
  const [showPopup, setShowPopup] = useState(true);
  const [showSignup, setShowSignup] = useState(false);
  
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    createAdminUser();
  }, []);

  const Reveal = ({children}:any)=>{
    const ref = useRef(null);
    const isInView = useInView(ref, {once:true});

    const mainControls=useAnimation();
    const slideControls=useAnimation();

    useEffect(()=>{
      if(isInView){
        //fire animation
        mainControls.start("visible")
        slideControls.start("visible")
      }
    }, [isInView])
    
    return(
      <div
      // style={{position:"relative", overflow:"hidden"}}
      >
        <motion.div
          ref={ref}
          variants={{
            hidden :{ opacity : 0,y: 75},
            visible : {opacity:1, y:0},
          }}
          initial="hidden"
          animate={mainControls}
          transition={{duration: 0.8, delay:0.5}}
          >
            {children}
          </motion.div>
        </div>
    )
  }
  

 

  return (
    <div>
      {/* <Reveal children={<Hero/>}/> */}
      <Hero/>
      <div className="p-5  text-slate-800 bg-gray-50">
      <Reveal>
        <div className="text-center m-4">
          <p className="text-4xl text-slate-800 font-bold ">What we do, at GDSC VNRVJIET :</p>
        </div>
      </Reveal>
      
        <div className="">
        <Reveal>
          {cards.map((card, index) => (
            <div key={index}
            className={`flex  w-full bg-gray-100 border m-2 mt-10 p-4 border-slate-200 rounded-sm ${
              index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
            }`}
            >
              <Reveal>
            <div className="flex-shrink-0 h-[222px] overflow-hidden hidden md:block">
              <img src={card.image} alt="image" className="rounded-lg w-full h-full object-cover" />
            </div>
            </Reveal>
            <Reveal>
            <div className="flex-grow p-6">
            <h3 className="text-3xl font-extrabold m-4" style={{color: getTitleColor(index) }}>
                {card.title}
              </h3>
              <p className="mb-4">{card.description}</p>
            </div>
            </Reveal>
          </div>
          
          ))}
         </Reveal>
        </div>
        <Reveal>
        <div className="mt-10 text-white flex flex-col gap-4 items-center p-6">
        <p className="text-xl text-gray-600 font-semibold">Join us, at GDSC.</p>
          <p className="text-gray-500 text-lg text-center">
            Discover amazing events and connect with like-minded people.
          </p>
          {/* <div className="shadow-lg w-fit hover:scale-105 duration-300 bg-slate-200 text-gray-800 border border-[#323434] rounded-md">
            {showSignup ? <Signup /> : <Login />}
          </div> */}
          {/* <p className="cursor-pointer text-[#868686] hover:underline hover:text-[#318C07] text-lg">
          {showSignup ? "Already have an account" : "New user?"}{" "}
            <span
              className="font-bold cursor-pointer"
              onClick={() => setShowSignup(!showSignup)}
            >
              {showSignup ? "Log in here" : "Sign up here"}
            </span>
          </p> */}
        </div>
        </Reveal>
      </div>
    </div>
  );
}

export default Home;
