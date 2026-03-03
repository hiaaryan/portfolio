"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { GithubIcon, NewTwitterIcon } from "@hugeicons-pro/core-stroke-rounded";
import { ArrowRightIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Badge } from "@/components/ui/badge";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { brands, oss, Project } from "@/lib/projects";

export default function Page() {
	const [openBrand, setOpenBrand] = React.useState(false);
	const [selectedBrand, setSelectedBrand] = React.useState(brands[0] ?? null);
	return (
		<div className="mx-auto flex max-w-xl flex-col justify-center min-h-screen py-12 gap-16 p-6 font-sans md:px-0">
			<div className="flex flex-col gap-2">
				<div className="flex flex-col">
					<h1 className="w-fit eading-tight font-semibold">Aaryan</h1>
					<p className="w-fit opacity-50">Design Engineer</p>
				</div>
			</div>

			<p className="text-foreground/50 w-full text-base text-pretty lg:text-base">
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
									Emergente Labs
								</div>
								<p className="text-foreground/50 text-xs">
									Emergente Labs is a commerce company that builds tools for
									digital sellers.
								</p>
							</div>
						</div>
					</TooltipContent>
				</Tooltip>
				as a design engineer, building tools for digital sellers. I am also
				working on my open source project
				<Tooltip>
					<TooltipTrigger asChild>
						<Image
							src="/sileo.png"
							alt="sileo"
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
										src="/sileo.png"
										alt="sileo"
										className="mr-2 mb-0.5 inline-flex rounded-lg"
										width={22}
										height={22}
									/>
									Sileo
								</div>
								<p className="text-foreground/50 text-xs">
									Sileo is an opinionated physics based toast library for React.
									Beautiful by default.
								</p>
							</div>
						</div>
					</TooltipContent>
				</Tooltip>
				which is an opinionated physics based toast library.
			</p>
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
			<div className="flex flex-col gap-5.5">
				<h1 className="w-fit leading-tight font-semibold">Open Source</h1>
				<div className="flex flex-col gap-1 lg:gap-2">
					{oss.map((project) => (
						<Link
							href={project.website}
							key={project.id}
							target="_blank"
							rel="noopener noreferrer"
						>
							<Project project={project} />
						</Link>
					))}
				</div>
			</div>
			<div className="flex flex-col gap-5.5">
				<h1 className="w-fit leading-tight font-semibold">Brand Work</h1>
				<Drawer open={openBrand} onOpenChange={setOpenBrand}>
					<div className="flex flex-col gap-1 lg:gap-2">
						{brands.map((brand) => (
							<DrawerTrigger
								key={brand.id}
								onClick={() => setSelectedBrand(brand)}
							>
								<Project project={brand} />
							</DrawerTrigger>
						))}
					</div>
					{selectedBrand && (
						<DrawerContent className="min-h-[95%] justify-between gap-4 font-sans lg:max-w-[75%]">
							<div className="mx-auto flex w-[85%] items-center text-sm">
								<Image
									src={selectedBrand.logo}
									alt={selectedBrand.name}
									className="mb-0.5 inline-flex rounded-xl shadow-lg shadow-black/10"
									width={36}
									height={36}
								/>
								<DrawerHeader className="gap-0 text-left">
									<DrawerTitle className="w-fit leading-tight font-semibold">
										{selectedBrand.name}
									</DrawerTitle>
									<DrawerDescription className="flex w-fit items-center">
										<span className="w-fit opacity-50">
											{selectedBrand.description}
										</span>
										<Badge className="scale-90">{selectedBrand.type}</Badge>
									</DrawerDescription>
								</DrawerHeader>
							</div>
							<ScrollArea
								className="w-full [&>[data-radix-scroll-area-viewport]]:max-h-[calc(100vh-200px)]"
								type="hover"
							>
								<div className="mx-auto mb-16 flex max-w-[85%] flex-col">
									<div className="flex w-full flex-col gap-8 lg:gap-10">
										{selectedBrand.content}
									</div>
								</div>
							</ScrollArea>
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
