import type { MetadataRoute } from "next";

// Prototype with sample data: block all crawlers until launch.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } };
}
