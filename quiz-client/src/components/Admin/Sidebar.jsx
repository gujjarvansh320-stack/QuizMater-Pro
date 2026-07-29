// import { Link } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <div
//       className="bg-dark text-white p-3"
//       style={{ width: "250px", minHeight: "100vh" }}
//     >
//       <h3 className="mb-4">QuizMaster</h3>

//       <ul className="nav flex-column">

//         <li className="nav-item mb-2">
//           <Link className="nav-link text-white" to="/admin-dashboard">
//             Dashboard
//           </Link>
//         </li>

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





// import { Link } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <div
//       className="bg-dark text-white p-3"
//       style={{ width: "250px", minHeight: "100vh" }}
//     >
//       {/* 1. Logo acts as the Dashboard link now */}
//       <Link to="/Dashboard" className="text-white text-decoration-none">
//         <h3 className="mb-4">QuizMaster</h3>
//       </Link>

//       <ul className="nav flex-column">
//         {/* The Dashboard <li> has been removed from this list */}

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

const Sidebar = () => {
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
      {/* Logo acts as the Dashboard link now */}
      <Link to="/Dashboard" className="text-white text-decoration-none">
        <h3 className="mb-4">QuizMaster</h3>
      </Link>

      <ul className="nav flex-column">
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