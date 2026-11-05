import Image from "next/image";

type ClientLogo = {
  name: string;
  src: string;
  /** ロゴ画像の実寸に応じた表示幅の目安(px)。縦横比を保って高さに合わせる */
  width: number;
};

const clients: ClientLogo[] = [
  { name: "Fixx", src: "/clients/fixx.png", width: 116 },
  { name: "JAPAN AI株式会社", src: "/clients/japan-ai.webp", width: 208 },
  { name: "LegalOn Technologies", src: "/clients/legalontechnology.jpg", width: 196 },
  { name: "TOPPANコスモ", src: "/clients/toppan-cosmo.png", width: 162 },
  { name: "kubell", src: "/clients/kubell.jpeg", width: 128 },
  { name: "uluru", src: "/clients/ururu.png", width: 150 },
  { name: "And L.", src: "/clients/andoeru.png", width: 138 },
  { name: "三省堂書店", src: "/clients/sanseido.png", width: 174 },
  { name: "KOMPEITO", src: "/clients/kompeito.png", width: 174 },
  { name: "OKAN", src: "/clients/okan.png", width: 128 },
];

function LogoStrip({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center gap-10 pr-10 md:gap-16 md:pr-16"
      aria-hidden={ariaHidden}
    >
      {clients.map((c) => (
        <div
          key={c.name}
          className="flex h-8 shrink-0 items-center opacity-70 grayscale transition duration-500 hover:scale-105 hover:opacity-100 hover:grayscale-0 md:h-14"
        >
          <Image
            src={c.src}
            alt={c.name}
            width={c.width}
            height={56}
            className="h-full w-auto object-contain"
          />
        </div>
      ))}
    </div>
  );
}

export function ClientLogos() {
  return (
    <section className="border-y border-ink-line bg-white py-8 md:py-12">
      <p className="mb-6 text-center text-[11px] font-bold uppercase tracking-[0.3em] text-ink-muted md:mb-8">
        Trusted by
      </p>
      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
      >
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          <LogoStrip />
          <LogoStrip ariaHidden />
        </div>
      </div>
    </section>
  );
}
