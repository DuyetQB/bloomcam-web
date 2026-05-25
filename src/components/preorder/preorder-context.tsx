"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { trackEvent } from "@/lib/analytics";
import type { ProductVariantId } from "@/lib/products";

export type PreorderStep = "variant" | "quantity" | "shipping" | "payment" | "success";

type PreorderState = {
  step: PreorderStep;
  variantId: ProductVariantId;
  quantity: number;
  orderNumber?: string;
};

type PreorderContextValue = {
  isOpen: boolean;
  openPreorder: (variantId?: ProductVariantId) => void;
  closePreorder: () => void;
  state: PreorderState;
  setStep: (step: PreorderStep) => void;
  setVariantId: (id: ProductVariantId) => void;
  setQuantity: (n: number) => void;
  setOrderNumber: (n: string) => void;
  goNext: () => void;
  goBack: () => void;
};

const STEPS: PreorderStep[] = ["variant", "quantity", "shipping", "payment", "success"];

const defaultState: PreorderState = {
  step: "variant",
  variantId: "studio-kit",
  quantity: 1,
};

const PreorderContext = createContext<PreorderContextValue | null>(null);

export function PreorderProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<PreorderState>(defaultState);

  const openPreorder = useCallback((variantId?: ProductVariantId) => {
    setState({
      ...defaultState,
      variantId: variantId ?? defaultState.variantId,
    });
    setIsOpen(true);
    trackEvent("preorder_opened");
  }, []);

  const closePreorder = useCallback(() => {
    setIsOpen(false);
    trackEvent("preorder_abandoned", { step: state.step });
    setTimeout(() => setState(defaultState), 400);
  }, [state.step]);

  const setStep = useCallback((step: PreorderStep) => {
    setState((s) => ({ ...s, step }));
    trackEvent("preorder_step_viewed", { step });
  }, []);

  const goNext = useCallback(() => {
    setState((s) => {
      const idx = STEPS.indexOf(s.step);
      const next = STEPS[Math.min(idx + 1, STEPS.length - 1)];
      trackEvent("preorder_step_viewed", { step: next });
      return { ...s, step: next };
    });
  }, []);

  const goBack = useCallback(() => {
    setState((s) => {
      const idx = STEPS.indexOf(s.step);
      const prev = STEPS[Math.max(idx - 1, 0)];
      return { ...s, step: prev };
    });
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      openPreorder,
      closePreorder,
      state,
      setStep,
      setVariantId: (variantId: ProductVariantId) => {
        setState((s) => ({ ...s, variantId }));
        trackEvent("preorder_variant_selected", { variantId });
      },
      setQuantity: (quantity: number) => setState((s) => ({ ...s, quantity })),
      setOrderNumber: (orderNumber: string) =>
        setState((s) => ({ ...s, orderNumber, step: "success" })),
      goNext,
      goBack,
    }),
    [isOpen, openPreorder, closePreorder, state, setStep, goNext, goBack]
  );

  return (
    <PreorderContext.Provider value={value}>{children}</PreorderContext.Provider>
  );
}

export function usePreorder() {
  const ctx = useContext(PreorderContext);
  if (!ctx) throw new Error("usePreorder must be used within PreorderProvider");
  return ctx;
}
