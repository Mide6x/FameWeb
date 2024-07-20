import { useAuth } from "../../store/auth";
import { Navibar } from "../../components/userComponents/Navibar";

export const Payments = () => {
  const { payments  } = useAuth();

  return (
    <section className="section-services">
       <Navibar/>
      <div className="container">
        <h1 className="main-heading">Payments. </h1>
      </div>

      
    </section>
  );
};
