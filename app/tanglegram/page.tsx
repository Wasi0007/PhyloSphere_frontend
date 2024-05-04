"use client";
import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"


export default function page() {

  const [hostFile, setHostFile] = useState<File | null>(null);
  const [parasiteFile, setParasiteFile] = useState<File | null>(null);
  const [hpmatrixFile, sethpmatrixFile] = useState<File | null>(null);
  const [base64, setBase64] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);



  const handleHostFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
          setHostFile(file);
      }
  };
  const handleParasiteFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        setParasiteFile(file);
    }
  };
  const handleHpmatrixFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      sethpmatrixFile(file);
    }
  };

  
  const handleDownload = () => {
    if(base64){
      const downloadLink = document.createElement('a');
      downloadLink.href = `data:image/png;base64,${base64}`;
      downloadLink.download = 'Tanglegram Image.png';
      downloadLink.click();
    }
  };

  const handleSubmit = () => {
    if (hostFile && parasiteFile && hpmatrixFile) {
        setLoading(true);
        const formData = new FormData();
        formData.append('host_file', hostFile);
        formData.append('parasite_file', parasiteFile);
        formData.append('hpmatrix_file', hpmatrixFile);

        fetch('http://127.0.0.1:8000/api/tanglegram/', {
          method: 'POST',
          body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Server responded with error: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log("got picture")
            console.log(data.Tanglegram_png); 
            setLoading(false);
            setBase64(data.Tanglegram_png);
        })
        .catch(error => {
            setLoading(false);
            console.error('Error:', error);
            setBase64("-1");
        });
      
    } else {
        console.log('Please select both host and parasite files.');
    }
  };

  return (
    <main className="px-10 py-5 grid lg:grid-cols-2 md:grid-cols-1 gap-16 ">

        <section className="py-6 flex flex-col items-center text-center  gap-8 animate-fade-in-left-to-right">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Tanglegram</h1>

          <p className="text-2xl leading-7 [&:not(:first-child)]:mt-6">
            This function helps you create your own tanglegram using a R script. 5 iterations and 999 combinations are applied to create the tanglegram.
          </p>
          <p className="text-2xl leading-7 [&:not(:first-child)]:mt-6">
            To create your own Tanglegram just insert the host and parasite files as (.nwk) format and your hpmatrix as (.txt) format. 
            Make sure in the hpmatrix table the Host names are the row headers and the Parasite names are the column headers. For more clarification check the demo file below. 
          </p>

          <p className="text-xl leading-7 [&:not(:first-child)]:mt-6 underline">
             <a href="/Parafit-demo.rar" download>
                Parafit Demo
              </a>
          </p>
          
          <div className="flex flex-col h-full items-center justify-center gap-1.5">
            <Label htmlFor="file">Host File (.nwk)</Label>
            <Input id="hostFileInput" type="file" accept='.nwk' onChange={handleHostFileChange}/>
            <Label htmlFor="file">Parasite File (.nwk)</Label>
            <Input id="parasiteFileInput" type="file" accept='.nwk' onChange={handleParasiteFileChange}/>
            <Label htmlFor="file">HPmatrix File (.txt)</Label>
            <Input id="hpmatrixFileInput" type="file" accept='.txt' onChange={handleHpmatrixFileChange}/>
          </div>

          <div className="flex h-full items-center justify-center p-6">
            <Button onClick={handleSubmit} disabled={!hostFile || !parasiteFile || !hpmatrixFile} >Submit</Button>
          </div>
        </section>

      
      <section className="py-6 flex flex-col items-center gap-8 border-2 rounded-md animate-fade-in-right-to-left">
        <div className="flex h-[600px] w-[700px] items-center justify-center">
          {loading ? ( 
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          ) : (
            base64 !== "-1" ? (
              <AspectRatio ratio={16 / 9}>
                <img src={`data:image/png;base64,${base64}`} alt="Tanglegram Image" className="rounded-md object-cover"/>
              </AspectRatio>
            ) : (
              <img src="/400error.png" alt="400 Error" className="rounded-md object-cover"/>
            )
          )}
        </div>

        <Button onClick={handleDownload}>Download</Button>
      </section>
   
    </main>

  )
}
