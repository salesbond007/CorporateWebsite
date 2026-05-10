import { cn } from "@/lib/cn";

type BaseProps = {
  label: string;
  name: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
};

const inputClass =
  "block w-full rounded-lg border border-ink-line bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-muted focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 transition";

function FieldLabel({
  label,
  required,
  htmlFor,
}: {
  label: string;
  required?: boolean;
  htmlFor: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="flex items-center gap-2 text-sm font-semibold text-ink"
    >
      {label}
      {required ? (
        <span className="rounded bg-brand-500/10 px-1.5 py-0.5 text-[10px] font-bold text-brand-600">
          必須
        </span>
      ) : (
        <span className="text-[10px] font-medium text-ink-muted">任意</span>
      )}
    </label>
  );
}

function FieldFooter({ hint, error }: { hint?: string; error?: string }) {
  if (!hint && !error) return null;
  return (
    <p
      className={cn(
        "mt-1.5 text-xs",
        error ? "text-red-600" : "text-ink-muted",
      )}
    >
      {error ?? hint}
    </p>
  );
}

export function TextField(
  props: BaseProps &
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "name" | "className">,
) {
  const { label, name, required, hint, error, className, ...rest } = props;
  return (
    <div className={className}>
      <FieldLabel label={label} required={required} htmlFor={name} />
      <input
        id={name}
        name={name}
        required={required}
        className={cn(inputClass, "mt-2")}
        {...rest}
      />
      <FieldFooter hint={hint} error={error} />
    </div>
  );
}

export function TextareaField(
  props: BaseProps &
    Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "name" | "className">,
) {
  const { label, name, required, hint, error, className, ...rest } = props;
  return (
    <div className={className}>
      <FieldLabel label={label} required={required} htmlFor={name} />
      <textarea
        id={name}
        name={name}
        required={required}
        rows={6}
        className={cn(inputClass, "mt-2 resize-y")}
        {...rest}
      />
      <FieldFooter hint={hint} error={error} />
    </div>
  );
}

export function SelectField(
  props: BaseProps & {
    options: { value: string; label: string }[];
    placeholder?: string;
  } & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "name" | "className">,
) {
  const {
    label,
    name,
    required,
    hint,
    error,
    className,
    options,
    placeholder,
    value,
    ...rest
  } = props;
  return (
    <div className={className}>
      <FieldLabel label={label} required={required} htmlFor={name} />
      <select
        id={name}
        name={name}
        required={required}
        className={cn(inputClass, "mt-2 pr-10")}
        value={value ?? ""}
        {...rest}
      >
        <option value="" disabled>
          {placeholder ?? "選択してください"}
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <FieldFooter hint={hint} error={error} />
    </div>
  );
}
