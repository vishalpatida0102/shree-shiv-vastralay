import { Helmet } from 'react-helmet-async';
import { useSiteConfig } from '../../context/ConfigContext';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
}

export default function SEO({ title, description, image }: SEOProps) {
  const { seo, identity } = useSiteConfig();

  const pageTitle = title ? `${title} | ${identity.name}` : seo.title;
  const pageDesc = description || seo.description;
  const ogImage = image || seo.ogImage;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDesc} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
    </Helmet>
  );
}
