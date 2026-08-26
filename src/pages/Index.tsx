import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { ServicesGrid } from '@/components/ServicesGrid';
import { BlogNewsletter } from '@/components/BlogNewsletter';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        <ServicesGrid />
        <BlogNewsletter />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
