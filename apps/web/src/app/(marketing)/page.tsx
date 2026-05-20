import HomePage from '@/app/_views/HomePage';
import { getSiteSettings } from '@/lib/sanity/content';

export default async function MarketingHomePage() {
  const siteSettings = await getSiteSettings();

  return <HomePage siteSettings={siteSettings} />;
}
