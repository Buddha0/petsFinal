import HeroSection from "../../components/heroSection/heroSection";
import InfoSection from "../../components/infoSection/infoSection";
import TestimonialSection from "../../components/testomonial/testomonial";
import Footer from "../../components/footer/footer";
import LatestPets from "../../components/latestPets/latestPets";
export default function Home() {
  return (
    <>
      <HeroSection />
      <InfoSection/>
      <LatestPets/>


      <TestimonialSection />
      <Footer/>
    </>
  );
}
