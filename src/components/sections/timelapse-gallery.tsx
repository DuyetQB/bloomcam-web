"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Play, Maximize2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AnimatedSectionTitle } from "@/components/shared/animated-section-title";
import { images } from "@/lib/images";
import { cn } from "@/lib/utils";

const galleryConfig = [
  { id: "monstera", image: images.plantGreenhouse, layout: "featured" as const },
  { id: "succulent", image: images.plantWindowsill, layout: "side" as const },
  { id: "fiddle", image: images.plantCloseup, layout: "side" as const },
  { id: "pothos", image: images.plantPot, layout: "wide" as const },
  { id: "fern", image: images.plantGarden, layout: "standard" as const },
  { id: "calathea", image: images.plantLeaves, layout: "standard" as const },
] as const;

type Layout = (typeof galleryConfig)[number]["layout"];

type GalleryItem = {
  id: string;
  title: string;
  duration: string;
  image: string;
  layout: Layout;
};

const layoutClasses: Record<Layout, string> = {
  featured:
    "col-span-1 min-h-[280px] sm:col-span-2 sm:min-h-[320px] lg:col-span-7 lg:row-span-2 lg:min-h-0 lg:h-full",
  side: "col-span-1 min-h-[220px] sm:col-span-1 lg:col-span-5 lg:min-h-[230px]",
  wide: "col-span-1 min-h-[240px] sm:col-span-2 lg:col-span-8 lg:min-h-[260px]",
  standard: "col-span-1 min-h-[220px] sm:col-span-1 lg:col-span-4 lg:min-h-[260px]",
};

function GalleryCard({ item }: { item: GalleryItem }) {
  const isFeatured = item.layout === "featured";

  return (
    <div
      className={cn(
        "group relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-surface/40",
        "transition-[border-color,box-shadow] duration-500",
        "hover:border-primary/25 hover:shadow-[0_0_48px_-12px_var(--glow-primary)]"
      )}
    >
      <div className="relative h-full min-h-[inherit] w-full">
        <Image
          src={item.image}
          alt={item.title}
          fill
          loading="lazy"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes={
            isFeatured
              ? "(max-width: 1024px) 100vw, 58vw"
              : "(max-width: 1024px) 50vw, 33vw"
          }
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-background/5" />
        <div className="absolute inset-0 bg-primary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/90 shadow-lg backdrop-blur-sm">
            <Play className="h-6 w-6 fill-[#0F1720] text-[#0F1720]" />
          </span>
        </div>

        <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full glass opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Maximize2 className="h-4 w-4 text-foreground/80" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-accent md:text-xs">
            {item.duration}
          </p>
          <p
            className={cn(
              "mt-1 font-display leading-tight text-foreground",
              isFeatured ? "text-2xl md:text-3xl" : "text-lg md:text-xl"
            )}
          >
            {item.title}
          </p>
        </div>
      </div>
    </div>
  );
}

export function TimelapseGallery() {
  const t = useTranslations("gallery");

  const galleryItems: GalleryItem[] = galleryConfig.map((item) => ({
    id: item.id,
    title: t(`items.${item.id}.title`),
    duration: t(`items.${item.id}.duration`),
    image: item.image,
    layout: item.layout,
  }));

  return (
    <section id="gallery" className="relative section-padding">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <AnimatedSectionTitle
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-12 lg:auto-rows-[minmax(230px,1fr)] lg:gap-5">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className={layoutClasses[item.layout]}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="h-full w-full cursor-pointer rounded-2xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <GalleryCard item={item} />
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-5xl border border-white/10 bg-surface/95 p-2 shadow-2xl sm:p-3">
                  <DialogTitle className="sr-only">{item.title}</DialogTitle>
                  <DialogDescription className="sr-only">
                    {item.duration} {t("timelapseLabel")}
                  </DialogDescription>
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                    <Image
                      src={item.image.replace(/w=\d+/, "w=1200")}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="100vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.span
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/90 shadow-lg"
                      >
                        <Play className="h-8 w-8 fill-[#0F1720] text-[#0F1720]" />
                      </motion.span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <p className="text-xs uppercase tracking-widest text-accent">
                        {item.duration} · {t("timelapseLabel")}
                      </p>
                      <p className="mt-2 font-display text-2xl text-foreground md:text-4xl">
                        {item.title}
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
