import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [seats, setSeats] = useState({});
  const [userId, setUserId] = useState("user1");
  const [seatId, setSeatId] = useState("");

  // Load seats on page load
  useEffect(() => {
    fetchSeats();
  }, []);

  const fetchSeats = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/seats");
      setSeats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const lockSeat = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/lock", {
        seatId,
        userId,
      });
      alert(res.data.message);
      fetchSeats();
    } catch (err) {
      alert(err.response?.data?.error || "Error locking seat");
    }
  };

  const confirmSeat = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/confirm", {
        seatId,
        userId,
      });
      alert(res.data.message);
      fetchSeats();
    } catch (err) {
      alert(err.response?.data?.error || "Error confirming seat");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🎟 Ticket Booking System</h1>

      <h2>Available Seats</h2>
      <ul>
        {Object.entries(seats).map(([id, seat]) => (
          <li key={id}>
            Seat {id}: {seat.status} {seat.userId ? `(by ${seat.userId})` : ""}
          </li>
        ))}
      </ul>

      <h2>Actions</h2>
      <input
        type="text"
        placeholder="Enter Seat ID"
        value={seatId}
        onChange={(e) => setSeatId(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Enter User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <br />
      <button onClick={lockSeat}>Lock Seat</button>
      <button onClick={confirmSeat}>Confirm Booking</button>
    </div>
  );
}

export default App;