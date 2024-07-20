import { useAuth } from "../../store/auth";
import { Navibar } from "../../components/userComponents/Navibar";

export const Service = () => {
  const { services } = useAuth();

  const handleBuyClick = (service) => {
    // Logic for buying the service
    // For example, redirect to a payment page or open a modal
    console.log(`Buying service: ${service}`);
  };

  return (
    <section className="section-services">
      <Navibar />
      <div className="container">
        <h1 className="main-heading">Services</h1>
      </div>

      <div className="container">
        <table className="service-table">
          <thead>
            <tr>
              <th>Provider</th>
              <th>Price</th>
              <th>Service</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {services.map((curElem, index) => {
              const { price, description, provider, service } = curElem;

              return (
                <tr key={index}>
                  <td>{provider}</td>
                  <td>{price}</td>
                  <td>{service}</td>
                  <td>{description}</td>
                  <td>
                    <button
                      className="btn-buy"
                      onClick={() => handleBuyClick(service)}
                    >
                      Buy
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};
