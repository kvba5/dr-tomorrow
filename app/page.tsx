import DeltaruneTitle from "@/public/deltarune.webp"

import Image from "next/image";
import Progress from "@/components/progress";
import Footer from "@/components/footer";

export const experimental_ppr = true

export default function Home() {
  return <div className="py-midscreen mx-4 flex flex-col gap-20 text-center w-full relative max-w-3xl left-1/2 -translate-x-1/2">
    <header className="flex flex-col items-center">
      <Image height={80} alt="Deltarune Title" src={DeltaruneTitle} priority={true} draggable={false} />
      <h1 className="mt-3">"DELTARUNE TOMORROW"</h1>
    </header>
    <div className="flex flex-col gap-5 place-items-center mb-midscreen">
      <Progress />
      <span>
        Here's the frame that show a <span className="text-red-500">lot</span> of squares.
        It gets filled up by a little amount every time the release of <span className="text-utyellow">Chapter 3 & 4</span> is closer!
        Have fun!
      </span>
    </div>
    <div className="flex flex-col items-center gap-3 *:w-full">
      <h2>Chapter 3 & 4 Trailer!</h2>
      <iframe loading="lazy" className="aspect-video box-content border-2 border-white" src="//www.youtube-nocookie.com/embed/yDzgiGdekas?controls=0&disablekb=1&color=white&cc_load_policy=0&iv_load_policy=3&playsinline=1&rel=0" allowFullScreen={false}></iframe>
      <iframe loading="lazy" height={190} src="https://store.steampowered.com/widget/1671210/"></iframe>
    </div>
    <Footer />
  </div>;
}
