import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";
import { ConvexProviderClerk } from "@/components/providers/convex-providers";
import { Toaster } from "sonner";
import { Manrope } from "next/font/google";
import { ModalProvider } from "@/components/providers/modal-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { Suspense } from "react";
import Spinner from "@/components/spinner";
const manrope = Manrope({ subsets: ["latin"] });

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vaayu",
  description: "A clean asf & secure note sharing app.",
  other: {
    "twitter:image":
      "https://utfs.io/f/1066f37a-db10-4411-8c2d-276c1c868ad7-5nw9l7.png",
    "twitter:card": "summary_image_large",
    "twitter:url": "https://projekt-vaayu.vercel.app/",
    "twitter:domain": "projekt-vaayu.vercel.app",
    "twitter:title": "Projekt Vaayu",
    "twitter:description": "A clean asf & secure note sharing app.",

    "og:url": "https://projekt-vaayu.vercel.app/",
    "og:type": "website",
    "og:title": "Projekt Vaayu",
    "og:description": "A clean asf & secure note sharing app.",
    "og:image":
      "https://utfs.io/f/1066f37a-db10-4411-8c2d-276c1c868ad7-5nw9l7.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${manrope.className} h-full antialiased overflow-x-clip text-primary`}
      >
        <Suspense fallback={<Spinner />}>
          <ConvexProviderClerk>
            <EdgeStoreProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <Toaster position="bottom-right" richColors />
                <ModalProvider />
                {children}
              </ThemeProvider>
            </EdgeStoreProvider>
          </ConvexProviderClerk>
        </Suspense>
      </body>
    </html>
  );
}
