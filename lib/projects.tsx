import { Athletico } from "@/components/projects/athletico";
import { Flotek } from "@/components/projects/flotek";
import Image from "next/image";

export const projects = [
  {
    id: 1,
    name: "Wora",
    logo: "/wora.png",
    description: "Lossless Player",
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
    website: "https://github.com/playwora/flotek",
  },
  {
    id: 3,
    name: "athletico",
    logo: "/athletico.png",
    description: "Athlete Wellness",
    type: "Brand Design",
    content: <Athletico />,
    website: "https://github.com/playwora/athletico",
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
  };
}) {
  return (
    <div className="hover:bg-foreground/5 -mx-3 flex flex-col gap-4 rounded-2xl bg-transparent px-3 py-2.5 transition-all duration-200">
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
  );
}
