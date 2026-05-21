"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Play, Maximize2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AnimatedSectionTitle } from "@/components/shared/animated-section-title";
import { images } from "@/lib/images";

const galleryConfig = [
  { id: "monstera", image: images.plantGreenhouse, span: "md:col-span-2 md:row-span-2" },
  { id: "succulent", image: images.plantWindowsill, span: "" },
  { id: "fiddle", image: images.plantCloseup, span: "" },
  { id: "pothos", image: images.plantPot, span: "md:col-span-2" },
  { id: "fern", image: images.plantGarden, span: "" },
  { id: "calathea", image: images.plantLeaves, span: "" },
] as const;

type GalleryItem = {
  id: string;
  title: string;
  duration: string;
  image: string;
  span: string;
};

function GalleryCard({ item }: { item: GalleryItem }) {
  return (
    <motion.div
      role="button"
      tabIndex={0}
      whileHover={{ scale: 1.02 }}
      className={`group relative overflow-hidden rounded-2xl text-left ${item.span}`}
    >
      <div className="relative aspect-square md:aspect-auto md:h-full min-h-[200px]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          loading="lazy"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
          <span className="flex h-14 w-14 items-center justify-center rounded-full glass">
            <Play className="h-6 w-6 fill-foreground text-foreground" />
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="text-xs uppercase tracking-widest text-accent">{item.duration}</p>
          <p className="mt-1 font-display text-xl text-foreground">{item.title}</p>
        </div>
        <Maximize2 className="absolute right-4 top-4 h-4 w-4 text-white/40 opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
    </motion.div>
  );
}

export function TimelapseGallery() {
  const t = useTranslations("gallery");

  const galleryItems: GalleryItem[] = galleryConfig.map((item) => ({
    id: item.id,
    title: t(`items.${item.id}.title`),
    duration: t(`items.${item.id}.duration`),
    image: item.image,
    span: item.span,
  }));

  return (
    <section id="gallery" className="relative section-padding">
      <div className="mx-auto max-w-7xl">
        <AnimatedSectionTitle
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="grid auto-rows-[200px] grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[180px]">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className={item.span}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <div>
                    <GalleryCard item={item} />
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-5xl border-none bg-transparent p-0 shadow-none">
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
                    <Image
                      src={item.image.replace(/w=\d+/, "w=1200")}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <motion.span
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/90"
                      >
                        <Play className="h-8 w-8 fill-[#0F1720] text-[#0F1720]" />
                      </motion.span>
                    </div>
                    <div className="absolute bottom-6 left-6">
                      <p className="font-display text-3xl text-foreground">{item.title}</p>
                      <p className="text-muted">
                        {item.duration} {t("timelapseLabel")}
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
