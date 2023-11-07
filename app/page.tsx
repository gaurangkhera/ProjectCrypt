import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

const page = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <Image className="mx-auto aspect-video overflow-hidden rounded-xl rotate-12 object-cover object-bottom sm:w-full lg:order-last" width={0} height={0} alt="hero" src="hero.svg" />
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Start your own cryptic hunt.
              </h1>
              <p className="max-w-[600px] text-zinc-500 md:text-xl dark:text-zinc-400">
                Host all your hunts in one place, while ensuring fair-play.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <form className="flex space-x-2">
                <Input className="max-w-lg flex-1" placeholder="Hunt name" type="text" />
                <Button type="submit">Start Now</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default page;