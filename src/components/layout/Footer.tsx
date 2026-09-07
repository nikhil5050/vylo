import Image from "next/image";
import Link from "next/link";
import { FacebookIcon, InstagramIcon } from "@/components/icons/Icons";
import { Container } from "@/components/ui/Container";
import { footerNav, type NavItem } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Logo1 } from "./logo1";


export function Footer() {
  return (
    // pb-24 (mobile/tablet only) clears the fixed mobile bottom nav's real
    // footprint (~4.75rem plus safe-area-inset-bottom — see Header.tsx and
    // HeroOverlay's identical bottom-24), so the page's true last content
    // (copyright/policy links below) isn't left rendering behind it with no
    // further room to scroll into view. That nav is lg:hidden, hence lg:pb-0.
    <footer className="relative overflow-hidden bg-burgundy-dark text-ivory pb-24 lg:pb-0">
      <Image
        src="/logo/logo1.png"
        alt=""
        aria-hidden="true"
        width={480}
        height={480}
        className="pointer-events-none absolute -right-16 top-1/2 z-0 h-auto w-64 -translate-y-1/2 select-none opacity-[0.06] mix-blend-screen sm:w-80 lg:w-[26rem]"
      />

      <Container className="relative z-10 grid grid-cols-2 gap-x-8 gap-y-12 py-16 lg:grid-cols-5 lg:py-24">
        <div className="col-span-2 flex flex-col gap-4">
          <Logo1 className="text-ivory" />
          <p className="max-w-xs text-sm text-ivory/70">{siteConfig.description}</p>
          <div className="mt-2 flex items-center gap-4">
            <a href="https://www.instagram.com/vylore.in?stkn=MXB4MDd1Z211bDBpMQ==" aria-label="Instagram" className="text-ivory/70 transition-colors hover:text-champagne">
              <InstagramIcon />
            </a>
            <a href="https://www.facebook.com/share/1BumDiprJ1/" aria-label="Facebook" className="text-ivory/70 transition-colors hover:text-champagne">
              <FacebookIcon />
            </a>
            <a href="https://m.youtube.com/@business.vylore?fbclid=PAT01DUAUKVyJwZG9mAmV4dG4DYWVtAjEwAHNydGMGYXBwX2lkDzU2NzA2NzM0MzM1MjQyNwABpz7qh61VhXDpYbapCs-L3MVtQQWSvxMq6_1dp74q7ORpanODuxzC0BePPvo4_aem_UYSlM8LV_zagZjxBKNP_Sg" aria-label="YouTube" className="text-ivory/70 transition-colors hover:text-champagne">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
              </svg>
            </a>
          </div>
        </div>

        <FooterColumn title="Shop" links={footerNav.shop} />
        <FooterColumn title="About" links={footerNav.about} />
        <FooterColumn title="Help" links={footerNav.help} />
      </Container>

      <div className="relative z-10 border-t border-ivory/10">
        <Container className="grid gap-3 py-6 text-xs text-ivory/70 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <p className="text-center sm:text-left">© {new Date().getFullYear()} Vylore. All rights reserved.</p>
          <p className="text-center font-bold">
            Powered By{" "}
            <a
              href="http://adswisemarketing.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-ivory"
            >
              Adswise Marketing
            </a>
          </p>
          <div className="flex justify-center gap-6 sm:justify-end">
            <Link href="/privacy-policy" className="transition-colors hover:text-ivory">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-ivory">
              Terms
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: NavItem[] }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="eyebrow text-xs text-ivory font-semibold">{title}</p>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-ivory/70 transition-colors hover:text-ivory">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
