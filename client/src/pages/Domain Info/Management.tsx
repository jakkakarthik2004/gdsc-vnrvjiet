import React from 'react';
import SahithiImage from '../Domain Info/images/MANAGEMENT/Sahithi.jpg';
import VarunImage from '../Domain Info/images/MANAGEMENT/GVK.jpeg';
import RakshithaImage from '../Domain Info/images/MANAGEMENT/SaiRakshita.jpg';
import SadhikImage from '../Domain Info/images/MANAGEMENT/Sadhik.jpg';
import SriKruthiImage from '../Domain Info/images/MANAGEMENT/SriKruthi.jpg';
import { FiInstagram } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

function WebDev() {
  const members = [
    {
      name: 'Sahithi',
      role: 'Management Coordinator',
      image: SahithiImage,
      linkedin: '#',
      github: '#',
      instagram: '#',
    },
    {
        name: 'Varun Kalyan',
        role: 'Management Coordinator',
        image: VarunImage,
        linkedin: '#',
        github: '#',
        instagram: '#',
      },
      {
        name: 'Sai Rakshitha',
        role: 'Management Coordinator',
        image: RakshithaImage,
        linkedin: '#',
        github: '#',
        instagram: '#',
      },
      {
        name: 'Sadhik',
        role: 'Management Volunteer',
        image: SadhikImage,
        linkedin: '#',
        github: '#',
        instagram: '#',
      },
      {
        name: 'Sri Kruthi',
        role: 'Management Volunteer',
        image: SriKruthiImage,
        linkedin: '#',
        github: '#',
        instagram: '#',
      },
  ];

  return (
    <div className="bg-gray-50 p-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto">
        <div className="p-6">
          <h3 className="text-4xl text-center font-extrabold mb-4 text-red-600">
            Management
          </h3>
          <p className="text-gray-700 text-lg leading-relaxed">
          The Management Domain at GDSC VNR VJIET plays a pivotal role in executing and conducting successful events for the club, overseeing every aspect from start to finish. This domain is dedicated to implementing the ideas proposed by other domains, turning concepts into reality through planning and coordination. In addition to event management, the team is responsible for documenting all events held by the club, ensuring a thorough record of activities. They also take care of the internal operations of the club, managing permissions, utilities and resources to maintain smooth and efficient functioning. Their commitment to excellence, organization, and attention to detail ensures that the club functions at the highest standards, reinforcing the club's reputation for professionalism.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {members.map((member, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="relative w-40 h-40 flex-shrink-0">
                  <div className="rounded-full overflow-hidden shadow-lg w-full h-full flex items-center justify-center bg-gray-100">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="object-contain"
                    />
                  </div>
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mt-4 text-center">
                  {member.name}
                </h4>
                <p className="text-gray-500 mb-4 text-center">{member.role}</p>
                <div className="flex justify-center space-x-4 mt-4">
                  <a href={member.linkedin} className="text-blue-500 hover:text-blue-600">
                  <FaLinkedinIn size={20}/>
                  </a>
                  <a href={member.github} className="text-gray-900 hover:text-gray-800">
                  <FaGithub size={20}/>
                  </a>
                  <a href={member.instagram} className="text-pink-500 hover:text-pink-600">
                  <FiInstagram size={20}/>
                  </a>
                  
                   
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WebDev;
