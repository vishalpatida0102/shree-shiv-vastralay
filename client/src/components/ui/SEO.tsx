import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
}

const BASE_TITLE = 'नागपुर वाला — जहाँ परंपरा मिलती है फैशन से';
const BASE_DESC = 'एक्सक्लूसिव साड़ियाँ और ब्राइडल कलेक्शन। सिल्क, बनारसी, पैठणी, कॉटन और डिज़ाइनर साड़ियाँ। नागपुर वाला — 39,000+ ग्राहकों का भरोसा।';

export default function SEO({ title, description, image }: SEOProps) {
  const pageTitle = title ? `${title} | नागपुर वाला` : BASE_TITLE;
  const pageDesc = description || BASE_DESC;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      {image && <meta property="og:image" content={image} />}
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDesc} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
}
