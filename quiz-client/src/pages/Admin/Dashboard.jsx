import { useEffect, useState } from "react";
import { getDashboard } from "../../services/dashboardService";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCategories: 0,
    totalQuestions: 0,
    totalResults: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const data = await getDashboard();

      setStats({
        totalUsers: data.totalUsers,
        totalCategories: data.totalCategories,
        totalQuestions: data.totalQuestions,
        totalResults: data.totalResults,
      });
    } catch (error) {
      console.log(error);
      alert("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h3 className="text-center mt-5">Loading Dashboard...</h3>;
  }

  return (
    <div className="container-fluid">
      <h2 className="mb-4">Admin Dashboard</h2>

      <div className="row">
        <div className="col-md-3 mb-4">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h5>Total Users</h5>
              <h2>{stats.totalUsers}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h5>Total Categories</h5>
              <h2>{stats.totalCategories}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h5>Total Questions</h5>
              <h2>{stats.totalQuestions}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h5>Total Results</h5>
              <h2>{stats.totalResults}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;