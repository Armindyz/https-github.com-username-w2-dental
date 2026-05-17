import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Gallery from '@/components/Gallery';
import WhyUs from '@/components/WhyUs';
import Doctors from '@/components/Doctors';
import Packages from '@/components/Packages';
import Reviews from '@/components/Reviews';
import AppointmentForm from '@/components/AppointmentForm';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Gallery />
        <WhyUs />
        <Doctors />
        <Packages />
        <Reviews />
        <AppointmentForm />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
