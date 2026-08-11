// import { useEffect, useState } from "react";
// import { getUsers, deleteUser, updateUser } from "../../services/userService";

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingId, setEditingId] = useState(null);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     role: "user",
//   });

//   //Fetch user
//   const fetchUsers = async () => {
//     try {
//       const data = await getUsers();
//       setUsers(data.users);
//     } catch (error) {
//       console.log(error);
//       alert("Failed to load users");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   //Delete User
//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this user?",
//     );

//     if (!confirmDelete) return;

//     try {
//       await deleteUser(id);

//       alert("User Deleted Successfully");

//       fetchUsers();
//     } catch (error) {
//       console.log(error);
//       alert(error.response?.data?.message || "Delete Failed");
//     }
//   };

//   //Edit User
//   const handleEdit = (user) => {
//     setEditingId(user._id);

//     setFormData({
//       name: user.name,
//       email: user.email,
//       role: user.role,
//     });

//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <div className="container-fluid">
//       <h2 className="mb-4">Manage Users</h2>

//       <form
//         onSubmit={async (e) => {
//           e.preventDefault();

//           if (!editingId) {
//             alert("Please select a user to edit.");
//             return;
//           }

//           try {
//             await updateUser(editingId, formData);

//             alert("User Updated Successfully");

//             setEditingId(null);

//             setFormData({
//               name: "",
//               email: "",
//               role: "user",
//             });

//             fetchUsers();
//           } catch (error) {
//             console.log(error);
//             alert(error.response?.data?.message || "Update Failed");
//           }
//         }}
//         className="card p-3 mb-4 shadow-sm"
//       >
//         <div className="row">
//           <div className="col-md-4">
//             <input
//               type="text"
//               className="form-control"
//               name="name"
//               placeholder="Name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="col-md-4">
//             <input
//               type="email"
//               className="form-control"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="col-md-2">
//             <select
//               className="form-select"
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//             >
//               <option value="user">User</option>
//               <option value="admin">Admin</option>
//             </select>
//           </div>

//           <div className="col-md-2">
//             <button className="btn btn-primary w-100">
//               {editingId ? "Update User" : "Select User"}
//             </button>
//           </div>
//         </div>
//       </form>

//       {loading ? (
//         <h4>Loading...</h4>
//       ) : (
//         <table className="table table-bordered table-hover">
//           <thead className="table-dark">
//             <tr>
//               <th>#</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Role</th>
//               <th>Joined</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {users.length === 0 ? (
//               <tr>
//                 <td colSpan="6" className="text-center">
//                   No Users Found
//                 </td>
//               </tr>
//             ) : (
//               users.map((user, index) => (
//                 <tr key={user._id}>
//                   <td>{index + 1}</td>

//                   <td>{user.name}</td>

//                   <td>{user.email}</td>

//                   <td>{user.role}</td>

//                   <td>{new Date(user.createdAt).toLocaleDateString()}</td>

//                   <td>
//                     <button
//                       className="btn btn-warning btn-sm me-2"
//                       onClick={() => handleEdit(user)}
//                     >
//                       Edit
//                     </button>

//                     <button
//                       className="btn btn-danger btn-sm"
//                       onClick={() => handleDelete(user._id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default Users;










import { useEffect, useState } from "react";
import { getUsers, deleteUser, updateUser } from "../../services/userService";
import { toast } from "react-hot-toast"; // 👇 Imported toast

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
  });

  // Fetch users
  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data.users);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load users"); // Replaced alert
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Update User (Extracted from inline for cleaner code)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editingId) {
      toast.error("Please select a user to edit."); // Replaced alert
      return;
    }

    // 👇 Trigger loading toast
    const toastId = toast.loading("Updating user...");

    try {
      await updateUser(editingId, formData);

      toast.success("User Updated Successfully", { id: toastId }); // Replaced alert

      setEditingId(null);

      setFormData({
        name: "",
        email: "",
        role: "user",
      });

      fetchUsers();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Update Failed", { id: toastId }); // Replaced alert
    }
  };

  // Delete User (Browser alert removed)
  const handleDelete = async (id) => {
    // 👇 Trigger loading toast for deletion
    const toastId = toast.loading("Deleting user...");

    try {
      await deleteUser(id);

      toast.success("User Deleted Successfully", { id: toastId }); // Replaced alert

      fetchUsers();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Delete Failed", { id: toastId }); // Replaced alert
    }
  };

  // Edit User
  const handleEdit = (user) => {
    setEditingId(user._id);

    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="container-fluid">
      <h2 className="mb-4">Manage Users</h2>

      <form onSubmit={handleSubmit} className="card p-3 mb-4 shadow-sm">
        <div className="row">
          <div className="col-md-4 mb-2">
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4 mb-2">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-2 mb-2">
            <select
              className="form-select"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="col-md-2 mb-2">
            <button className="btn btn-primary w-100">
              {editingId ? "Update User" : "Select User"}
            </button>
          </div>
        </div>
      </form>

      {loading ? (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status"></div>
          <h5 className="mt-2">Loading Users...</h5>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No Users Found
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>

                    <td>{user.name}</td>

                    <td>{user.email}</td>

                    <td>
                      <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                        {user.role}
                      </span>
                    </td>

                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>

                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(user)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Users;