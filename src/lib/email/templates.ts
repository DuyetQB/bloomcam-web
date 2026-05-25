import { siteConfig } from "@/lib/seo/site";

type PreorderEmailData = {
  orderNumber: string;
  email: string;
  variantName: string;
  quantity: number;
  totalFormatted: string;
  locale: string;
};

export function preorderConfirmationEmail(data: PreorderEmailData) {
  const isVi = data.locale === "vi";
  const subject = isVi
    ? `Đặt trước BloomCam đã nhận — ${data.orderNumber}`
    : `Your BloomCam pre-order is in — ${data.orderNumber}`;

  const html = `
<!DOCTYPE html>
<html>
<body style="margin:0;background:#0F1720;font-family:system-ui,sans-serif;color:#F5F7FA;padding:40px 24px;">
  <div style="max-width:520px;margin:0 auto;">
    <p style="color:#A7C4A0;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;">BloomCam</p>
    <h1 style="font-weight:300;font-size:28px;margin:16px 0 8px;">
      ${isVi ? "Câu chuyện cây của bạn bắt đầu sớm." : "Your plant's story starts early."}
    </h1>
    <p style="color:#A9B4C2;line-height:1.6;">
      ${isVi ? "Cảm ơn bạn đã đặt trước. Đây là xác nhận cho đơn" : "Thank you for pre-ordering. This confirms order"}
      <strong style="color:#F5F7FA;"> ${data.orderNumber}</strong>.
    </p>
    <div style="margin:32px 0;padding:24px;border-radius:16px;background:#1B2530;border:1px solid rgba(167,196,160,0.15);">
      <p style="margin:0 0 8px;color:#A9B4C2;font-size:13px;">${isVi ? "Sản phẩm" : "Product"}</p>
      <p style="margin:0;font-size:18px;">${data.variantName} × ${data.quantity}</p>
      <p style="margin:16px 0 0;font-size:22px;color:#E7B66B;">${data.totalFormatted}</p>
      <p style="margin:8px 0 0;color:#A9B4C2;font-size:13px;">
        ${isVi ? "Dự kiến giao đầu 2026" : "Estimated ship early 2026"}
      </p>
    </div>
    <p style="color:#A9B4C2;font-size:14px;line-height:1.6;">
      ${isVi ? "Chúng tôi sẽ gửi email khi BloomCam sẵn sàng giao." : "We'll email you when BloomCam is ready to ship."}
    </p>
    <p style="margin-top:40px;font-size:12px;color:#5e6b78;">
      ${siteConfig.name} · ${siteConfig.url}
    </p>
  </div>
</body>
</html>`;

  return { subject, html, text: `${subject}\n${data.variantName} · ${data.totalFormatted}` };
}

export function waitlistConfirmationEmail(email: string, locale: string) {
  const isVi = locale === "vi";
  return {
    subject: isVi ? "Bạn đã vào danh sách BloomCam" : "You're on the BloomCam list",
    html: `<p style="font-family:system-ui;background:#0F1720;color:#F5F7FA;padding:32px;">
      ${isVi ? "Cảm ơn — chúng tôi sẽ liên hệ khi có tin mới." : "Thanks — we'll be in touch with launch updates."}
    </p>`,
  };
}
