import { Globe, Github, Linkedin, Instagram, Mail } from "lucide-react";
import { Lang, t } from "../lib/i18n";

interface Props {
  lang: Lang;
}

const socialLinks = [
  { key: "portfolio", href: "https://noureddine-bouderbala.vercel.app/", icon: Globe, external: true },
  { key: "github", href: "https://github.com/nxr-deen", icon: Github, external: true },
  { key: "linkedin", href: "https://linkedin.com/in/nxr-dine", icon: Linkedin, external: true },
  { key: "instagram", href: "https://instagram.com/nxr.dine", icon: Instagram, external: true },
  { key: "email", href: "mailto:noureddinebouder745@gmail.com", icon: Mail, external: false },
] as const;

export function DeveloperSection({ lang }: Props) {
  return (
    <section className="border-t border-border bg-background" aria-label={t(lang, "developer.title")}>
      <div className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
        <div className="flex flex-col items-center text-center">
          {/* Avatar */}
          <div className="relative mb-6">
            <img
              src="/developper.png"
              alt={t(lang, "developer.name")}
              className="h-24 w-24 rounded-full border-2 border-border object-cover transition-all duration-300 hover:border-primary/40 hover:shadow-md hover:shadow-primary/5"
            />
          </div>

          {/* Title */}
          <h2 className="text-xl font-medium text-foreground">
            {t(lang, "developer.title")}
          </h2>

          {/* Name */}
          <p className="mt-1 text-sm font-medium text-primary">
            {t(lang, "developer.name")}
          </p>

          {/* Role */}
          <p className="mt-1 text-xs text-muted-foreground">
            {t(lang, "developer.role")}
          </p>

          {/* Description */}
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            {t(lang, "developer.description")}
          </p>

          {/* Social Links */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {socialLinks.map(({ key, href, icon: Icon, external }) => (
              <a
                key={key}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                aria-label={t(lang, `developer.${key}`)}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-foreground transition-all duration-200 hover:border-primary/40 hover:bg-accent hover:text-accent-foreground hover:shadow-sm"
              >
                <Icon className="h-3.5 w-3.5" />
                {t(lang, `developer.${key}`)}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="mt-8 text-xs text-muted-foreground">
            {t(lang, "developer.copyright")}
          </p>
        </div>
      </div>
    </section>
  );
}
