import React, { useState, useEffect } from "react";
import axios from "axios";
import './Dashboard.css';

const Dashboard = () => {
  const [team, setTeam] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [teamLeader, setTeamLeader] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [jury, setjury] = useState("");
  const [timeslot, settimeslot] = useState("");
  const [roomnumber, setroomnumber] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/team")
      .then((res) => setTeam(res.data))
      .catch((err) => console.log(err));
  }, []);

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userObjGDSC") || "null")
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/api/post", {
        teamName,
        teamLeader,
        email,
        phone,
        jury,
        timeslot,
        roomnumber,
      })
      .then((res) => {
        setTeam([...team, res.data]);
        setTeamName("");
        setTeamLeader("");
        setEmail("");
        setPhone("");
        setjury("");
        settimeslot("");
        setroomnumber("");
        console.log(email)
        alert("Team added successfully!");
      })
      .catch((err) => console.log(err));
  };

  if (user && user.role === "admin") {
    return (
      <div className="dashboard-container">
        <h1 className="dashboard-heading">Team Details Dashboard</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Name of the team"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Team Leader Name"
              value={teamLeader}
              onChange={(e) => setTeamLeader(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="tel"
              pattern="[0-9]{10}"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Jury"
              value={jury}
              onChange={(e) => setjury(e.target.value)}
            />
          </div>
          <div>
            <select
              value={timeslot}
              onChange={(e) => settimeslot(e.target.value)}
            >
              <option value="">Select timeslot</option>
              <option value="slot1">10:00 AM - 11:00 AM</option>
              <option value="slot2">11:00 AM - 12:00 PM</option>
              <option value="slot3">12:00 PM - 1:00 PM</option>
              <option value="slot4">2:00 PM - 3:00 PM</option>
              <option value="slot5">3:00 PM - 4:00 PM</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              placeholder="Room Number"
              value={roomnumber}
              onChange={(e) => setroomnumber(e.target.value)}
            />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div className="dashboard-container">
        <h1 className="dashboard-heading">Access Denied</h1>
      </div>
    );
  }
};

export default Dashboard;
