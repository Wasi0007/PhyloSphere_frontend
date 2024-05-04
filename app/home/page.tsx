'use client';
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link';
import { error } from 'console';



function page() {
  return (
    <main className="p-6">
      <section className=" flex-col items-center text-center gap-8 animate-fade-in-up-to-bottom"> 

        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Discover a World of Phylogenetic Exploration
        </h1>
        <p className="text-2xl leading-7 mt-10 ml-20 mr-20">
          Welcome to our home page, your gateway to a vast array of phylogenetic tools and resources. 
          Whether you're a seasoned researcher or just beginning your journey into evolutionary analysis, 
          our platform offers everything you need to delve into the intricate world of phylogenetics. 
          From transforming NWK files into insightful trees to analyzing relationships with advanced algorithms like Parafit and PACo, 
          our platform empowers you to explore, discover, and innovate. Join us as we unlock the mysteries of evolutionary biology and embark on a journey of discovery together.
        </p>
      </section>

      
      {/* <section className='mt-12 flex flex-wrap py-10 px-40 lg:grid-cols-4 md:grid md:grid-cols-2 sm:grid sm:grid-cols-1 gap-4 animate-fade-in-bottom-to-up'>
      </section> */}

      <section className='p-0 m-0'>
        <style jsx>{`

            .grid {
              display: grid;
              grid-template-columns: repeat(6, 1fr);
              flex: 1 1 auto;
              counter-reset: grid;
            }
            
            .item {
                display: flex;
                grid-column: span 2;

                &:last-child:nth-child(3n - 1) {
                  grid-column-end: -2;
                }
                
                &:nth-last-child(2):nth-child(3n + 1) {
                  grid-column-end: 4;
                }
              
                /* Dealing with single orphan */
                &:last-child:nth-child(3n - 2) {
                  grid-column-end: 5;
                }
            }
            
        `}</style>


        <div className="grid grid--1 mt-12 py-10 px-40 gap-4 animate-fade-in-bottom-to-up">

            <div className="item">
              <Card className='max-w-300 max-h-100 overflow-hidden transition ease-in-out hover:-translate-y-1 hover:scale-105'>
                <Link href="/tree">
                  <CardHeader>
                    <CardTitle>Tree Digram</CardTitle>
                    <CardDescription>Create You Own Tree</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Using the nwk format turn your sequence into tree</p>
                  </CardContent>
                </Link>
              </Card>
            </div>


            <div className="item">
              <Card className='max-w-300 max-h-100 overflow-hidden transition ease-in-out hover:-translate-y-1 hover:scale-105'>
                <Link href="/tanglegram">
                    <CardHeader>
                      <CardTitle>Tanglegram</CardTitle>
                      <CardDescription>Create You Own Tanglegram</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Using Host and Parasite sequences create tanglegram</p>
                    </CardContent>
                </Link>
              </Card>
            </div>   
            
        </div>
      </section>
    </main>
  )
}

export default page