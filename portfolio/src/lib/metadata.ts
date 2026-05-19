import type { Metadata } from "next";

export const siteUrl = "https://katherinadayaon.me";

/** Used for link previews (Open Graph / Twitter). Add `public/assets/og-image.jpg` (1200×630) and update this path if you prefer a custom card. */
export const siteOgImage = `${siteUrl}/assets/UltimateKatPhoto.webp`;

export const defaultDescription =
  "Hi I'm Kat! I'm an aspiring software engineer, creative technologist, and designer. Discover my projects, ideas, and my love for creation! ^_^";

export const titleTemplate = "%s | Kat's Portfolio";

export const defaultTitle =
  "Kat's Portfolio";

type PageMetadataOptions = {
  title: string;
  description?: string;
  path?: string;
  /** Set true for the home page so the title is not run through the layout template. */
  absoluteTitle?: boolean;
};

export function createPageMetadata({
  title,
  description = defaultDescription,
  path = "",
  absoluteTitle = false,
}: PageMetadataOptions): Metadata {
  const url = `${siteUrl}${path}`;
  const socialTitle = absoluteTitle ? title : `${title} | Kat's Portfolio`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    metadataBase: new URL(siteUrl),
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName: "Katherina Dayaon's Portfolio Website",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: siteOgImage,
          width: 1200,
          height: 630,
          alt: socialTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [siteOgImage],
    },
  };
}
