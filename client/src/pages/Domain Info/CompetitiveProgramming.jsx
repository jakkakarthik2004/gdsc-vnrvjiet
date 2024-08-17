import React from 'react';
import VighneshImage from '../Domain Info/images/CP/VighneshVangari.jpg';
import { FiInstagram } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";


function CompetitiveProgramming() {
  const members = [
    {
      name: 'Vighnesh',
      role: 'Competitive Programming Volunteer',
      image: VighneshImage,
      linkedin: '#',
      github: '#',
      instagram: '#',
    },
  ];

  return (
    <div className="bg-gray-50 p-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto">
        <div className="p-6">
          <h3 className="text-4xl text-center font-extrabold mb-4 text-green-600">
            Competitive Programming
          </h3>
          <p className="text-gray-700 text-lg leading-relaxed">
          The Competitive Programming Domain at GDSC VNR VJIET is committed to creating a community where members can improve their problem-solving skills and perform well in coding competitions. It focuses on enhancing members' problem-solving abilities through regular practice on platforms like Codeforces and LeetCode. The domain fosters collaboration, where experienced members mentor newcomers and everyone works together to improve.
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
                  <FaLinkedinIn size={20} />
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

export default CompetitiveProgramming;

