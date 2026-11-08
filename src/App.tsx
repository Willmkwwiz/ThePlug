import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import AboutPage from '@/pages/AboutPage';
import MarketplaceHome from '@/pages/MarketplaceHome';
import MembershipRegistration from '@/pages/MembershipRegistration';
import OwnerDashboard from '@/pages/OwnerDashboard';
import PostNewAd from '@/pages/PostNewAd';
import { useRoute, type Route } from '@/lib/router';

function renderPage(route: Route) {
  switch (route) {
    case '/join':
      return <MembershipRegistration />;
    case '/post':
      return <PostNewAd />;
    case '/about':
      return <AboutPage />;
    case '/owner':
      return <OwnerDashboard />;
    default:
      return <MarketplaceHome />;
  }
}

export default function App() {
  const route = useRoute();

  return (
    <div className="flex min-h-screen flex-col bg-stone-50 font-sans text-stone-800">
      <SiteHeader route={route} />
      <main className="flex-1">{renderPage(route)}</main>
      <SiteFooter />
    </div>
  );
}
