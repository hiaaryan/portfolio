"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import {
  Timeline,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { jobs } from "@/lib/jobs";
import { Project, projects } from "@/lib/projects";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HugeiconsIcon } from "@hugeicons/react";
import { GithubIcon, NewTwitterIcon } from "@hugeicons-pro/core-stroke-rounded";

export default function Page() {
  const [open, setOpen] = React.useState(false);
  const [selectedProject, setSelectedProject] = React.useState(
    projects[0] ?? null,
  );
  return (
    <div className="mx-auto flex max-w-xl flex-col gap-16 p-6 font-sans md:px-0 md:py-20">
      <div className="flex flex-col gap-2">
        <Image
          src="/logo.png"
          alt="Aaryan"
          className="-ml-5 block aspect-square rounded-2xl dark:hidden"
          width={64}
          height={64}
        />
        <Image
          src="/logo [dark].png"
          alt="Aaryan"
          className="-ml-5 hidden aspect-square rounded-2xl dark:block"
          width={64}
          height={64}
        />
        <div className="flex flex-col">
          <h1 className="w-fit leading-tight font-semibold">Aaryan</h1>
          <p className="w-fit text-sm opacity-50">Design Engineer</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Link
          href="https://x.com/hiaaryan"
          target="_blank"
          rel="noopener noreferrer"
        >
          <HugeiconsIcon icon={NewTwitterIcon} size={15} strokeWidth={2.25} />
        </Link>
        <Link
          href="https://github.com/hiaaryan"
          target="_blank"
          rel="noopener noreferrer"
        >
          <HugeiconsIcon icon={GithubIcon} size={15} strokeWidth={2.25} />
        </Link>
      </div>
      <p className="text-foreground/50 w-full text-sm text-pretty lg:text-base">
        I currently work at
        <Tooltip>
          <TooltipTrigger asChild>
            <Image
              src="/sellhub.png"
              alt="sellhub"
              className="mx-2 mb-0.5 inline-flex rounded-lg"
              width={20}
              height={20}
            />
          </TooltipTrigger>
          <TooltipContent className="py-3 font-sans">
            <div className="space-y-2">
              <div className="space-y-1">
                <div className="items-center text-sm font-medium">
                  <Image
                    src="/sellhub.png"
                    alt="sellhub"
                    className="mr-2 mb-0.5 inline-flex rounded-lg"
                    width={22}
                    height={22}
                  />
                  Sellhub
                </div>
                <p className="text-foreground/50 text-xs">
                  Sellhub is an ecommerce platform that allows businesses to
                  sell digital products online.
                </p>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
        as a design engineer. I am presently also working on my open source
        project
        <Tooltip>
          <TooltipTrigger asChild>
            <Image
              src="/wora.png"
              alt="wora"
              className="mx-2 mb-0.5 inline-flex rounded-lg"
              width={20}
              height={20}
            />
          </TooltipTrigger>
          <TooltipContent className="py-3 font-sans">
            <div className="space-y-2">
              <div className="space-y-1">
                <div className="items-center text-sm font-medium">
                  <Image
                    src="/wora.png"
                    alt="wora"
                    className="mr-2 mb-0.5 inline-flex rounded-lg"
                    width={22}
                    height={22}
                  />
                  Wora
                </div>
                <p className="text-foreground/50 text-xs">
                  Wora is a lossless audio player and music client built with
                  tauri and nextjs.
                </p>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
        which is a lossless audio player built with tauri and nextjs.{" "}
        {Array.from({ length: 2 }, (_, i) => (
          <br className="block md:hidden" key={i} />
        ))}
        Good design over functionality is my rule of thumb and it helps me craft
        simple, feel good experiences.
      </p>
      <div className="flex flex-col gap-8">
        <h1 className="w-fit leading-tight font-semibold">Work</h1>
        {jobs.map((job) => {
          return (
            <div className="flex flex-col gap-4" key={job.id}>
              <div className="flex items-center gap-4">
                <Image
                  src={job.logo}
                  alt={job.company}
                  className="mb-0.5 inline-flex rounded-xl shadow-lg shadow-black/10"
                  width={32}
                  height={32}
                />
                <div className="flex flex-col">
                  <Link
                    href={job.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-fit text-sm leading-tight font-semibold"
                  >
                    {job.company}
                  </Link>
                  <p className="w-fit text-sm opacity-50">{job.location}</p>
                </div>
              </div>
              <Timeline className="ml-2" defaultValue={2}>
                {job.positions.map((item) => (
                  <TimelineItem key={item.id} step={item.id}>
                    <TimelineHeader>
                      <TimelineSeparator />
                      <TimelineTitle className="w-fit">
                        {item.title}
                        <Badge className="scale-90">{item.level}</Badge>
                      </TimelineTitle>
                      <TimelineDate>
                        {item.date} • {item.remote ? "Remote" : "Onsite"}
                      </TimelineDate>
                      <TimelineIndicator className="scale-30" />
                    </TimelineHeader>
                  </TimelineItem>
                ))}
              </Timeline>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col gap-3.5">
        <h1 className="w-fit leading-tight font-semibold">Projects</h1>
        <Drawer open={open} onOpenChange={setOpen}>
          {projects.map((project) => {
            return project.showcase ? (
              <DrawerTrigger
                key={project.id}
                onClick={() => setSelectedProject(project)}
              >
                <Project project={project} />
              </DrawerTrigger>
            ) : (
              <Link
                href={project.website}
                key={project.id}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Project project={project} />
              </Link>
            );
          })}
          {selectedProject && (
            <DrawerContent className="min-h-[95%] justify-between gap-4 font-sans lg:max-w-[75%]">
              <div className="mx-auto flex w-[85%] items-center text-sm">
                <Image
                  src={selectedProject.logo}
                  alt={selectedProject.name}
                  className="mb-0.5 inline-flex rounded-xl shadow-lg shadow-black/10"
                  width={40}
                  height={40}
                />
                <DrawerHeader className="gap-0 text-left">
                  <DrawerTitle className="w-fit text-sm leading-tight font-semibold">
                    {selectedProject.name}
                  </DrawerTitle>
                  <DrawerDescription className="flex w-fit items-center text-xs">
                    <span className="w-fit text-sm opacity-50">
                      {selectedProject.description}
                    </span>
                    <Badge className="scale-90">{selectedProject.type}</Badge>
                  </DrawerDescription>
                </DrawerHeader>
              </div>
              <ScrollArea
                className="w-full [&>[data-radix-scroll-area-viewport]]:max-h-[calc(100vh-200px)]"
                type="hover"
              >
                <div className="mx-auto mb-16 flex max-w-[85%] flex-col">
                  <div className="flex w-full flex-col gap-8 lg:gap-10">
                    {selectedProject.content}
                  </div>
                </div>
              </ScrollArea>
              {/*<DrawerFooter className="pt-2">
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>*/}
            </DrawerContent>
          )}
        </Drawer>
      </div>
      <div className="flex flex-col text-sm opacity-50">
        P.S. I don&apos;t write blogs.{" "}
        <p className="flex items-center gap-2">
          © 2025 <ArrowRightIcon className="mb-0.5" /> Aaryan (blurpyx).
        </p>
      </div>
    </div>
  );
}
