"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
	ArrowRight02Icon,
	GithubIcon,
	Mail01Icon,
	NewTwitterIcon,
} from "@hugeicons-pro/core-stroke-rounded";
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
import { MorphPill } from "@/components/ui/morph-pill";
import { haptic } from "@/lib/haptic";
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
				<span className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3 py-0.5 text-xs leading-5 font-semibold text-background dark:bg-foreground">
					<span className="relative flex size-1.5">
						<span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500" />
						<span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
					</span>
					Accepting Remote Contracts
				</span>
				<Link aria-label="Email" href="mailto:hi.aaryankapoor@gmail.com">
					<HugeiconsIcon icon={Mail01Icon} size={15} strokeWidth={2.25} />
				</Link>
			</div>
			<p className="text-foreground/50 scale-90 lg:scale-100 origin-left w-full text-pretty">
				I currently work at
				<MorphPill
					description="Emergente Labs is a commerce company that builds tools for digital sellers."
					href="https://emergentelabs.com"
					icon="/sellhub.png"
					label="Emergente Labs"
				/>
				as a design engineer, building tools for digital sellers.<br/><br/> Outside of
				that, I mostly work on shipping oss
				<MorphPill
					description="sileo is an opinionated physics based toast library for React. Beautiful by default."
					href="https://github.com/hiaaryan/sileo"
					icon="/sileo.png"
					label="sileo"
				/>
				which is an opinionated physics based toast library for React that stays
				beautiful by default, and
				<MorphPill
					className="mr-0"
					description="wora is an open source lossless music player, backed by the Vercel OSS Program."
					href="https://github.com/playwora/wora"
					icon="/wora.png"
					label="wora"
				/> which is a lossless music player.
			</p>
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
								onClick={() => {
									setSelectedBrand(brand);
									haptic();
								}}
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
				<p className="flex items-center gap-2">
					© 2025 <HugeiconsIcon className="mb-0.5" icon={ArrowRight02Icon} size={14} strokeWidth={2} /> Aaryan (blurpyx).
				</p>
			</div>
		</div>
	);
}
