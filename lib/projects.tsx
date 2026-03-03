import { ArrowBendDownRightIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { Athletico } from "@/components/projects/athletico";
import { Flotek } from "@/components/projects/flotek";

export const oss = [
	{
		id: 1,
		name: "Sileo",
		logo: "/sileo.png",
		description: "Toast Library",
		type: "Music Player",
		website: "https://github.com/hiaaryan/sileo",
		showcase: false,
		content: false,
	},
	{
		id: 2,
		name: "Wora",
		logo: "/wora.png",
		description: "Lossless Player",
		sponsor: (
			<Image
				alt="Vercel OSS Program"
				className="opacity-80 dark:invert"
				src="/program-badge.svg"
				width={180}
				height={100}
			/>
		),
		type: "Music Player",
		website: "https://github.com/playwora/wora",
		showcase: false,
		content: false,
	},
];

export const brands = [
	{
		id: 1,
		name: "athletico",
		logo: "/athletico.png",
		description: "Athlete Wellness",
		type: "Brand Design",
		content: <Athletico />,
		website: "https://aaryan.design",
		showcase: true,
	},
	{
		id: 2,
		name: "FLOTEK",
		logo: "/flotek.png",
		description: "HydroTech Power",
		type: "Brand Design",
		content: <Flotek />,
		showcase: true,
		website: "https://aaryan.design",
	},
];

export function Project({
	project,
}: {
	project: {
		id: number;
		name: string;
		logo: string;
		description: string;
		type: string;
		content?: React.ReactNode;
		website?: string;
		sponsor?: React.ReactNode;
		stats?: string;
	};
}) {
	return (
		<div className="flex flex-col gap-3 group">
			<div className="hover:bg-foreground/5 -mx-3 flex items-start justify-between gap-4 rounded-2xl bg-transparent px-3 py-2.5 transition-all duration-200">
				<div className="flex items-center gap-4">
					<Image
						src={project.logo}
						alt={project.name}
						className="mb-0.5 inline-flex rounded-xl shadow-lg shadow-black/10"
						width={34}
						height={34}
					/>
					<div className="flex flex-col">
						<h1 className="w-fit text-sm leading-tight font-semibold">
							{project.name}
						</h1>
						<p className="w-fit text-sm opacity-50">{project.description}</p>
					</div>
				</div>
			</div>
			{project.sponsor && (
				<div className="flex items-center gap-5 py-2 pb-3 pl-3.5">
					<ArrowBendDownRightIcon className="opacity-50" size={16} />
					{project.sponsor}
				</div>
			)}
		</div>
	);
}
