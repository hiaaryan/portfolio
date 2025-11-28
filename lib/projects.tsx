import { Athletico } from "@/components/projects/athletico";
import { Flotek } from "@/components/projects/flotek";
import { ArrowBendDownRightIcon } from "@phosphor-icons/react";
import Image from "next/image";

export const projects = [
  {
    id: 1,
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
  {
    id: 3,
    name: "athletico",
    logo: "/athletico.png",
    description: "Athlete Wellness",
    type: "Brand Design",
    content: <Athletico />,
    website: "https://aaryan.design",
    showcase: true,
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
    <div className="flex flex-col gap-3">
      <div className="hover:bg-foreground/5 -mx-3 flex items-start justify-between gap-4 rounded-2xl bg-transparent px-3 py-2.5 transition-all duration-200">
        <div className="flex items-center gap-4">
          <Image
            src={project.logo}
            alt={project.name}
            className="mb-0.5 inline-flex rounded-xl shadow-lg shadow-black/10"
            width={32}
            height={32}
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
        <div className="mb-3 flex items-center gap-5 pl-3.5">
          <ArrowBendDownRightIcon className="opacity-50" size={16} />
          {project.sponsor}
        </div>
      )}
    </div>
  );
}
