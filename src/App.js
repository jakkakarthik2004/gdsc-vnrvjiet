import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

const App = () => {
  const [team, setTeam] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [teamLeader, setTeamLeader] = useState('');
  const [teamMember, setTeamMember] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    axios.get('/api/team')
      .then(res => setTeam(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/team', { teamName, teamLeader,teamMember, email, phone })
      .then(res => {
        setTeam([...team, res.data]);
        setTeamName('');
        setTeamLeader('');
        setTeamMember('');
        setEmail('');
        setPhone('');
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h1 className='heading'>Team Details Dashboard</h1>
      <form className='form' onSubmit={handleSubmit}>
        <div>
        <input type="text" placeholder="Name of the team" value={teamName} onChange={(e) => setTeamName(e.target.value)} required />
        </div>
        <div>
        <input type="text" placeholder="Team Leader Name" value={teamLeader} onChange={(e) => setTeamLeader(e.target.value)} required />
        </div>
        <div>
        <input type="text" placeholder="Team Member Name" value={teamMember} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
        <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <div>
        <button type="submit">Add Team Member</button>
        </div>
      </form>
      <ul>
        {team.map(member => (
          <li key={member._id}>{member.name} - {member.role} - {member.email} - {member.phone}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
