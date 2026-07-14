import { Globe, Github, Linkedin, Instagram, Mail } from "lucide-react";
import { Lang, t } from "../lib/i18n";

interface Props {
  lang: Lang;
}

const socialLinks = [
  { key: "portfolio", href: "https://noureddine-bouderbala.vercel.app/", icon: Globe, external: true },
  { key: "github", href: "https://github.com/nxr-dine", icon: Github, external: true },
  { key: "linkedin", href: "https://linkedin.com/in/nxr-dine", icon: Linkedin, external: true },
  { key: "instagram", href: "https://instagram.com/nxr.dine", icon: Instagram, external: true },
  { key: "email", href: "mailto:noureddinebouder745@gmail.com", icon: Mail, external: false },
] as const;

export function DeveloperSection({ lang }: Props) {
  return (
    <section className="border-t border-border bg-background" aria-label={t(lang, "developer.title")}>
      <div className="mx-auto max-w-3xl px-4 py-20 sm:py-24">
        <div className="flex flex-col items-center text-center">
          {/* Avatar */}
          <img
            src="/developper.png"
            alt={t(lang, "developer.name")}
            className="mb-8 h-28 w-28 rounded-full border-2 border-border object-cover transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 sm:h-32 sm:w-32"
          />

          {/* Title */}
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {t(lang, "developer.title")}
          </h2>

          {/* Name */}
          <p className="mt-2 text-lg font-medium text-primary sm:text-xl">
            {t(lang, "developer.name")}
          </p>

          {/* Role */}
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            {t(lang, "developer.role")}
          </p>

          {/* Description */}
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t(lang, "developer.description")}
          </p>

          {/* Social Links */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {socialLinks.map(({ key, href, icon: Icon, external }) => (
              <a
                key={key}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                aria-label={t(lang, `developer.${key}`)}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:border-primary/40 hover:bg-accent hover:text-accent-foreground hover:shadow-sm"
              >
                <Icon className="h-4 w-4" />
                {t(lang, `developer.${key}`)}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="mt-10 text-sm text-muted-foreground">
            {t(lang, "developer.copyright")}
          </p>
        </div>
      </div>
    </section>
  );
}
