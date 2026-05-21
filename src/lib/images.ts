/** Verified Unsplash URLs (return 200) — avoids broken hotlinks at build/runtime. */

const base = (id: string, w: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

export const images = {
  heroBackdrop: base("1463936575829-25148e1db1b8", 1200),
  plantGarden: base("1416879595882-3373a0480b5b", 800),
  plantPot: base("1485955900006-10f4d324d411", 800),
  plantLeaves: base("1463936575829-25148e1db1b8", 800),
  plantGreenhouse: base("1416879595882-3373a0480b5b", 600),
  plantWindowsill: base("1485955900006-10f4d324d411", 600),
  plantCloseup: base("1463936575829-25148e1db1b8", 600),
  phoneTimeline: base("1485955900006-10f4d324d411", 400),
  phoneGallery: base("1416879595882-3373a0480b5b", 400),
  phoneExport: base("1463936575829-25148e1db1b8", 400),
  setupDesk1: base("1586023492125-27b2c045efd7", 600),
  setupDesk2: base("1618220179428-22790b461013", 600),
  setupDesk3: base("1416879595882-3373a0480b5b", 600),
  avatar1: base("1494790108377-be9c29b29330", 100),
  avatar2: base("1507003211169-0a1dd7228f2d", 100),
  avatar3: base("1438761681033-6461ffad8d80", 100),
} as const;
