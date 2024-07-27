import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";
import { Navibar } from "../../components/userComponents/Navibar";
import './styles.css';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { token, API } = useAuth();
  const [userData, setUserData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [formData, setFormData] = useState({
    description: '',
    link: '',
    quantityMin: '',
    quantityMax: '',
    quantity: '',
    averageTime: '',
    charge: '',
  });

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchUserData();
      fetchCategories();
    }
  }, [token, navigate]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${API}/api/auth/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setUserData(result.userData || result);
        console.log(result);
      } else {
        toast.error("Failed to fetch user data");
      }
    } catch (error) {
      toast.error("An error occurred while fetching user data");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API}/api/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setCategories(result.categories || []);
      } else {
        toast.error("Failed to fetch categories");
      }
    } catch (error) {
      toast.error("An error occurred while fetching categories");
    }
  };

  const fetchServices = async (categoryId) => {
    try {
      const response = await fetch(`${API}/api/services/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setServices(result.services || []);
      } else {
        toast.error("Failed to fetch services");
      }
    } catch (error) {
      toast.error("An error occurred while fetching services");
    }
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    fetchServices(categoryId);
    setSelectedService('');
    setFormData((prev) => ({
      ...prev,
      description: '',
      quantityMin: '',
      quantityMax: '',
    }));
  };

  const handleServiceChange = (e) => {
    const serviceId = e.target.value;
    setSelectedService(serviceId);
    // Assuming description and quantity min/max are fetched based on the service
    // You need to fetch this data from your API or adjust accordingly
    // Example:
    // fetchServiceDetails(serviceId);
  };

  const handleQuantityChange = (e) => {
    const quantity = e.target.value;
    setFormData((prev) => ({
      ...prev,
      quantity: quantity,
      averageTime: calculateAverageTime(quantity),
      charge: calculateCharge(quantity),
    }));
  };

  const calculateAverageTime = (quantity) => {
    // Implement your logic to calculate average time based on quantity
    return quantity * 2; // Example logic
  };

  const calculateCharge = (quantity) => {
    // Implement your logic to calculate charge based on quantity
    return quantity * 10; // Example logic
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <section className="section-services">
      <Navibar />
      <div className="container">
        <h1 className="main-heading">Dashboard</h1>
      </div>

      <main>
        <section>
          {userData ? (
            <>
              <p style={{ fontSize: '25px' }}>Welcome back, {userData.username}👋</p>
              <p>Email: {userData.email}</p>
              <p>Phone: {userData.phone}</p>

              <div className="dashboard-container">
                <div className="dashboard-item">
                  <h2>Account Balance</h2>
                  <p>${userData.balance || 'N/A'}</p>
                </div>
                <div className="dashboard-item">
                  <h2>Total Orders</h2>
                  <p>{userData.totalOrders || 'N/A'}</p>
                </div>
                <div className="dashboard-item">
                  <h2>Account Status</h2>
                  <p>{userData.status || 'N/A'}</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="dynamic-form">
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select id="category" value={selectedCategory} onChange={handleCategoryChange} required>
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="service">Service</label>
                  <select id="service" value={selectedService} onChange={handleServiceChange} required>
                    <option value="">Select a service</option>
                    {services.map((svc) => (
                      <option key={svc.id} value={svc.id}>{svc.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    value={formData.description}
                    readOnly
                    placeholder="Service description will appear here..."
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="link">Link</label>
                  <input
                    id="link"
                    type="url"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="quantity">Quantity</label>
                  <input
                    id="quantity"
                    type="number"
                    value={formData.quantity}
                    min={formData.quantityMin}
                    max={formData.quantityMax}
                    onChange={handleQuantityChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="averageTime">Average Time</label>
                  <input
                    id="averageTime"
                    type="text"
                    value={formData.averageTime}
                    readOnly
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="charge">Charge</label>
                  <input
                    id="charge"
                    type="text"
                    value={formData.charge}
                    readOnly
                  />
                </div>

                <button type="submit">Submit</button>
              </form>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </section>
      </main>
    </section>
  );
};
