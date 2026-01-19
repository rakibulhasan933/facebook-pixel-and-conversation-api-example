"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";
import * as pixel from "@/lib/fpixel";


const FacebookPixel = () => {
    const [loaded, setLoaded] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        if (!loaded) return;
        const pageNames: Record<string, string> = {
            "/": "HomePage",
            "/contact": "ContactPage",
        }

        const pageName = pageNames[pathname] || pathname.slice(1).replace(/[/-]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()) || "UnnamedPage";

        pixel.pageview({ page: pageName });
        console.log(`[v0] Facebook Pixel pageview tracked: ${pageName} (${pathname})`);
    }, [pathname, loaded]);

    return (
        <div>
            <Script
                id="fb-pixel"
                src="/scripts/pixel.js"
                strategy="afterInteractive"
                onLoad={() => setLoaded(true)}
                data-pixel-id={pixel.FB_PIXEL_ID}
            />
        </div>
    );
};

export default FacebookPixel;