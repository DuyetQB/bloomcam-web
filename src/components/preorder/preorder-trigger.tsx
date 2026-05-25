"use client";

import { cloneElement, isValidElement, type ReactElement } from "react";
import { trackEvent } from "@/lib/analytics";
import type { ProductVariantId } from "@/lib/products";
import { usePreorder } from "@/components/preorder/preorder-context";

type Props = {
  children: ReactElement<{ onClick?: (e: React.MouseEvent) => void }>;
  variantId?: ProductVariantId;
};

export function PreorderTrigger({ children, variantId }: Props) {
  const { openPreorder } = usePreorder();

  if (!isValidElement(children)) return children;

  return cloneElement(children, {
    onClick: (e: React.MouseEvent) => {
      e.preventDefault();
      trackEvent("cta_preorder_click");
      openPreorder(variantId);
    },
  });
}
