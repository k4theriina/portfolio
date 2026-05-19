const productionSiteUrl = "https://katherinadayaon.me";

/** Canonical site URL for metadata, sitemap, and OAuth redirect configuration. */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;

  const vercelHost = process.env.VERCEL_URL?.replace(/\/$/, "");
  if (vercelHost) return `https://${vercelHost}`;

  return productionSiteUrl;
}

/** True when /api/login and /api/callback should accept requests. */
export function isOAuthSetupEnabled(): boolean {
  if (process.env.SPOTIFY_ALLOW_OAUTH_SETUP === "true") return true;
  if (process.env.NODE_ENV !== "production") return true;
  return !process.env.SPOTIFY_REFRESH_TOKEN;
}
