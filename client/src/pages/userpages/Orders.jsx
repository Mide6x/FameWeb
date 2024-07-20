import { useAuth } from "../../store/auth";
import { Navibar } from "../../components/userComponents/Navibar";

export const Orders = () => {
  const { orders  } = useAuth();

  return (
    <section className="section-services">
       <Navibar/>
      <div className="container">
        <h1 className="main-heading">Orders. </h1>
      </div>

      
    </section>
  );
};
