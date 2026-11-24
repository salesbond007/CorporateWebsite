import Image from "next/image";

/**
 * セキュプロ LP「サービス概要」の冒頭: セキュプロとはどんなサービスか(濃い背景のブロック)。
 */
export function CisoAboutBlock() {
  return (
    <div className="relative isolate overflow-hidden text-white">
      <Image
        src="/photos/ciso/governance.webp"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[#24070F]/[0.9]"
      />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-20">
        <p className="text-lg font-black md:text-xl">セキュプロは、</p>
        <h2 className="mt-2 text-[clamp(1.5rem,3vw,2.3rem)] font-black leading-[1.5] [word-break:auto-phrase]">
          情報セキュリティに特化したプロ人材サービスです
        </h2>
        <span aria-hidden="true" className="mt-6 block h-[2px] w-14 bg-white" />
        <p className="mt-6 text-[14.5px] leading-[2] text-white/85 md:text-[15px]">
          情報セキュリティ対策は、取引先の要請や生成AIの普及で、中小企業にも欠かせないものになりました。一方で、専任者を雇うのは簡単ではありません。
          <br />
          課題やフェーズに合わせて必要な領域のプロ人材が対応するので、専任者を雇わずに対策を前に進められます。
        </p>
      </div>
    </div>
  );
}
