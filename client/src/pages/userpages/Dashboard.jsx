import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";

export const Dashboard = () => {
  const navigate = useNavigate();
  const { token, logout, API } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchUserData();
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
        setUserData(result.userData || result); // Adjust based on actual data structure
        console.log(result); // Verify the structure of the result
      } else {
        toast.error("Failed to fetch user data");
      }
    } catch (error) {
      toast.error("An error occurred while fetching user data");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <header>
        <h1>Welcome to Your Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>
      <main>
        <section>
          <h2>Your Details</h2>
          {userData ? (
            <div>
              <p><strong>Username:</strong> {userData.username}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Phone:</strong> {userData.phone}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </section>
      </main>
    </div>
  );
};
