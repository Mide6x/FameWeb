import { Analytics } from "../components/Analytics";
import {Navbar} from "../components/Navbar"
import {Footer} from "../components/Footer/Footer"


export const Home = () => {
  return (
    <>
    <Navbar/>
      <main> 
      
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content ">
              <p>We are an amazing Social Service Company</p>
              <h1>Welcome to Fame Social</h1>
              <p >
                Ready to elevate your business with top-notch Social Media
                Engagements? Look no further! At Fame Social, we excel in
                delivering state-of-the-art SMM solutions designed to enhance
                your online presence and drive social media growth. Our tailored
                services are crafted to meet your unique needs and propel your
                brand forward in the digital landscape.
              </p>

              <div className="btn btn-group">
                <a href="/contact">
                  <button className="btn">connect now</button>
                </a>
                <a href="/about">
                  <button className="btn secondary-btn">learn more</button>
                </a>
              </div>
            </div>

            {/* hero images  */}
            <div className="hero-image">
              <img
                src="/images/home.png"
                alt="coding together"
                width="200"
                height="250"
              />
            </div>
          </div>
        </section>
      </main>

      {/* 2nd section  */}
      <Analytics />

      <Footer/>
    </>
  );
};
