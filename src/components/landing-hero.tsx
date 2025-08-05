import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function LandingHero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_650px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-4">
              <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Build, Code, Innovate with LEGO SPIKE Prime
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Unlock the world of robotics and programming. Our interactive guides make learning with LEGO® Education SPIKE™ Prime simple and fun.
              </p>
            </div>
            <Button asChild size="lg" className="w-fit bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/hub">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          <Image
            src="/models/mainImage.png"
            alt="LEGO SPIKE Prime Robot"
            width={650}
            height={650}
            className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
            data-ai-hint="lego robotics"
          />
        </div>
      </div>
    </section>
  );
}
