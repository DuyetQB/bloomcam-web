import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description:
      "Premium smart plant timelapse camera for cinematic growth stories.",
    start_url: "/",
    display: "standalone",
    background_color: "#0F1720",
    theme_color: "#5E8B7E",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
