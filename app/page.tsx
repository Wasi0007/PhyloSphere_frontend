
import dynamic from 'next/dynamic';
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from 'next/link';
import { useEffect, useState } from 'react';
const Scene = dynamic(() => import("@/components/Scene"), {
  ssr: true
});

export default function Home() {


  return (
    <main className="flex h-screen">
      <section className="ml-20 mt-20 py-24 px-12 flex flex-col items-center text-center gap-8 w-3/5" > 

        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl animate-fade-in-left-to-right">
          Revolutionize Your Phylogenetic Research
        </h1>
        <p className="text-2xl leading-7 [&:not(:first-child)]:mt-6 animate-fade-in-bottom-to-up">
          Step into the future of evolutionary analysis with our comprehensive platform. 
          Uncover hidden insights as you effortlessly convert NWK files into stunning phylogenetic trees, 
          dissect intricate relationships with advanced Parafit and PACo algorithms, and explore a wealth of additional tools designed to streamline your research process. 
        </p>
        <p className="text-2xl leading-7 [&:not(:first-child)]:mt-6 animate-fade-in-bottom-to-up">
          Join us at the forefront of innovation and unlock the full potential of your phylogenetic studies.
        </p>

        <Link href={'/home'} legacyBehavior passHref >
          <Button variant="default" size="lg" className="h-14 font-bold text-2xl animate-fade-in-left-to-right mt-6">
            Try Now
          </Button>

        </Link>
        
      </section>
      <div className={`w-2/5 px-5 animate-fade-in-right-to-left`} > 
          <Scene />
      </div>

    </main>
  );
}
