import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function Footer() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-surface/50 px-6 py-16 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 md:flex-row md:justify-between">
        <div>
          <p className="font-display text-2xl text-foreground">
            Bloom<span className="text-primary">Cam</span>
          </p>
          <p className="mt-3 max-w-xs text-sm text-muted">{t("tagline")}</p>
        </div>
        <div className="grid grid-cols-2 gap-8 text-sm md:grid-cols-3">
          <div>
            <p className="mb-3 font-medium text-foreground">{t("product")}</p>
            <ul className="space-y-2 text-muted">
              <li><Link href="#product" className="hover:text-foreground">{t("overview")}</Link></li>
              <li><Link href="#features" className="hover:text-foreground">{t("features")}</Link></li>
              <li><Link href="#preorder" className="hover:text-foreground">{t("preorder")}</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 font-medium text-foreground">{t("company")}</p>
            <ul className="space-y-2 text-muted">
              <li><Link href="#" className="hover:text-foreground">{t("about")}</Link></li>
              <li><Link href="#" className="hover:text-foreground">{t("press")}</Link></li>
              <li><Link href="#" className="hover:text-foreground">{t("contact")}</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 font-medium text-foreground">{t("legal")}</p>
            <ul className="space-y-2 text-muted">
              <li><Link href="#" className="hover:text-foreground">{t("privacy")}</Link></li>
              <li><Link href="#" className="hover:text-foreground">{t("terms")}</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl border-t border-white/5 pt-8 text-center text-xs text-muted md:text-left">
        {t("copyright", { year })}
      </div>
    </footer>
  );
}
