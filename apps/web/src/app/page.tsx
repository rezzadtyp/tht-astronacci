import { Footer } from '@/components/Footer';
import Header from '@/components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';

export default function Home() {
  return (
    <main className="container space-y-12">
      <Header />
      <HeroSection />
      <AboutSection />
      <Footer />
    </main>
  );
}
