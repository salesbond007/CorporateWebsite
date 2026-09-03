import Image from "next/image";

type ClientLogo = {
  name: string;
  src: string;
  /** ロゴ画像の実寸に応じた表示幅の目安(px)。縦横比を保って高さに合わせる */
  width: number;
};

const clients: ClientLogo[] = [
  { name: "Fixx", src: "/clients/fixx.png", width: 100 },
  { name: "JAPAN AI株式会社", src: "/clients/japan-ai.webp", width: 180 },
  { name: "LegalOn Technologies", src: "/clients/legalontechnology.jpg", width: 170 },
  { name: "TOPPANコスモ", src: "/clients/toppan-cosmo.png", width: 140 },
  { name: "kubell", src: "/clients/kubell.jpeg", width: 110 },
  { name: "uluru", src: "/clients/ururu.png", width: 130 },
  { name: "And L.", src: "/clients/andoeru.png", width: 120 },
  { name: "三省堂書店", src: "/clients/sanseido.png", width: 150 },
  { name: "KOMPEITO", src: "/clients/kompeito.png", width: 150 },
  { name: "OKAN", src: "/clients/okan.png", width: 110 },
];

function LogoStrip({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center gap-16 pr-16"
      aria-hidden={ariaHidden}
    >
      {clients.map((c) => (
        <div key={c.name} className="flex h-10 shrink-0 items-center md:h-12">
          <Image
            src={c.src}
            alt={c.name}
            width={c.width}
            height={48}
            className="h-full w-auto object-contain grayscale opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
          />
        </div>
      ))}
    </div>
  );
}

export function ClientLogos() {
  return (
    <section className="border-y border-ink-line bg-white py-12 md:py-14">
      <p className="mb-8 text-center text-xs font-bold uppercase tracking-[0.18em] text-ink-muted">
        Our Clients
      </p>
      <div
        className="relative flex overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="flex w-max animate-marquee">
          <LogoStrip />
          <LogoStrip ariaHidden />
        </div>
      </div>
    </section>
  );
}
