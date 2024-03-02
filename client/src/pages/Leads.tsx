import React, { useState, useEffect, useRef } from "react";
import {motion,useInView, useAnimation, MotionValue} from "framer-motion"
import leadimg from './images/lead.png'
import colead from './images/colead.png'
import managelead from './images/managementlead.png'
import corolead from './images/corolead.png'
import applead from './images/appdevlead.png'
import weblead from './images/webdevlead.png'
import creativelead from './images/creativelead.png'
  
function Leads() {

    const Reveal = ({children}:any)=>{
        const ref = useRef(null);
        const isInView = useInView(ref, {once:false});
    
        const mainControls=useAnimation();
        const slideControls=useAnimation();
    
        useEffect(()=>{
          if(isInView){
            mainControls.start("visible")
            slideControls.start("visible")
          }
        }, [isInView])
        
        return(
          <div>
            {children.split(" ").map((el: string,i:any)=>(
                <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.20,
                  delay: i / 10,
                }}
                key={i}
              >
                {el}{" "}
              </motion.span>
            ))}
            </div>
        )
      }

    const testimonials=[
        {
            image:leadimg,
            title: "Dushyanth (Lead)",
            description:
              `" As the lead of the Google Developer Chapter, I want to emphasize the outstanding contributions of our community. Our chapter consistently exemplifies a commitment to innovation, knowledge sharing, and fostering a vibrant ecosystem of developers. The dedication, passion, and expertise of our members have not only enriched the skills of individuals but have also contributed significantly to the advancement of the tech industry. It's an honor to be part of a community that continues to drive progress, inspire creativity, and shape the future of technology.."`,
          },
          {
            image:colead,
            title: "Rishab (Co-Lead)",
            description:
              `"As the GDSC founder, I'm delighted to share my heartfelt testimonial for this remarkable community.
              GDSC is more than a club; it's a family of passionate tech enthusiasts. Together with my dedicated team, we've organized workshops, hackathons, and outreach programs fostering a culture of learning and giving back. Partnered with Google, we've had invaluable support, propelling our growth. 
              During my time as GDSC Lead, I've seen members develop into self- assured tech leaders. 
              GDSC is a place where dreams turn into reality, ideas become
              innovations, and lifelong connections are formed"`,
          },
          {
            image:managelead,
            title: "Shivesh ( Management Lead )",
            description:
              `"It has been an incredible journey leading GDSC, and I am honored to have had the privilege of serving as the management lead for this remarkable community of tech enthusiasts. GDSC is not just a club; it's a vibrant ecosystem of growth, innovation, and collaboration, and I am deeply grateful to have been a partof it."`,
          },
          {
            image:corolead,
            title: "Akhil ( Corporate Outreach Lead )",
            description:
              `"I am thrilled to serve as the Corporate Outreach Coordinator for GDSC-VNRVJIET. Managing events and nurturing technical careers within the organization has been an incredible journey. What truly makes this experience remarkable is the opportunity to interact with the bright, motivated juniors that we recruit into our team. Being a part of GDSC-VNRVJIET has allowed me to witness the potential of these young minds first-hand. It's truly heartening to see their enthusaism and dedication towards technology and their passion for making a difference in the world through their skills. The energy and innovative spirit they bring to the table is nothing short of inspiring.
              I am grateful for the opportunity to contribute to the growth of the setalented individuals, and I look forward to continuing this incredible journey with GDSC-VNRVJIET. Together, we are shaping the future of technology and nurturing the leaders of tomorrow. It's not just a role; it's a privilege to be a part of this vibrant community"`,
          },
          {
            image:applead,
            title: "Prithvi ( App Development Lead )",
            description:
              `"GDSC is a great entity to be in where learning developmentismeant to be fun. GDSC is a place where creativity about software development converges. This has helped me learn a lot while collaboratively organizing events such as hackathons and workshops. Although this is the first year for GDSC-VNRVJIET, wehad always had unique approaches and colaborations to come up with. I am grateful for the opportunity to bepart of GDSC"`,
          },
          {
            image:weblead,
            title: "Manideep ( Web Development Lead )",
            description:
              `"As the Web Development Lead for GDSC VNRVJIET, I've had the incredible opportunity to lead and contribute to our club's mission of fostering a passion for web development among students. I'm passionate about this role and want to share my experiences and commitment. I genuinely enjoy helping our junior members learn web development. It's about inspiring others to explore the possibilities of webdevelopment. My aim is to make complex concepts accessible and engaging, so every member feels empowered I'm committed to building strong relationships wtih our upcoming coordinators as transitioning leadership is vital for our club's success. I'm excited to mentor and support the next generation of leaders, sharing insights and experiences for a smooth handover. For GDSC VNRVJIET, I envision a future filled with growth, innovation, and close-knit member relationships. I aim to push our club's boundaries, empowering more students to become web developers and creators."`,
          },
          {
            image:creativelead,
            title: "Vinay ( Creative Lead )",
            description:
              `"I am honored to share my testimony as a proud member of the Google Developer Student Club (GDSC) at VNRVJIET Institute. I am Vinay Vardhan, and being a part of this club has been an incredibly enriching experience that has positively impacted my technical skills, interactions with faculty, juniors, and classmates, and has allowed me to grow both creatively and professionally. GDSC has not only taught me the importance of staying updated with the latest technologies but has also provided a supportive environment for learning and experimentation. As the Head of the Creative and Social Media Department within GDSC,I have had the privilege of improving my creative skills and expanding my expertise in designing and video editing. This role has challenged me to think outside the box, come up with innovative ideas, and translate them into visually appealing content. It has been immensely gratifying to see the impact of our creative endeavors in promoting GDSC's activities and engaging with a wider audience through social media platforms. This experience has undoubtedly contributed to my personal and professional growth."`,
          },

    ]

  return (
    <div>
        <h1 className='text-4xl text-slate-800 font-bold text-center pt-10'>Lead's Testimonials :</h1>
        <div className="">
          {testimonials.map((testimonials, index) => (
            <div key={index}
            className={`flex flex-col w-90 bg-white border m-2 mt-10 p-4 border-slate-100 ${
              index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
            }`}
            >
            <div className={`shrink-0 h-[222px] overflow-hidden`}>
              <img src={testimonials.image} alt="image" className=" shrink-0 rounded-full w-full h-full object-cover" />
            </div>

            <div className="shrink p-6">
            
              <p className=" shrink mb-4 border-2 border-green-600 rounded-lg m-4 p-4">
              <Reveal>
                    {testimonials.description}
              </Reveal>
             </p>
             <h3 className="text-1xl sm:text-2xl m-4 italic">
             - {testimonials.title}
            </h3>
            </div>
          </div>
          ))}
        </div>
    </div>
  )
}

export default Leads