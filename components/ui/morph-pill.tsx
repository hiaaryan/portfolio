"use client";

import { InformationCircleIcon } from "@hugeicons-pro/core-stroke-rounded";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion } from "motion/react";
import Image from "next/image";
import React from "react";
import { createPortal } from "react-dom";
import { haptic } from "@/lib/haptic";
import { cn } from "@/lib/utils";

const CARD_WIDTH = 288;
const GUTTER = 16;
/* Where the pill sits down the card's height: 0.5 would centre it, a quarter
   puts it nearer the top so the card opens mostly downward. */
const ANCHOR_Y = 0.25;
/* Measured: the cards land within ~2px of this, close enough to anchor
   against without waiting for a real measurement. */
const CARD_HEIGHT_ESTIMATE = 131;
/* Slack around the card so small cursor jitter does not dismiss it. */
const HOVER_GRACE = 24;
/* Half the pill's height: the same look as a full round, but a value that
   interpolates visibly instead of staying clamped for most of the morph. */
const PILL_RADIUS = 12;
const CARD_RADIUS = 24;

/* Smooth ease-out: fast start, long settle, no overshoot. */
const EASE_OUT = [0.32, 0.72, 0, 1] as const;

const morph = {
	type: "tween",
	duration: 0.46,
	ease: EASE_OUT,
} as const;

function MorphIcon({
	icon,
	layoutId,
	size,
	radius,
	className,
}: {
	icon: string;
	layoutId: string;
	size: number;
	radius: number;
	className?: string;
}) {
	return (
		<motion.span
			layoutId={`${layoutId}-icon`}
			transition={morph}
			style={{ width: size, height: size, borderRadius: radius }}
			className={cn("inline-flex shrink-0 overflow-hidden", className)}
		>
			<Image
				src={icon}
				alt=""
				className="h-full w-full object-cover"
				width={22}
				height={22}
			/>
		</motion.span>
	);
}

function clamp(value: number, min: number, max: number) {
	return Math.min(Math.max(value, min), max);
}

export function MorphPill({
	label,
	icon,
	title,
	description,
	href,
	className,
}: {
	label: string;
	icon: string;
	title?: string;
	description: string;
	href?: string;
	className?: string;
}) {
	const layoutId = React.useId();
	const [open, setOpen] = React.useState(false);
	const [mounted, setMounted] = React.useState(false);
	const [anchor, setAnchor] = React.useState({ top: 0, left: 0 });
	const triggerRef = React.useRef<HTMLButtonElement>(null);
	const cardRef = React.useRef<HTMLDivElement>(null);


	React.useEffect(() => setMounted(true), []);

	/* Return focus to the pill once it morphs back, but only for keyboard users:
	   focusing it after a hover-open would re-fire onFocus and reopen the card. */
	const openedByKeyboard = React.useRef(false);
	const wasOpen = React.useRef(false);
	React.useEffect(() => {
		if (wasOpen.current && !open && openedByKeyboard.current) {
			openedByKeyboard.current = false;
			triggerRef.current?.focus();
		}
		wasOpen.current = open;
	}, [open]);

	/* Primitives, so the effect does not resubscribe on every anchor object. */
	const { top: anchorTop, left: anchorLeft } = anchor;

	React.useEffect(() => {
		if (!open) return;
		const top = anchorTop;
		const left = anchorLeft;
		const onMove = (event: PointerEvent) => {
			if (event.pointerType !== "mouse") return;
			/* Derived from the anchor rather than measured: reading the card's box
			   here would force a layout on every pointer move, and mid-morph it is
			   still smaller than its resting size, which closes the card early. */
			const inside =
				event.clientX >= left - HOVER_GRACE &&
				event.clientX <= left + CARD_WIDTH + HOVER_GRACE &&
				event.clientY >= top - HOVER_GRACE &&
				event.clientY <= top + CARD_HEIGHT_ESTIMATE + HOVER_GRACE;
			if (!inside) setOpen(false);
		};
		/* Passive: the handler never calls preventDefault, so the browser does not
		   need to wait on it before scrolling. */
		window.addEventListener("pointermove", onMove, { passive: true });
		return () => window.removeEventListener("pointermove", onMove);
	}, [open, anchorTop, anchorLeft]);

	React.useEffect(() => {
		if (!open) return;
		const onDown = (event: PointerEvent) => {
			const target = event.target as Node | null;
			if (target && !cardRef.current?.contains(target)) setOpen(false);
		};
		document.addEventListener("pointerdown", onDown);
		return () => document.removeEventListener("pointerdown", onDown);
	}, [open]);

	React.useEffect(() => {
		if (!open) return;
		const onKey = (event: KeyboardEvent) => {
			if (event.key === "Escape") setOpen(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open]);

	function expand() {
		const rect = triggerRef.current?.getBoundingClientRect();
		if (!rect) return;
		/* The card keeps the pill's left edge, and its anchor point a quarter of
		   the way down meets the pill's midline. */
		setAnchor({
			top: clamp(
				rect.top + rect.height / 2 - CARD_HEIGHT_ESTIMATE * ANCHOR_Y,
				GUTTER,
				Math.max(GUTTER, window.innerHeight - CARD_HEIGHT_ESTIMATE - GUTTER),
			),
			left: clamp(
				rect.left,
				GUTTER,
				Math.max(GUTTER, window.innerWidth - CARD_WIDTH - GUTTER),
			),
		});
		everOpened.current = true;
		setOpen(true);
	}

	const everOpened = React.useRef(false);

	const pillClassName = cn(
		"mx-1.5 -my-2 inline-block px-2 py-0.5 align-baseline text-sm leading-5 font-medium text-foreground",
		className,
	);

	return (
		<>
			{open ? (
				/* Placeholder keeps the paragraph from reflowing while expanded. */
				<span aria-hidden className={cn(pillClassName, "invisible")}>
					<span className="mr-1.5 inline-block size-4 align-middle" />
					{label}
				</span>
			) : (
				<motion.button
					ref={triggerRef}
					type="button"
					layoutId={layoutId}
					aria-expanded={false}
					onPointerEnter={(event) => {
						if (event.pointerType === "mouse") expand();
					}}
					onFocus={(event) => {
						if (!event.target.matches(":focus-visible")) return;
						openedByKeyboard.current = true;
						expand();
					}}
					onClick={(event) => {
						/* Touch and pen have no hover, so a tap opens it. */
						if ((event.nativeEvent as PointerEvent).pointerType !== "mouse") {
							haptic();
							expand();
						}
					}}
					transition={morph}
					initial={
						everOpened.current ? { borderRadius: CARD_RADIUS } : false
					}
					animate={{ borderRadius: PILL_RADIUS }}
					className={cn(
						pillClassName,
						"cursor-pointer bg-foreground/5 dark:bg-foreground/7.5 transition-colors hover:bg-foreground/10",
					)}
				>
					<MorphIcon
						className="mr-1.5 -mt-0.5 align-middle"
						icon={icon}
						layoutId={layoutId}
						radius={6}
						size={16}
					/>
					<motion.span
						layout="position"
						layoutId={`${layoutId}-label`}
						transition={morph}
						initial={everOpened.current ? { opacity: 1 } : false}
						animate={{ opacity: 1 }}
						className="inline-block align-baseline whitespace-nowrap"
					>
						{label}
					</motion.span>
				</motion.button>
			)}

			{mounted &&
				createPortal(
					open && (
							<motion.div
								layoutId={layoutId}
								ref={cardRef}
								transition={morph}
								initial={{ borderRadius: PILL_RADIUS }}
								animate={{ borderRadius: CARD_RADIUS }}
								style={{
									top: anchor.top,
									left: anchor.left,
									width: CARD_WIDTH,
								}}
								className="group fixed z-50 cursor-pointer overflow-hidden bg-background p-4 font-sans"
							>
								{/* Tint over the opaque base, so the card reads as a surface
								    rather than letting the page show through it. */}
								<span className="pointer-events-none absolute inset-0 rounded-[inherit] bg-foreground/5 dark:bg-foreground/7.5" />
								<div
									className="relative space-y-1.5"
									style={{ width: CARD_WIDTH - 32 }}
								>
									<div className="flex items-center gap-2">
										<MorphIcon
											icon={icon}
											layoutId={layoutId}
											radius={8}
											size={22}
										/>
										<motion.span
											layout="position"
											layoutId={`${layoutId}-label`}
											transition={morph}
											initial={{ opacity: 0.5 }}
											animate={{ opacity: 1 }}
											className="text-sm font-semibold whitespace-nowrap"
										>
											{title ?? label}
										</motion.span>
									</div>
									<motion.p
										animate={{ opacity: 1, y: 0 }}
										initial={{ opacity: 0, y: 4 }}
										transition={{ duration: 0.32, delay: 0.08, ease: EASE_OUT }}
										className="text-xs text-foreground/50 mt-4"
									>
										{description}
									</motion.p>
									{href && (
										<motion.span
											animate={{ opacity: 1, y: 0 }}
											initial={{ opacity: 0, y: 4 }}
											transition={{
												duration: 0.32,
												delay: 0.12,
												ease: EASE_OUT,
											}}
											className="inline-flex items-center gap-1 text-[11px] font-medium text-foreground/50"
										>
											<HugeiconsIcon icon={InformationCircleIcon} size={11} />
											Click for information
										</motion.span>
									)}
								</div>
								{href && (
									<a
										aria-label={`${title ?? label} — open link`}
										className="absolute inset-0"
										href={href}
										rel="noopener noreferrer"
										target="_blank"
									/>
								)}
							</motion.div>
					),
					document.body,
				)}
		</>
	);
}
