import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";
import { Navibar } from "../../components/userComponents/Navibar";

export const Dashboard = () => {
  const navigate = useNavigate();
  const { token,  API } = useAuth();
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


  return (
    <section className="section-services">
      <Navibar/>
      <div className="container">
        <h1 className="main-heading">Dashboard. </h1>
      </div>
       
       
      

      <main>
        <section>
         
          {userData ? (
            <div>
             <p style={{fontSize:'25px'}}> Welcome back, {userData.username}👋</p>
              <p>
                Email: {userData.email}
              </p>
            
              <p>
                Phone: {userData.phone}
              </p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </section>
      </main>
    </section>
  );
};
