import React, { useEffect, useState } from "react";
import "./Leaderboard.css";
import { getLeaderboard } from "../../services/resultService";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const data = await getLeaderboard();
      setUsers(data.leaderboard);
    } catch (error) {
      console.log(error);
      alert("Failed to load leaderboard");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2 className="text-center mt-5">Loading...</h2>;
  }

  return (
    <section className="leaderboard">
      <div className="container">

        <h2 className="section-title">
          🏆 Top Performers
        </h2>

        <p className="section-subtitle">
          Compete with learners around the world.
        </p>

        <div className="leaderboard-card">

          {users.length === 0 ? (
            <h4 className="text-center">No Results Found</h4>
          ) : (
            users.map((user, index) => (
              <div className="leaderboard-item" key={user._id}>

                <div className="left">

                  <span className="rank">
                    {index === 0
                      ? "🥇"
                      : index === 1
                      ? "🥈"
                      : index === 2
                      ? "🥉"
                      : index + 1}
                  </span>

                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.user?.name || "User"
                    )}&background=random`}
                    alt={user.user?.name}
                  />

                  <div>
                    <h5>{user.user?.name}</h5>
                    <small>{user.category?.name}</small>
                  </div>

                </div>

                <div className="text-end">
                  <strong>{user.score} pts</strong>
                  <br />
                  <small>{user.percentage}%</small>
                </div>

              </div>
            ))
          )}

        </div>

      </div>
    </section>
  );
};

export default Leaderboard;