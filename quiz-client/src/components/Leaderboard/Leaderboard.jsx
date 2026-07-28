// import React, { useEffect, useState } from "react";
// import "./Leaderboard.css";
// import { getLeaderboard } from "../../services/resultService";

// const Leaderboard = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchLeaderboard();
//   }, []);

//   const fetchLeaderboard = async () => {
//     try {
//       const data = await getLeaderboard();
//       setUsers(data.leaderboard);
//     } catch (error) {
//       console.log(error);
//       alert("Failed to load leaderboard");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <h2 className="text-center mt-5">Loading...</h2>;
//   }

//   return (
//     <section className="leaderboard">
//       <div className="container">

//         <h2 className="section-title">
//           🏆 Top Performers
//         </h2>

//         <p className="section-subtitle">
//           Compete with learners around the world.
//         </p>

//         <div className="leaderboard-card">

//           {users.length === 0 ? (
//             <h4 className="text-center">No Results Found</h4>
//           ) : (
//             users.map((user, index) => (
//               <div className="leaderboard-item" key={user._id}>

//                 <div className="left">

//                   <span className="rank">
//                     {index === 0
//                       ? "🥇"
//                       : index === 1
//                       ? "🥈"
//                       : index === 2
//                       ? "🥉"
//                       : index + 1}
//                   </span>

//                   <img
//                     src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
//                       user.user?.name || "User"
//                     )}&background=random`}
//                     alt={user.user?.name}
//                   />

//                   <div>
//                     <h5>{user.user?.name}</h5>
//                     <small>{user.category?.name}</small>
//                   </div>

//                 </div>

//                 <div className="text-end">
//                   <strong>{user.score} pts</strong>
//                   <br />
//                   <small>{user.percentage}%</small>
//                 </div>

//               </div>
//             ))
//           )}

//         </div>

//       </div>
//     </section>
//   );
// };

// export default Leaderboard;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext'; 
import './Leaderboard.css'; // Make sure to create and link this CSS file

const Leaderboard = () => {
  const { user } = useAuth();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  // 1. Fetch Categories for the filter tabs
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Adjust this endpoint if your category route is different
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/categories`);
        
        // Sometimes APIs return the array directly, sometimes inside a 'data' or 'categories' object.
        // Adjust res.data based on your actual API response structure.
        setCategories(res.data.categories || res.data); 
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);

  // 2. Fetch Leaderboard Data whenever activeCategory changes
  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        // Make sure this URL matches your actual leaderboard route 
        // (e.g., /api/results/leaderboard or /api/leaderboard)
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/results/leaderboard?categoryId=${activeCategory}`
        );
        
        setLeaderboardData(res.data.leaderboard || res.data);
      } catch (error) {
        console.error("Failed to fetch leaderboard", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, [activeCategory]);

  return (
    <div className="container mt-5 mb-5 pb-5">
      <div className="text-center mb-4">
        <h1 className="fw-bold display-5 text-dark-blue">
          🏆 Top Performers
        </h1>
        <p className="text-muted fs-5">Compete with learners around the world.</p>
      </div>

      {/* --- CATEGORY FILTER TABS --- */}
      <div className="d-flex justify-content-center flex-wrap gap-2 mb-5">
        <button
          className={`btn-category-pill ${activeCategory === 'all' ? 'active' : ''}`}
          onClick={() => setActiveCategory('all')}
        >
          Global (All)
        </button>
        
        {categories.map((cat) => (
          <button
            key={cat._id}
            className={`btn-category-pill ${activeCategory === cat._id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat._id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* --- LEADERBOARD CARD --- */}
      <div className="leaderboard-card p-4 mx-auto" style={{ maxWidth: '800px' }}>
        {loading ? (
          <div className="text-center p-5 text-primary fw-bold">Loading ranking...</div>
        ) : leaderboardData.length === 0 ? (
          <div className="text-center p-5 text-muted">No scores recorded for this category yet.</div>
        ) : (
          leaderboardData.map((entry, index) => (
            <div 
              key={index} 
              className={`leaderboard-row d-flex align-items-center justify-content-between p-3 mb-2 rounded-3 ${user?._id === entry.user?._id ? 'highlight-current-user' : ''}`}
            >
              <div className="d-flex align-items-center gap-4">
                {/* Rank Number/Medal */}
                <div className="rank-badge fw-bold fs-5 text-muted">
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                </div>
                
                {/* Avatar Initials */}
                <div className="avatar-circle fw-bold">
                  {entry.user?.name ? entry.user.name.substring(0, 2).toUpperCase() : 'U'}
                </div>
                
                {/* Name */}
                <span className="fw-bold fs-5 text-dark-blue">{entry.user?.name || 'Unknown User'}</span>
              </div>

              {/* Score Data */}
              <div className="text-end">
                <div className="fw-bold fs-5 text-dark-blue">{entry.score} pts</div>
                <small className="text-muted fw-semibold">{entry.percentage}%</small>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Leaderboard;