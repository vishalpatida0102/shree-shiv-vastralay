import PageTransition from '../components/animations/PageTransition';
import Hero from '../components/home/Hero';
import FeaturedSarees from '../components/home/FeaturedSarees';
import CategoryShowcase from '../components/home/CategoryShowcase';
import StatsSection from '../components/home/StatsSection';
import Testimonials from '../components/home/Testimonials';

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <FeaturedSarees />
      <CategoryShowcase />
      <StatsSection />
      <Testimonials />
    </PageTransition>
  );
}
