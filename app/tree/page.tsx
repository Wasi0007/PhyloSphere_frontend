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

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
 
type Status = {
  value: string
  label: string
}
 
const statuses: Status[] = [
  {
    value: "default",
    label: "Default",
  },
  {
    value: "fan",
    label: "Fan",
  },
  {
    value: "radial",
    label: "Radial",
  }
]


export default function page() {
  const [hostFile, setHostFile] = useState<File | null>(null);
  const [base64, setBase64] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = React.useState(false)
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
    null
  )



  const handleHostFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
          setHostFile(file);
          console.log(hostFile);
      }
  };
  const handleDownload = () => {
    if(base64){
      const downloadLink = document.createElement('a');
      downloadLink.href = `data:image/png;base64,${base64}`;
      downloadLink.download = 'Tree Image.png';
      downloadLink.click();
    }
  };

  const handleSubmit = () => {
    if (hostFile && selectedStatus) {
        setLoading(true);
        const formData = new FormData();
        formData.append('host_file', hostFile);
        formData.append('selected_status', selectedStatus.value);

        fetch('http://127.0.0.1:8000/api/tree/', {
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
            console.log(data.Tree_png); 
            setLoading(false);
            setBase64(data.Tree_png);
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
    <main className="px-10 py-5 grid lg:grid-cols-2 md:grid-cols-1 gap-16">

        <section className="py-6 flex flex-col items-center text-center gap-8 animate-fade-in-left-to-right">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Tree</h1>

          <p className="text-2xl leading-7 [&:not(:first-child)]:mt-6">
            This function helps you create your own Tree using a R script.
          </p>
          <p className="text-2xl leading-7 [&:not(:first-child)]:mt-6">
            To create your own Tree just insert the host files as (.nwk) format. 
             For more clarification check the demo file below. 
          </p>
          <p className="text-xl leading-7 [&:not(:first-child)]:mt-6 underline">
             <a href="/Tree-demo.rar" download>
                Tree Demo
              </a>
          </p>

          <div className="flex flex-col h-full items-center justify-center gap-1.5">
            <Label htmlFor="file">Host File (.nwk)</Label>
            <Input id="hostFileInput" type="file" accept='.nwk' onChange={handleHostFileChange}/>
          </div>

          <div className="flex items-center space-x-4">
            <p className="text-sm text-muted-foreground">Tree Type</p>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[150px] justify-start">
                  {selectedStatus ? <>{selectedStatus.label}</> : <>+ Set type</>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0" side="right" align="start">
                <Command>
                  <CommandInput placeholder="Change type..." />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup>
                      {statuses.map((status) => (
                        <CommandItem
                          key={status.value}
                          value={status.value}
                          onSelect={(value) => {
                            setSelectedStatus(
                              statuses.find((priority) => priority.value === value) ||
                                null
                            )
                            setOpen(false)
                          }}
                        >
                          {status.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex h-full items-center justify-center p-6">
            <Button onClick={handleSubmit} disabled={!hostFile || !selectedStatus} >Submit</Button>
          </div>
        </section>
    
      
      <section className="py-6 flex flex-col items-center gap-8 border-2 rounded-md animate-fade-in-right-to-left">
        <div className="flex h-[600px] w-[700px] items-center justify-center">
          {loading ? ( 
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          ) : (
            base64 !== "-1" ? (
              <AspectRatio ratio={16 / 9}>
                <img src={`data:image/png;base64,${base64}`} alt="Tree Image" className="rounded-md object-cover"/>
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
