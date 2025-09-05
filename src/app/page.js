import Header from '@/app/components/Header';
import Hero from '@/app/components/Hero';
import Features from '@/app/components/Features';
import DualForms from '@/app/components/DualForms';
import Footer from '@/app/components/Footer';
import Stats from '@/app/components/Stats';
import MapAnimation from '@/app/components/MapAnimation';

export default function Home() {
  return (
    <div className="min-h-screen bg-dark-DEFAULT">
      <Header />
      <main>
        <Hero />
        <Stats />
        <MapAnimation />
        <Features />
       <DualForms/>
      </main>
      <Footer />
    </div>
  );
}