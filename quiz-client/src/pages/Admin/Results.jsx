// import { useEffect, useState } from "react";
// import {
//   getAllResults,
//   deleteResult,
// } from "../../services/resultService";

// const Results = () => {
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchResults = async () => {
//     try {
//       const data = await getAllResults();
//       setResults(data.results);
//     } catch (error) {
//       console.log(error);
//       alert("Failed to load results");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchResults();
//   }, []);

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this result?"
//     );

//     if (!confirmDelete) return;

//     try {
//       await deleteResult(id);
//       alert("Result Deleted Successfully");
//       fetchResults();
//     } catch (error) {
//       console.log(error);
//       alert(error.response?.data?.message || "Delete Failed");
//     }
//   };

//   return (
//     <div className="container-fluid">
//       <h2 className="mb-4">Manage Results</h2>

//       {loading ? (
//         <h4>Loading...</h4>
//       ) : (
//         <table className="table table-bordered table-hover">
//           <thead className="table-dark">
//             <tr>
//               <th>#</th>
//               <th>User</th>
//               <th>Email</th>
//               <th>Category</th>
//               <th>Score</th>
//               <th>Correct</th>
//               <th>Wrong</th>
//               <th>Percentage</th>
//               <th>Date</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {results.length === 0 ? (
//               <tr>
//                 <td colSpan="10" className="text-center">
//                   No Results Found
//                 </td>
//               </tr>
//             ) : (
//               results.map((result, index) => (
//                 <tr key={result._id}>
//                   <td>{index + 1}</td>

//                   <td>{result.user?.name || "User Deleted"}</td>

//                   <td>{result.user?.email || "-"}</td>

//                   <td>{result.category?.name}</td>

//                   <td>{result.score}</td>

//                   <td>{result.correctAnswers}</td>

//                   <td>{result.wrongAnswers}</td>

//                   <td>{result.percentage}%</td>

//                   <td>
//                     {new Date(result.createdAt).toLocaleDateString()}
//                   </td>

//                   <td>
//                     <button
//                       className="btn btn-danger btn-sm"
//                       onClick={() => handleDelete(result._id)}
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

// export default Results;














import { useEffect, useState } from "react";
import {
  getAllResults,
  deleteResult,
} from "../../services/resultService";
import { toast } from "react-hot-toast"; // 👇 1. IMPORT TOAST

const Results = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchResults = async () => {
    try {
      const data = await getAllResults();
      setResults(data.results);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load results"); // 👇 Replaced alert
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const handleDelete = async (id) => {
    // 👇 Trigger loading toast (browser confirm removed)
    const toastId = toast.loading("Deleting result...");

    try {
      await deleteResult(id);
      
      // 👇 Show success toast
      toast.success("Result Deleted Successfully", { id: toastId }); 
      fetchResults();
    } catch (error) {
      console.log(error);
      
      // 👇 Show error toast
      toast.error(error.response?.data?.message || "Delete Failed", { id: toastId }); 
    }
  };

  return (
    <div className="container-fluid">
      <h2 className="mb-4">Manage Results</h2>

      {loading ? (
        // 👇 Added a spinner here to match your other admin pages
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status"></div>
          <h5 className="mt-2">Loading Results...</h5>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Email</th>
                <th>Category</th>
                <th>Score</th>
                <th>Correct</th>
                <th>Wrong</th>
                <th>Percentage</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {results.length === 0 ? (
                <tr>
                  <td colSpan="10" className="text-center py-4 text-muted">
                    No Results Found
                  </td>
                </tr>
              ) : (
                results.map((result, index) => (
                  <tr key={result._id}>
                    <td className="fw-bold">{index + 1}</td>

                    <td>{result.user?.name || "User Deleted"}</td>

                    <td>{result.user?.email || "-"}</td>

                    <td>
                      <span className="badge bg-secondary">{result.category?.name}</span>
                    </td>

                    <td className="fw-bold">{result.score}</td>

                    <td className="text-success fw-medium">{result.correctAnswers}</td>

                    <td className="text-danger fw-medium">{result.wrongAnswers}</td>

                    <td>
                      <span className={`badge ${result.percentage >= 50 ? 'bg-success' : 'bg-danger'}`}>
                        {result.percentage}%
                      </span>
                    </td>

                    <td>
                      {new Date(result.createdAt).toLocaleDateString()}
                    </td>

                    <td>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(result._id)}
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

export default Results;