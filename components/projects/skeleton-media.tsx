"use client";

import Image from "next/image";
import { useState } from "react";

type SkeletonProps =
	| { variant: "video"; src: string; type: string }
	| { variant: "image"; src: string; alt: string };

export function Skeleton(props: SkeletonProps) {
	const [loaded, setLoaded] = useState(false);

	return (
		<div className="relative w-full">
			<div
				className="absolute inset-0 animate-pulse bg-white/5 transition-opacity duration-500"
				style={{ opacity: loaded ? 0 : 1 }}
			/>
			{props.variant === "video" ? (
				<video
					className="w-full h-full object-cover rounded-2xl lg:rounded-4xl"
					style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.5s ease" }}
					autoPlay
					playsInline
					muted
					loop
					onLoadedData={() => setLoaded(true)}
				>
					<source src={props.src} type={props.type} />
				</video>
			) : (
				<Image
					src={props.src}
					width={3840}
					height={2160}
					className="w-full h-full object-cover rounded-2xl lg:rounded-4xl"
					style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.5s ease" }}
					alt={props.alt}
					onLoad={() => setLoaded(true)}
				/>
			)}
		</div>
	);
}
