// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   getQuestions,
//   createQuestion,
//   deleteQuestion,
//   updateQuestion,
// } from "../../services/questionService";
// import { getCategories } from "../../services/categoryService";

// const Questions = () => {
//   const [questions, setQuestions] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingId, setEditingId] = useState(null);

//   // New states for the PDF Upload feature
//   const [inputMode, setInputMode] = useState("manual"); // "manual" or "pdf"
//   const [pdfFile, setPdfFile] = useState(null);
//   const [uploadingPdf, setUploadingPdf] = useState(false);

//   const [formData, setFormData] = useState({
//     question: "",
//     options: ["", "", "", ""],
//     correctAnswer: 0,
//     category: "",
//     difficulty: "easy",
//     marks: 1,
//   });

//   useEffect(() => {
//     fetchQuestions();
//     fetchCategories();
//   }, []);

//   const fetchQuestions = async () => {
//     try {
//       const data = await getQuestions();
//       setQuestions(data.questions);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const data = await getCategories();
//       setCategories(data.categories);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleOptionChange = (index, value) => {
//     const newOptions = [...formData.options];
//     newOptions[index] = value;

//     setFormData({
//       ...formData,
//       options: newOptions,
//     });
//   };

//   // --- MANUAL SUBMIT ---
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const questionData = {
//         ...formData,
//         correctAnswer: Number(formData.correctAnswer),
//         marks: Number(formData.marks),
//       };

//       if (editingId) {
//         await updateQuestion(editingId, questionData);
//         alert("Question Updated Successfully");
//       } else {
//         await createQuestion(questionData);
//         alert("Question Added Successfully");
//       }

//       setFormData({
//         question: "",
//         options: ["", "", "", ""],
//         correctAnswer: 0,
//         category: formData.category, // Keep category selected for convenience
//         difficulty: "easy",
//         marks: 1,
//       });

//       setEditingId(null);
//       fetchQuestions();
//     } catch (error) {
//       console.log(error);
//       alert(error.response?.data?.message || "Operation Failed");
//     }
//   };

//   // --- PDF BULK UPLOAD SUBMIT ---
//   const handlePdfSubmit = async (e) => {
//     e.preventDefault();
//     if (!pdfFile) return alert("Please select a PDF file.");
//     if (!formData.category) return alert("Please select a category.");

//     const uploadData = new FormData();
//     uploadData.append("pdfFile", pdfFile);
//     uploadData.append("category", formData.category);
//     uploadData.append("difficulty", formData.difficulty);
//     uploadData.append("marks", formData.marks);

//     try {
//       setUploadingPdf(true);
//       const token = localStorage.getItem("token");
      
//       const res = await axios.post(
//         `${process.env.REACT_APP_BASE_URL}/api/questions/upload-pdf`,
//         uploadData,
//         {
//           headers: {
//             // Content-Type is intentionally removed here so the browser handles the boundary!
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       alert(res.data.message);
//       setPdfFile(null); // Reset file input
//       fetchQuestions(); // Instantly refresh the table!
      
//     } catch (error) {
//       console.error(error);
//       alert(error.response?.data?.message || "PDF Upload Failed");
//     } finally {
//       setUploadingPdf(false);
//     }
//   };

//   // Delete Questions
//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this question?");
//     if (!confirmDelete) return;

//     try {
//       await deleteQuestion(id);
//       alert("Question Deleted Successfully");
//       fetchQuestions();
//     } catch (error) {
//       console.log(error);
//       alert(error.response?.data?.message || "Delete Failed");
//     }
//   };

//   // Edit
//   const handleEdit = (question) => {
//     setInputMode("manual"); // Force back to manual mode if editing
//     setEditingId(question._id);

//     setFormData({
//       question: question.question,
//       options: [...question.options],
//       correctAnswer: question.correctAnswer,
//       category: question.category._id,
//       difficulty: question.difficulty,
//       marks: question.marks,
//     });

//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <div className="container-fluid">
//       <h2 className="mb-4">Manage Questions</h2>

//       {/* --- INPUT MODE TOGGLE --- */}
//       <div className="mb-4 btn-group" role="group">
//         <button
//           type="button"
//           className={`btn ${inputMode === "manual" ? "btn-primary" : "btn-outline-primary"}`}
//           onClick={() => {
//             setInputMode("manual");
//             setEditingId(null); // Clear editing state if they toggle
//           }}
//         >
//           Add Manually
//         </button>
//         <button
//           type="button"
//           className={`btn ${inputMode === "pdf" ? "btn-primary" : "btn-outline-primary"}`}
//           onClick={() => {
//             setInputMode("pdf");
//             setEditingId(null);
//           }}
//         >
//           Bulk Upload (PDF)
//         </button>
//       </div>

//       {/* --- FORM SECTION --- */}
//       {inputMode === "manual" ? (
        
//         /* 1. MANUAL ENTRY FORM */
//         <form onSubmit={handleSubmit} className="card p-4 shadow-sm mb-4 border-0">
//           <div className="mb-3">
//             <label className="form-label fw-bold">Question Text</label>
//             <input
//               type="text"
//               className="form-control"
//               name="question"
//               value={formData.question}
//               onChange={handleChange}
//               required
//             />
//           </div>
          
//           <div className="row">
//             {formData.options.map((option, index) => (
//               <div className="col-md-6 mb-3" key={index}>
//                 <label className="form-label">
//                   Option {String.fromCharCode(65 + index)}
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={option}
//                   onChange={(e) => handleOptionChange(index, e.target.value)}
//                   required
//                 />
//               </div>
//             ))}
//           </div>
          
//           <div className="row">
//             <div className="col-md-4 mb-3">
//               <label className="fw-bold">Correct Answer</label>
//               <select
//                 className="form-select"
//                 name="correctAnswer"
//                 value={formData.correctAnswer}
//                 onChange={handleChange}
//               >
//                 <option value={0}>Option A</option>
//                 <option value={1}>Option B</option>
//                 <option value={2}>Option C</option>
//                 <option value={3}>Option D</option>
//               </select>
//             </div>

//             <div className="col-md-4 mb-3">
//               <label className="fw-bold">Category</label>
//               <select
//                 className="form-select"
//                 name="category"
//                 value={formData.category}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">Select Category</option>
//                 {categories.map((category) => (
//                   <option key={category._id} value={category._id}>
//                     {category.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="col-md-2 mb-3">
//               <label className="fw-bold">Difficulty</label>
//               <select
//                 className="form-select"
//                 name="difficulty"
//                 value={formData.difficulty}
//                 onChange={handleChange}
//               >
//                 <option value="easy">Easy</option>
//                 <option value="medium">Medium</option>
//                 <option value="hard">Hard</option>
//               </select>
//             </div>

//             <div className="col-md-2 mb-3">
//               <label className="fw-bold">Marks</label>
//               <input
//                 type="number"
//                 className="form-control"
//                 name="marks"
//                 value={formData.marks}
//                 onChange={handleChange}
//                 min="1"
//               />
//             </div>
//           </div>
          
//           <button className="btn btn-primary w-100 fw-bold mt-2">
//             {editingId ? "Update Question" : "Add Question"}
//           </button>
//         </form>

//       ) : (

//         /* 2. PDF UPLOAD FORM */
//         <form onSubmit={handlePdfSubmit} className="card p-4 shadow-sm mb-4 border-0" style={{ backgroundColor: '#f8f9fa' }}>
//           <div className="alert alert-info border-0 shadow-sm">
//             <strong>PDF Format Requirement:</strong><br/>
//             Q: Question text here?<br/>
//             A) First Option<br/>
//             B) Second Option<br/>
//             C) Third Option<br/>
//             D) Fourth Option<br/>
//             Answer: A
//           </div>

//           <div className="row mb-3">
//             <div className="col-md-4">
//               <label className="fw-bold">Target Category</label>
//               <select
//                 className="form-select"
//                 name="category"
//                 value={formData.category}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">-- Select Category --</option>
//                 {categories.map((cat) => (
//                   <option key={cat._id} value={cat._id}>{cat.name}</option>
//                 ))}
//               </select>
//             </div>

//             <div className="col-md-4">
//               <label className="fw-bold">Default Difficulty</label>
//               <select
//                 className="form-select"
//                 name="difficulty"
//                 value={formData.difficulty}
//                 onChange={handleChange}
//               >
//                 <option value="easy">Easy</option>
//                 <option value="medium">Medium</option>
//                 <option value="hard">Hard</option>
//               </select>
//             </div>

//             <div className="col-md-4">
//               <label className="fw-bold">Default Marks per Question</label>
//               <input
//                 type="number"
//                 className="form-control"
//                 name="marks"
//                 value={formData.marks}
//                 onChange={handleChange}
//                 min="1"
//               />
//             </div>
//           </div>

//           <div className="mb-4">
//             <label className="form-label fw-bold">Select PDF Document</label>
//             <input 
//               type="file" 
//               className="form-control form-control-lg" 
//               accept="application/pdf"
//               onChange={(e) => setPdfFile(e.target.files[0])}
//               required
//             />
//           </div>

//           <button type="submit" className="btn btn-success w-100 fw-bold" disabled={uploadingPdf}>
//             {uploadingPdf ? "Parsing & Uploading PDF..." : "Upload PDF and Extract Questions"}
//           </button>
//         </form>
//       )}

//       {/* --- TABLE SECTION --- */}
//       {loading ? (
//         <div className="text-center mt-5">
//           <div className="spinner-border text-primary" role="status"></div>
//           <h4 className="mt-2">Loading Questions...</h4>
//         </div>
//       ) : (
//         <div className="card shadow-sm border-0">
//           <div className="table-responsive">
//             <table className="table table-hover mb-0 align-middle">
//               <thead className="table-dark">
//                 <tr>
//                   <th className="py-3 px-3">#</th>
//                   <th className="py-3">Question</th>
//                   <th className="py-3">Category</th>
//                   <th className="py-3">Answer</th>
//                   <th className="py-3">Difficulty</th>
//                   <th className="py-3">Marks</th>
//                   <th className="py-3 text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {questions.length === 0 ? (
//                   <tr>
//                     <td colSpan="7" className="text-center py-4 text-muted">
//                       No Questions Found
//                     </td>
//                   </tr>
//                 ) : (
//                   questions.map((q, index) => (
//                     <tr key={q._id}>
//                       <td className="px-3 fw-bold">{index + 1}</td>
//                       <td>{q.question}</td>
//                       <td>
//                         <span className="badge bg-secondary">{q.category?.name}</span>
//                       </td>
//                       <td className="fw-medium text-success">
//                         {q.options[q.correctAnswer]}
//                       </td>
//                       <td>
//                         <span className={`badge ${q.difficulty === 'hard' ? 'bg-danger' : q.difficulty === 'medium' ? 'bg-warning text-dark' : 'bg-success'}`}>
//                           {q.difficulty}
//                         </span>
//                       </td>
//                       <td>{q.marks}</td>
//                       <td className="text-center">
//                         <button
//                           className="btn btn-outline-warning btn-sm me-2"
//                           onClick={() => handleEdit(q)}
//                         >
//                           Edit
//                         </button>
//                         <button
//                           className="btn btn-outline-danger btn-sm"
//                           onClick={() => handleDelete(q._id)}
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Questions;















import { useEffect, useState } from "react";
import axios from "axios";
import {
  getQuestions,
  createQuestion,
  deleteQuestion,
  updateQuestion,
} from "../../services/questionService";
import { getCategories } from "../../services/categoryService";
import { toast } from "react-hot-toast"; // 👇 Imported toast

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  // New states for the PDF Upload feature
  const [inputMode, setInputMode] = useState("manual"); // "manual" or "pdf"
  const [pdfFile, setPdfFile] = useState(null);
  const [uploadingPdf, setUploadingPdf] = useState(false);

  const [formData, setFormData] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    category: "",
    difficulty: "easy",
    marks: 1,
  });

  useEffect(() => {
    fetchQuestions();
    fetchCategories();
  }, []);

  const fetchQuestions = async () => {
    try {
      const data = await getQuestions();
      setQuestions(data.questions);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;

    setFormData({
      ...formData,
      options: newOptions,
    });
  };

  // --- MANUAL SUBMIT ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 👇 Trigger loading toast
    const toastId = toast.loading(editingId ? "Updating question..." : "Adding question...");

    try {
      const questionData = {
        ...formData,
        correctAnswer: Number(formData.correctAnswer),
        marks: Number(formData.marks),
      };

      if (editingId) {
        await updateQuestion(editingId, questionData);
        toast.success("Question Updated Successfully", { id: toastId }); // Replaced alert
      } else {
        await createQuestion(questionData);
        toast.success("Question Added Successfully", { id: toastId }); // Replaced alert
      }

      setFormData({
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
        category: formData.category, // Keep category selected for convenience
        difficulty: "easy",
        marks: 1,
      });

      setEditingId(null);
      fetchQuestions();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Operation Failed", { id: toastId }); // Replaced alert
    }
  };

  // --- PDF BULK UPLOAD SUBMIT ---
  const handlePdfSubmit = async (e) => {
    e.preventDefault();
    
    // 👇 Replaced early return alerts with error toasts
    if (!pdfFile) return toast.error("Please select a PDF file.");
    if (!formData.category) return toast.error("Please select a category.");

    const uploadData = new FormData();
    uploadData.append("pdfFile", pdfFile);
    uploadData.append("category", formData.category);
    uploadData.append("difficulty", formData.difficulty);
    uploadData.append("marks", formData.marks);

    // 👇 Trigger loading toast for PDF upload
    const toastId = toast.loading("Uploading and parsing PDF...");

    try {
      setUploadingPdf(true);
      const token = localStorage.getItem("token");
      
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/questions/upload-pdf`,
        uploadData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message, { id: toastId }); // Replaced alert
      setPdfFile(null); // Reset file input
      fetchQuestions(); // Instantly refresh the table!
      
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "PDF Upload Failed", { id: toastId }); // Replaced alert
    } finally {
      setUploadingPdf(false);
    }
  };

  // Delete Questions (Browser alert removed)
  const handleDelete = async (id) => {
    // 👇 Trigger loading toast for deletion
    const toastId = toast.loading("Deleting question...");

    try {
      await deleteQuestion(id);
      toast.success("Question Deleted Successfully", { id: toastId }); // Replaced alert
      fetchQuestions();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Delete Failed", { id: toastId }); // Replaced alert
    }
  };

  // Edit
  const handleEdit = (question) => {
    setInputMode("manual"); // Force back to manual mode if editing
    setEditingId(question._id);

    setFormData({
      question: question.question,
      options: [...question.options],
      correctAnswer: question.correctAnswer,
      category: question.category._id,
      difficulty: question.difficulty,
      marks: question.marks,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container-fluid">
      <h2 className="mb-4">Manage Questions</h2>

      {/* --- INPUT MODE TOGGLE --- */}
      <div className="mb-4 btn-group" role="group">
        <button
          type="button"
          className={`btn ${inputMode === "manual" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => {
            setInputMode("manual");
            setEditingId(null); // Clear editing state if they toggle
          }}
        >
          Add Manually
        </button>
        <button
          type="button"
          className={`btn ${inputMode === "pdf" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => {
            setInputMode("pdf");
            setEditingId(null);
          }}
        >
          Bulk Upload (PDF)
        </button>
      </div>

      {/* --- FORM SECTION --- */}
      {inputMode === "manual" ? (
        
        /* 1. MANUAL ENTRY FORM */
        <form onSubmit={handleSubmit} className="card p-4 shadow-sm mb-4 border-0">
          <div className="mb-3">
            <label className="form-label fw-bold">Question Text</label>
            <input
              type="text"
              className="form-control"
              name="question"
              value={formData.question}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="row">
            {formData.options.map((option, index) => (
              <div className="col-md-6 mb-3" key={index}>
                <label className="form-label">
                  Option {String.fromCharCode(65 + index)}
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  required
                />
              </div>
            ))}
          </div>
          
          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="fw-bold">Correct Answer</label>
              <select
                className="form-select"
                name="correctAnswer"
                value={formData.correctAnswer}
                onChange={handleChange}
              >
                <option value={0}>Option A</option>
                <option value={1}>Option B</option>
                <option value={2}>Option C</option>
                <option value={3}>Option D</option>
              </select>
            </div>

            <div className="col-md-4 mb-3">
              <label className="fw-bold">Category</label>
              <select
                className="form-select"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-2 mb-3">
              <label className="fw-bold">Difficulty</label>
              <select
                className="form-select"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div className="col-md-2 mb-3">
              <label className="fw-bold">Marks</label>
              <input
                type="number"
                className="form-control"
                name="marks"
                value={formData.marks}
                onChange={handleChange}
                min="1"
              />
            </div>
          </div>
          
          <button className="btn btn-primary w-100 fw-bold mt-2">
            {editingId ? "Update Question" : "Add Question"}
          </button>
        </form>

      ) : (

        /* 2. PDF UPLOAD FORM */
        <form onSubmit={handlePdfSubmit} className="card p-4 shadow-sm mb-4 border-0" style={{ backgroundColor: '#f8f9fa' }}>
          <div className="alert alert-info border-0 shadow-sm">
            <strong>PDF Format Requirement:</strong><br/>
            Q: Question text here?<br/>
            A) First Option<br/>
            B) Second Option<br/>
            C) Third Option<br/>
            D) Fourth Option<br/>
            Answer: A
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <label className="fw-bold">Target Category</label>
              <select
                className="form-select"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Category --</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="col-md-4">
              <label className="fw-bold">Default Difficulty</label>
              <select
                className="form-select"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="fw-bold">Default Marks per Question</label>
              <input
                type="number"
                className="form-control"
                name="marks"
                value={formData.marks}
                onChange={handleChange}
                min="1"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold">Select PDF Document</label>
            <input 
              type="file" 
              className="form-control form-control-lg" 
              accept="application/pdf"
              onChange={(e) => setPdfFile(e.target.files[0])}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100 fw-bold" disabled={uploadingPdf}>
            {uploadingPdf ? "Parsing & Uploading PDF..." : "Upload PDF and Extract Questions"}
          </button>
        </form>
      )}

      {/* --- TABLE SECTION --- */}
      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status"></div>
          <h4 className="mt-2">Loading Questions...</h4>
        </div>
      ) : (
        <div className="card shadow-sm border-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle">
              <thead className="table-dark">
                <tr>
                  <th className="py-3 px-3">#</th>
                  <th className="py-3">Question</th>
                  <th className="py-3">Category</th>
                  <th className="py-3">Answer</th>
                  <th className="py-3">Difficulty</th>
                  <th className="py-3">Marks</th>
                  <th className="py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {questions.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-muted">
                      No Questions Found
                    </td>
                  </tr>
                ) : (
                  questions.map((q, index) => (
                    <tr key={q._id}>
                      <td className="px-3 fw-bold">{index + 1}</td>
                      <td>{q.question}</td>
                      <td>
                        <span className="badge bg-secondary">{q.category?.name}</span>
                      </td>
                      <td className="fw-medium text-success">
                        {q.options[q.correctAnswer]}
                      </td>
                      <td>
                        <span className={`badge ${q.difficulty === 'hard' ? 'bg-danger' : q.difficulty === 'medium' ? 'bg-warning text-dark' : 'bg-success'}`}>
                          {q.difficulty}
                        </span>
                      </td>
                      <td>{q.marks}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-outline-warning btn-sm me-2"
                          onClick={() => handleEdit(q)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDelete(q._id)}
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
        </div>
      )}
    </div>
  );
};

export default Questions;