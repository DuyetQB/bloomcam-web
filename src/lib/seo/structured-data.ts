import { images } from "@/lib/images";
import { absoluteUrl, siteConfig } from "./site";

type FAQItem = { question: string; answer: string };
type ReviewItem = { author: string; reviewBody: string; rating?: number };

export function organizationJsonLd(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon.png`,
    email: siteConfig.email,
    sameAs: [
      "https://instagram.com/bloomcam",
      "https://tiktok.com/@bloomcam",
      "https://youtube.com/@bloomcam",
    ],
    description:
      locale === "vi"
        ? "BloomCam — camera timelapse cây cảnh thông minh cao cấp cho người yêu cây và creator."
        : "BloomCam — premium smart plant timelapse camera for plant lovers and creators.",
  };
}

export function websiteJsonLd(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: absoluteUrl(locale),
    publisher: { "@id": `${siteConfig.url}/#organization` },
    inLanguage: locale === "vi" ? "vi-VN" : "en-US",
    description:
      locale === "vi"
        ? "Camera timelapse thông minh biến sự phát triển của cây thành video điện ảnh."
        : "Smart plant timelapse camera that turns plant growth into cinematic videos.",
  };
}

export function preorderProductsJsonLd(locale: string) {
  const path = locale === "en" ? "/preorder" : `/${locale}/preorder`;
  const offers = [
    { sku: "BLOOMCAM-CORE", name: "BloomCam Core", price: 99 },
    { sku: "BLOOMCAM-STUDIO", name: "BloomCam Studio Kit", price: 149 },
  ];

  return offers.map((offer) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: offer.name,
    description:
      locale === "vi"
        ? "Camera timelapse cây thông minh BloomCam — đặt trước phiên bản đầu."
        : "BloomCam smart plant timelapse camera — first edition pre-order.",
    brand: { "@type": "Brand", name: siteConfig.name },
    sku: offer.sku,
    image: images.heroBackdrop,
    offers: {
      "@type": "Offer",
      url: `${siteConfig.url}${path}`,
      priceCurrency: "USD",
      price: String(offer.price),
      availability: "https://schema.org/PreOrder",
      itemCondition: "https://schema.org/NewCondition",
    },
  }));
}

export function productJsonLd(locale: string) {
  const description =
    locale === "vi"
      ? "BloomCam là camera timelapse cây cảnh thông minh — thiết bị lifestyle trên bàn, không phải camera an ninh. Ghi lại tăng trưởng, đồng bộ app di động, xuất video cinematic."
      : "BloomCam is a smart plant timelapse camera — a lifestyle desk gadget, not a surveillance camera. Captures growth, syncs to a mobile app, exports cinematic plant videos.";

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${siteConfig.url}/#product`,
    name: "BloomCam Smart Plant Timelapse Camera",
    description,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    category: siteConfig.productCategory.join(" > "),
    image: [images.heroBackdrop, images.plantGarden, images.plantPot],
    sku: "BLOOMCAM-001",
    offers: {
      "@type": "Offer",
      url: absoluteUrl(locale, "#preorder"),
      priceCurrency: siteConfig.price.currency,
      price: String(siteConfig.price.amount),
      availability: "https://schema.org/PreOrder",
      itemCondition: "https://schema.org/NewCondition",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "128",
      bestRating: "5",
      worstRating: "1",
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Product type",
        value: "Plant timelapse camera",
      },
      {
        "@type": "PropertyValue",
        name: "Not a surveillance camera",
        value: "true",
      },
    ],
  };
}

export function faqPageJsonLd(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function reviewJsonLd(reviews: ReviewItem[]) {
  return reviews.map((r) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    author: { "@type": "Person", name: r.author },
    reviewBody: r.reviewBody,
    reviewRating: {
      "@type": "Rating",
      ratingValue: r.rating ?? 5,
      bestRating: 5,
    },
    itemReviewed: { "@id": `${siteConfig.url}/#product` },
  }));
}

export function videoObjectsJsonLd(
  locale: string,
  videos: { name: string; description: string; thumbnail: string }[]
) {
  return videos.map((v, i) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: v.name,
    description: v.description,
    thumbnailUrl: v.thumbnail,
    uploadDate: "2025-01-15",
    contentUrl: absoluteUrl(locale, `#gallery-video-${i + 1}`),
  }));
}

export function breadcrumbJsonLd(
  locale: string,
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(locale, item.path),
    })),
  };
}

export function blogPostingJsonLd(
  locale: string,
  post: {
    title: string;
    description: string;
    slug: string;
    date: string;
    category: string;
  }
) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: { "@id": `${siteConfig.url}/#organization` },
    mainEntityOfPage: absoluteUrl(locale, `/blog/${post.slug}`),
    articleSection: post.category,
    inLanguage: locale === "vi" ? "vi-VN" : "en-US",
  };
}

export function buildHomeJsonLd(
  locale: string,
  faqs: FAQItem[],
  reviews: ReviewItem[],
  galleryVideos: { name: string; description: string; thumbnail: string }[]
) {
  return [
    organizationJsonLd(locale),
    websiteJsonLd(locale),
    productJsonLd(locale),
    faqPageJsonLd(faqs),
    ...reviewJsonLd(reviews),
    ...videoObjectsJsonLd(locale, galleryVideos),
    breadcrumbJsonLd(locale, [{ name: "Home", path: "" }]),
  ];
}
