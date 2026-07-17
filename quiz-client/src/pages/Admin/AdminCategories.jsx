import { useEffect, useState } from "react";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "../../services/categoryService";
import axios from "axios";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  // Fetch Categories
  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCategories(res.data.categories);
    } catch (error) {
      console.log(error);
      alert("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add / Update Category
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateCategory(editingId, formData);

        alert("Category Updated Successfully");
      } else {
        await createCategory(formData);

        alert("Category Added Successfully");
      }

      setEditingId(null);

      setFormData({
        name: "",
        description: "",
      });

      fetchCategories();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Operation Failed");
    }
  };

  // Edit Category
  const handleEdit = (category) => {
    setEditingId(category._id);

    setFormData({
      name: category.name,
      description: category.description,
    });
  };

  // Delete Category
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) return;

    try {
      await deleteCategory(id);

      alert("Category Deleted Successfully");

      fetchCategories();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Delete Failed");
    }
  };

  // Cancel Edit
  const handleCancel = () => {
    setEditingId(null);

    setFormData({
      name: "",
      description: "",
    });
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Categories</h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="card p-3 mb-4 shadow-sm">
        <div className="row align-items-end">
          <div className="col-md-4 mb-2">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Category Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4 mb-2">
            <input
              type="text"
              name="description"
              className="form-control"
              placeholder="Category Description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-2 mb-2">
            <button type="submit" className="btn btn-primary w-100">
              {editingId ? "Update Category" : "Add Category"}
            </button>
          </div>

          {editingId && (
            <div className="col-md-2 mb-2">
              <button
                type="button"
                className="btn btn-secondary w-100"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </form>

      {/* Table */}
      {loading ? (
        <h4>Loading...</h4>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th width="60">#</th>
              <th>Category Name</th>
              <th>Description</th>
              <th width="180">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">
                  No Categories Found
                </td>
              </tr>
            ) : (
              categories.map((category, index) => (
                <tr key={category._id}>
                  <td>{index + 1}</td>

                  <td>{category.name}</td>

                  <td>{category.description}</td>

                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(category)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(category._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminCategories;