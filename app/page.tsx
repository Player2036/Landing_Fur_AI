import Hero from "@/components/Hero";
import Learn from "@/components/Learn";
import Audience from "@/components/Audience";
import Info from "@/components/Info";
import Scarcity from "@/components/Scarcity";
import RegistrationForm from "@/components/RegistrationForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Learn />
      <Audience />
      <Info />
      <Scarcity />
      <RegistrationForm />
      <Footer />
    </main>
  );
}
