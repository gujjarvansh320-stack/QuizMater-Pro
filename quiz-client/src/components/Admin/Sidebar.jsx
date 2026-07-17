import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      className="bg-dark text-white p-3"
      style={{ width: "250px", minHeight: "100vh" }}
    >
      <h3 className="mb-4">QuizMaster</h3>

      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/admin-dashboard">
            Dashboard
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/admin/categories">
            Categories
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/admin/questions">
            Questions
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/admin/users">
            Users
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/admin/results">
            Results
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;