"use client";

import { AnimatePresence, motion } from "motion/react";
import { Skeleton } from "@/components/projects/skeleton-media";

const content = {
	cover: "/brands/flotek/Frame 1.webm",
	images: [
		"/brands/flotek/Frame 3.png",
		"/brands/flotek/Frame 4.png",
		"/brands/flotek/Frame 6.png",
		"/brands/flotek/Frame 5.png",
		"/brands/flotek/Frame 7.png",
		"/brands/flotek/Frame 8.png",
		"/brands/flotek/Frame 9.png",
		"/brands/flotek/Frame 10.png",
		"/brands/flotek/Frame 11.png",
		"/brands/flotek/Frame 12.png",
		"/brands/flotek/Frame 13.png",
		"/brands/flotek/Frame 14.png",
		"/brands/flotek/Frame 15.png",
	],
};

export function Flotek() {
	return (
		<AnimatePresence mode="wait">
			<motion.div
				animate={{
					opacity: 1,
					y: 0,
					filter: "blur(0px)",
				}}
				exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
				initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
				transition={{ duration: 1, ease: "easeOut", delay: 0.25 }}
			>
				<Skeleton variant="video" src={content.cover} type="video/webm" />
			</motion.div>

			{content.images.map((image) => (
				<motion.div
					key={image}
					animate={{
						opacity: 1,
						y: 0,
						filter: "blur(0px)",
					}}
					exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
					initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
					transition={{ duration: 1, ease: "easeOut", delay: 0.25 }}
				>
					<Skeleton variant="image" src={image} alt="flotek" />
				</motion.div>
			))}
		</AnimatePresence>
	);
}
