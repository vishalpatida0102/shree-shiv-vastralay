import SEO from '../components/ui/SEO';
import PageTransition from '../components/animations/PageTransition';
import Hero from '../components/home/Hero';
import FeaturedSarees from '../components/home/FeaturedSarees';
import CategoryShowcase from '../components/home/CategoryShowcase';
import StatsSection from '../components/home/StatsSection';
import Testimonials from '../components/home/Testimonials';
import DeliveryInfo from '../components/home/DeliveryInfo';
import RecentlyViewed from '../components/home/RecentlyViewed';

export default function Home() {
  return (
    <PageTransition>
      <SEO />
      <Hero />
      <RecentlyViewed />
      <FeaturedSarees />
      <CategoryShowcase />
      <StatsSection />
      <DeliveryInfo />
      <Testimonials />
    </PageTransition>
  );
}
