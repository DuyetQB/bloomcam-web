import { setRequestLocale } from "next-intl/server";
import { PreorderFlow } from "@/components/preorder/preorder-flow";
import { PreorderJsonLd } from "@/components/seo/preorder-json-ld";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getTranslations } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "preorder.page" });
  return buildPageMetadata({
    locale,
    path: "/preorder",
    title: t("title"),
    description: t("description"),
  });
}

export default async function PreorderPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PreorderJsonLd locale={locale} />
      <PreorderFlow mode="page" />
    </>
  );
}
