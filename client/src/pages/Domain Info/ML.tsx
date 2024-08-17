import React from 'react';
import SharanImage from '../Domain Info/images/ML/SriSharanTej.jpg';
import KeerthikaImage from '../Domain Info/images/ML/KeerthikaGoli.jpg';
import RoshiniImage from '../Domain Info/images/ML/KotagiriRoshini.jpg';
import BharathImage from '../Domain Info/images/ML/BharathChandra.jpg';
import { FiInstagram } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

function ML() {
  const members = [
    {
      name: 'Sri Sharan Tej',
      role: 'Machine Learning Volunteer',
      image: SharanImage,
      linkedin: '#',
      github: '#',
      instagram: '#',
    },
    {
      name: 'Keerthika',
      role: 'Machine Learning Volunteer',
      image: KeerthikaImage,
      linkedin: '#',
      github: '#',
      instagram: '#',
    },
    {
      name: 'Roshini',
      role: 'Machine Learning Volunteer',
      image: RoshiniImage,
      linkedin: '#',
      github: '#',
      instagram: '#',
    },
    {
      name: 'Bharath Chandra',
      role: 'Machine Learning Volunteer',
      image: BharathImage,
      linkedin: '#',
      github: '#',
      instagram: '#',
    },
  ];

  return (
    <div className="bg-gray-50 p-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto">
        <div className="p-6">
          <h3 className="text-4xl text-center font-extrabold mb-4 text-yellow-500">
            Machine Learning
          </h3>
          <p className="text-gray-700 text-lg leading-relaxed">
          The Machine Learning Domain at GDSC VNRVJIET is where innovation meets application. Our team is focused on exploring the full potential of machine learning, from data analysis to building adaptive systems. We conduct events and workshops to simplify machine learning concepts, making them accessible and showcasing their real-world applications. As mentors, we guide students in hackathons, helping them turn their ideas into successful projects with AI.</p>

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

export default ML;
