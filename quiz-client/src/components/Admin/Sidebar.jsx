// import { Link } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <div
//       className="bg-dark text-white p-3"
//       style={{
//         width: "250px",
//         height: "100vh",       // Forces it to take up the exact height of the screen
//         position: "sticky",    // Locks it in place when scrolling
//         top: 0,                // Tells it to lock exactly at the top of the window
//         overflowY: "auto",     // (Optional) Allows the sidebar itself to scroll if you add too many links
//       }}
//     >
//       {/* Logo acts as the Dashboard link now */}
//       <Link to="/Dashboard" className="text-white text-decoration-none">
//         <h3 className="mb-4">QuizMaster</h3>
//       </Link>

//       <ul className="nav flex-column">
//         <li className="nav-item mb-2">
//           <Link className="nav-link text-white" to="/admin/categories">
//             Categories
//           </Link>
//         </li>

//         <li className="nav-item mb-2">
//           <Link className="nav-link text-white" to="/admin/questions">
//             Questions
//           </Link>
//         </li>

//         <li className="nav-item mb-2">
//           <Link className="nav-link text-white" to="/admin/users">
//             Users
//           </Link>
//         </li>

//         <li className="nav-item mb-2">
//           <Link className="nav-link text-white" to="/admin/results">
//             Results
//           </Link>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;





import { Link } from "react-router-dom";

// Accept closeSidebar as a prop
const Sidebar = ({ closeSidebar }) => {
  return (
    <div
      className="bg-dark text-white p-3"
      style={{
        width: "250px",
        height: "100vh",       // Forces it to take up the exact height of the screen
        position: "sticky",    // Locks it in place when scrolling
        top: 0,                // Tells it to lock exactly at the top of the window
        overflowY: "auto",     // (Optional) Allows the sidebar itself to scroll if you add too many links
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        {/* Logo acts as the Dashboard link now */}
        <Link to="/Dashboard" className="text-white text-decoration-none" onClick={closeSidebar}>
          <h3 className="mb-0">QuizMaster</h3>
        </Link>

        {/* Mobile Close Button (X) - Only visible on mobile */}
        <button 
          className="btn btn-dark d-md-none fs-4 p-0 text-white" 
          style={{ border: "none" }}
          onClick={closeSidebar}
        >
          &times;
        </button>
      </div>

      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/admin/categories" onClick={closeSidebar}>
            Categories
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/admin/questions" onClick={closeSidebar}>
            Questions
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/admin/users" onClick={closeSidebar}>
            Users
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/admin/results" onClick={closeSidebar}>
            Results
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;