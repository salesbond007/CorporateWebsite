"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export type CompanySuggestion = {
  corporateNumber: string;
  name: string;
  address: string;
  postalCode: string;
};

type Props = {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  onSelect: (company: CompanySuggestion) => void;
};

function formatPostalCode(zip: string) {
  const digits = zip.replace(/\D/g, "");
  if (digits.length !== 7) return zip;
  return `〒${digits.slice(0, 3)}-${digits.slice(3)}`;
}

export function CompanyAutocomplete({
  label,
  name,
  required,
  placeholder,
  value,
  error,
  onChange,
  onSelect,
}: Props) {
  const [suggestions, setSuggestions] = useState<CompanySuggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const lastQueryRef = useRef<string>("");

  // 入力変化に対するディバウンス検索
  useEffect(() => {
    const q = value.trim();
    if (q.length < 2) {
      setSuggestions([]);
      setOpen(false);
      setLoading(false);
      return;
    }
    if (q === lastQueryRef.current) return;

    setLoading(true);
    const timer = setTimeout(async () => {
      abortRef.current?.abort();
      const ctrl = new AbortController();
      abortRef.current = ctrl;
      try {
        const res = await fetch(
          `/api/companies/search?q=${encodeURIComponent(q)}`,
          { signal: ctrl.signal },
        );
        const json = (await res.json()) as { results?: CompanySuggestion[] };
        if (ctrl.signal.aborted) return;
        const list = json.results ?? [];
        lastQueryRef.current = q;
        setSuggestions(list);
        setOpen(list.length > 0);
        setActiveIndex(-1);
      } catch (err) {
        if ((err as { name?: string }).name !== "AbortError") {
          console.error("[CompanyAutocomplete] search failed", err);
        }
      } finally {
        setLoading(false);
      }
    }, 280);

    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  // 外側クリックで閉じる
  useEffect(() => {
    function onDocMouseDown(e: MouseEvent) {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, []);

  function handleSelect(s: CompanySuggestion) {
    onSelect(s);
    setOpen(false);
    setActiveIndex(-1);
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(suggestions[activeIndex]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  const errId = error ? `${name}-error` : undefined;

  return (
    <div ref={wrapperRef} className="relative">
      <label htmlFor={name} className="flex items-center gap-2 text-sm font-semibold text-ink">
        {label}
        {required ? (
          <span className="rounded bg-brand-500/10 px-1.5 py-0.5 text-[10px] font-bold text-brand-600">
            必須
          </span>
        ) : null}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        autoComplete="organization"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => {
          if (suggestions.length > 0) setOpen(true);
        }}
        onKeyDown={handleKey}
        aria-autocomplete="list"
        aria-expanded={open}
        aria-controls={`${name}-listbox`}
        aria-invalid={!!error}
        aria-describedby={errId}
        className={cn(
          "mt-2 block w-full rounded-lg border bg-white px-4 py-3 text-base text-ink placeholder:text-ink-muted/70",
          "focus:outline-none focus:ring-2 focus:ring-brand-500/40",
          error ? "border-red-400" : "border-ink-line focus:border-brand-500",
        )}
      />

      <p className="mt-1.5 text-xs text-ink-muted">
        会社名を 2 文字以上入力すると候補が表示されます(法人番号データベース)
      </p>

      {loading ? (
        <span className="absolute right-3 top-[42px] text-xs text-ink-muted">
          検索中…
        </span>
      ) : null}

      {open && suggestions.length > 0 ? (
        <ul
          id={`${name}-listbox`}
          role="listbox"
          className="absolute z-20 mt-1 max-h-80 w-full overflow-auto rounded-lg border border-ink-line bg-white shadow-soft"
        >
          {suggestions.map((s, i) => {
            const active = i === activeIndex;
            return (
              <li
                key={s.corporateNumber}
                role="option"
                aria-selected={active}
                onMouseDown={(e) => {
                  e.preventDefault(); // フィールドからフォーカスが外れる前に確定
                  handleSelect(s);
                }}
                onMouseEnter={() => setActiveIndex(i)}
                className={cn(
                  "cursor-pointer border-b border-ink-line/60 px-4 py-3 last:border-b-0",
                  active ? "bg-brand-50" : "hover:bg-cream",
                )}
              >
                <p className="text-sm font-bold text-ink">{s.name}</p>
                <p className="mt-1 text-xs text-ink-soft leading-relaxed">
                  {s.postalCode ? `${formatPostalCode(s.postalCode)} ` : ""}
                  {s.address}
                </p>
              </li>
            );
          })}
        </ul>
      ) : null}

      {error ? (
        <p id={errId} className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
