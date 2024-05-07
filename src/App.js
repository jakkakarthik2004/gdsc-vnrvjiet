import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [team, setTeam] = useState([]);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    axios.get('/api/team')
      .then(res => setTeam(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/team', { name, role, email, phone })
      .then(res => {
        setTeam([...team, res.data]);
        setName('');
        setRole('');
        setEmail('');
        setPhone('');
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h1>Team Details Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        <button type="submit">Add Team Member</button>
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
