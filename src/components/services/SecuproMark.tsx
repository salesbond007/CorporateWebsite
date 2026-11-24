import Image from "next/image";

/** セキュプロのロゴマーク(丸く切り抜いて表示) */
export function SecuproMark({
  className = "h-10 w-10",
  ring = false,
}: {
  className?: string;
  /** 色の濃い背景の上で使うときに白いふちを付ける */
  ring?: boolean;
}) {
  return (
    <span
      className={`block shrink-0 overflow-hidden rounded-full bg-white ${ring ? "ring-2 ring-white" : "ring-1 ring-black/5"} ${className}`}
    >
      <Image
        src="/secupro-logo.webp"
        alt=""
        width={160}
        height={160}
        className="h-full w-full object-contain"
      />
    </span>
  );
}
