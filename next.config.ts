import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
		/* These ship a single barrel entry (core-stroke-rounded alone re-exports
		   4,563 icon modules), so importing a handful of names pulls the whole
		   set. Next rewrites them to direct imports at build time. */
		optimizePackageImports: [
			"@hugeicons-pro/core-stroke-rounded",
			"@hugeicons/react",
			"radix-ui",
		],
	},
};

export default nextConfig;
