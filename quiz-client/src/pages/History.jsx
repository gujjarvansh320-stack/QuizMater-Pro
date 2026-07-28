import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Adjust path if needed
import { FaHistory, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';
import './History.css';

const History = () => {
  const { user } = useAuth(); 
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // --- THIS IS THE FIX ---
        // Safely get the token, checking localStorage as a fallback
        const token = user?.token || localStorage.getItem("token");

        const config = {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        };
        // -----------------------

        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/results/my-results`, 
          config
        );
        
        setHistoryData(res.data.results);
      } catch (error) {
        console.error("Failed to fetch history", error);
      } finally {
        setLoading(false);
      }
    };

    // Make sure we only fetch if we have a user or a token in localStorage
    if (user || localStorage.getItem("token")) {
      fetchHistory();
    } else {
      setLoading(false);
    }
  }, [user]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mt-5 mb-5 pb-5 min-vh-100">
      <div className="text-center mb-5">
        <h1 className="fw-bold display-5 text-dark-blue">
          <FaHistory className="me-3 text-primary mb-1" />
          My Quiz History
        </h1>
        <p className="text-muted fs-5">Review your past performances and track your progress.</p>
      </div>

      <div className="history-wrapper mx-auto" style={{ maxWidth: '850px' }}>
        {loading ? (
          <div className="text-center p-5 text-primary fw-bold fs-5">Loading your history...</div>
        ) : historyData.length === 0 ? (
          <div className="text-center p-5 bg-white rounded-4 shadow-sm">
            <h4 className="text-muted">You haven't taken any quizzes yet!</h4>
            <p className="text-muted mb-0">Head over to the Categories page to start your first challenge.</p>
          </div>
        ) : (
          historyData.map((attempt, index) => (
            <div key={attempt._id || index} className="history-card p-4 mb-3">
              <div className="row align-items-center">
                
                {/* Left Side: Quiz Info */}
                <div className="col-md-7 mb-3 mb-md-0 d-flex align-items-center">
                  <div className="icon-box bg-primary-light text-primary me-4">
                    <FaCheckCircle size={24} />
                  </div>
                  <div>
                    <h4 className="fw-bold text-dark-blue mb-1">
                      {attempt.category?.name || "General Knowledge"}
                    </h4>
                    <div className="text-muted small d-flex align-items-center">
                      <FaCalendarAlt className="me-2" />
                      {formatDate(attempt.createdAt)}
                    </div>
                  </div>
                </div>

                {/* Right Side: Scores */}
                <div className="col-md-5 d-flex justify-content-md-end gap-3 text-center">
                  <div className="score-badge bg-light">
                    <span className="d-block text-muted small fw-semibold">Score</span>
                    <span className="fw-bold fs-5 text-dark-blue">{attempt.score} pts</span>
                  </div>
                  <div className="score-badge bg-primary-light text-primary">
                    <span className="d-block small fw-semibold">Accuracy</span>
                    <span className="fw-bold fs-5">{attempt.percentage}%</span>
                  </div>
                </div>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default History;