import Image from "next/image";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { InstagramIcon } from "@/components/icons/Icons";
import { absoluteUrl, socialLinks } from "@/config/site";
import { InstagramReelGrid, type Reel } from "./InstagramReelGrid";

const REELS_BASE = "https://ik.imagekit.io/vyloreimgs/vylore/instagram-section";

// `file` is the URL-encoded ImageKit path; `version` its `updatedAt`, so a
// re-upload under the same name isn't masked by a cached copy (bump it after
// replacing a file). ImageKit serves the 540px preview via `tr=w-540` and the
// poster frame via `/ik-thumbnail.jpg`.
const reelSources = [
  {
    id: "earring-ad-15-oct",
    file: "Earring%20Ad%20Vylore%2015%20Oct_Final.mp4",
    version: "1792901936883",
    title: "Made to Be Noticed",
    caption: "Statement sterling silver with a sparkle that turns heads.",
    uploadDate: "2026-10-15",
  },
  {
    id: "reel-04-7-oct",
    file: "Vylore%207%20OCT%20Reel%2004_Final.mp4",
    version: "1792901946194",
    title: "Silver, Simply Shaped",
    caption: "Clean contemporary lines in 925 sterling silver.",
    uploadDate: "2026-10-07",
  },
  {
    id: "reel-2-3-oct",
    file: "Vylore%203%20Oct%20reel%202_Final_1.mp4",
    version: "1792901941164",
    title: "Behind the Shoot",
    caption: "On set with Vylore — silver styled for the spotlight.",
    uploadDate: "2026-10-03",
  },
  {
    id: "ring-ad-19-oct",
    file: "Ring%20Ad%20Vylore%2019%20Oct_Final.mp4",
    version: "1792901933170",
    title: "A Ring to Remember",
    caption: "A sterling silver ring designed for moments that matter.",
    uploadDate: "2026-10-19",
  },
];

const reels: Reel[] = reelSources.map(({ file, version, ...reel }) => {
  const src = `${REELS_BASE}/${file}?updatedAt=${version}`;
  return {
    ...reel,
    src,
    previewSrc: `${src}&tr=w-540`,
    poster: `${REELS_BASE}/${file}/ik-thumbnail.jpg?updatedAt=${version}`,
  };
});

// Lets the reels show up in Google's video results.
const videoJsonLd = reels.map((reel) => ({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: `${reel.title} | Vylore`,
  description: reel.caption,
  thumbnailUrl: reel.poster,
  contentUrl: reel.src,
  uploadDate: reel.uploadDate,
  embedUrl: absoluteUrl("/"),
}));

const marqueeWords = ["#VyloreMoments", "925 Sterling Silver", "Styled by You", "Made to Be Worn"];

export function InstagramReels() {
  return (
    <section className="relative isolate overflow-hidden bg-burgundy-dark pb-10 pt-16 lg:pb-14 lg:pt-[120px]">
      <JsonLd data={videoJsonLd} />

      {/* Soft gold and cherry glows for depth behind the reels. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-gold/20 blur-[120px]" />
        <div className="absolute -bottom-48 -right-32 h-[32rem] w-[32rem] rounded-full bg-cherry/50 blur-[140px]" />
      </div>

      <Container>
        <FadeIn className="flex flex-col items-center text-center">
          {/* Profile chip styled after an Instagram story ring. */}
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full bg-white/[0.06] py-1.5 pl-1.5 pr-5 ring-1 ring-white/10 backdrop-blur-sm transition-colors hover:bg-white/10"
          >
            <span className="rounded-full bg-gradient-to-tr from-gold via-cherry to-gold p-[2px] transition-transform duration-500 group-hover:rotate-180">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white">
                <Image src="/logo/logo.png" alt="" width={28} height={28} className="h-7 w-7 object-contain" />
              </span>
            </span>
            <span className="text-left">
              <span className="block text-sm font-semibold text-moonlight">@vylore.in</span>
              <span className="block text-xs text-moonlight/60">Vylore Jewellery</span>
            </span>
          </a>

          <h2 className="mt-6 font-serif text-4xl text-moonlight sm:text-5xl lg:text-6xl">
            Vylore on <span className="italic text-gold">Instagram.</span>
          </h2>
          <p className="mt-4 max-w-lg text-base text-moonlight/75">
            Sterling silver in motion — styled, filmed and worn. Tap a reel to watch it with sound.
          </p>
        </FadeIn>

        <InstagramReelGrid reels={reels} />

        <FadeIn delay={0.2} className="mt-10 flex justify-center lg:mt-4">
          <Button
            href={socialLinks.instagram}
            variant="inverse"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:bg-moonlight! hover:text-burgundy!"
          >
            <InstagramIcon className="h-5 w-5" />
            Follow @vylore.in
          </Button>
        </FadeIn>
      </Container>

      {/* Slow-moving brand words; .marquee-track scrolls the doubled list by -50%. */}
      <div aria-hidden="true" className="marquee-viewport mt-14 border-y border-white/10 py-5 lg:mt-20">
        <div className="marquee-track [animation-duration:40s]">
          {[...marqueeWords, ...marqueeWords, ...marqueeWords, ...marqueeWords].map((word, index) => (
            <span key={index} className="flex items-center whitespace-nowrap">
              <span className="px-6 font-serif text-3xl italic text-moonlight/25 sm:text-4xl">{word}</span>
              <span className="text-gold/60">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
