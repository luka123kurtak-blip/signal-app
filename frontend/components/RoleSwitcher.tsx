import Link from "next/link";

type Role = "sender" | "receiver";

const roles: { id: Role; label: string; href: string; active: string; idle: string }[] = [
  {
    id: "sender",
    label: "Відправник",
    href: "/",
    active: "bg-sky-500 ring-2 ring-sky-300/60",
    idle: "bg-sky-500/70 hover:bg-sky-500",
  },
  {
    id: "receiver",
    label: "Отримувач",
    href: "/receiver",
    active: "bg-violet-500 ring-2 ring-violet-300/60",
    idle: "bg-violet-500/70 hover:bg-violet-500",
  },
];

export function RoleSwitcher({ current }: { current?: Role }) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {roles.map((role) => {
        const isActive = current === role.id;

        return (
          <Link key={role.id} href={role.href} className="no-underline">
            <span
              className={[
                "inline-flex min-w-[9.5rem] items-center justify-center rounded-xl px-6 py-3 text-base font-semibold text-white transition-all",
                isActive ? role.active : role.idle,
                !current || isActive ? "opacity-100" : "opacity-50",
              ].join(" ")}
            >
              {role.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
