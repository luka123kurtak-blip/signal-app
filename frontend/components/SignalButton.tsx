"use client";

type SignalButtonProps = {
  label?: string;
  pressed: boolean;
  disabled?: boolean;
  variant: "sender" | "receiver";
  onClick: () => void;
  onPointerDown?: () => void;
  onPointerUp?: () => void;
  onPointerLeave?: () => void;
};

const variants = {
  sender: {
    base: "bg-red-500 shadow-red-900/50 hover:bg-red-400",
    pressed: "bg-red-700 scale-95",
  },
  receiver: {
    base: "bg-violet-500 shadow-violet-900/40 hover:bg-violet-400",
    pressed: "bg-violet-700 scale-95",
  },
};

export function SignalButton({
  label,
  pressed,
  disabled,
  variant,
  onClick,
  onPointerDown,
  onPointerUp,
  onPointerLeave,
}: SignalButtonProps) {
  const styles = variants[variant];
  const ariaLabel = label || (variant === "sender" ? "Надіслати сигнал" : "Увімкнути звук");

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
      className={[
        "h-40 w-40 rounded-full shadow-lg transition-all duration-150 touch-manipulation",
        label ? "flex items-center justify-center px-3 text-center text-base font-semibold leading-tight text-white sm:text-lg" : "",
        pressed ? styles.pressed : styles.base,
        disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer active:scale-95",
      ].join(" ")}
    >
      {label}
    </button>
  );
}
