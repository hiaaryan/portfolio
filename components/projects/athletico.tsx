import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";

const content = {
  cover: "/brands/athletico/Frame 1.mp4",
  images: [
    "/brands/athletico/Moodboard.png",
    "/brands/athletico/Frame 12.png",
    "/brands/athletico/Frame 2.gif",
    "/brands/athletico/Frame 9.png",
    "/brands/athletico/Frame 1.png",
    "/brands/athletico/Frame 4.png",
    "/brands/athletico/Frame 5.png",
    "/brands/athletico/Frame 13.png",
    "/brands/athletico/Frame 6.png",
    "/brands/athletico/Frame 8.png",
    "/brands/athletico/Frame 7.png",
    "/brands/athletico/Frame 10.png",
    "/brands/athletico/Frame 15.png",
  ],
};

export function Athletico() {
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
        className="relative w-full overflow-hidden rounded-2xl"
      >
        <video className="w-full" autoPlay playsInline muted loop>
          <source src={content.cover} type="video/mp4" />
        </video>
      </motion.div>

      {content.images.map((image, index) => (
        <motion.div
          key={index}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
          initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.25 }}
          className="relative w-full overflow-hidden rounded-2xl"
        >
          <Image
            src={image}
            fill
            className="!static h-full w-full"
            alt="athletico"
          />
        </motion.div>
      ))}
    </AnimatePresence>
  );
}
