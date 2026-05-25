import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Fraunces, Outfit, Be_Vietnam_Pro } from "next/font/google";
import { GrainOverlay } from "@/components/effects/grain-overlay";
import { AppShell } from "@/components/providers/app-shell";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { routing } from "@/i18n/routing";
import "../globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-vietnamese",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, page: "home" });
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${fraunces.variable} ${outfit.variable} ${beVietnamPro.variable} lenis`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <NextIntlClientProvider messages={messages}>
          <SmoothScrollProvider>
            <AppShell>{children}</AppShell>
            <GrainOverlay />
          </SmoothScrollProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
