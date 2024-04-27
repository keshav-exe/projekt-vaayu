"use client";
import Link from "next/link";
import { Card, ContainerScroll } from "@/components/ui/container-scroll";
import Image from "next/image";
import { SparklesCore } from "@/components/ui/sparkles";
import { animate, easeInOut, motion } from "framer-motion";
import { useConvexAuth } from "convex/react";
import { SignInButton } from "@clerk/clerk-react";

export default function Home() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <>
      <div className="flex flex-col wrapper text-primary gap-3">
        <div className="h-[80vh] w-full bg-background flex flex-col items-center justify-center overflow-hidden rounded-md">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1,
              ease: [0.22, 0.5, 0.36, 1],
            }}
            className="md:text-7xl text-5xl lg:text-9xl font-bold text-center text-primary relative z-20"
          >
            Introducing Vaayu
          </motion.h1>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.25,
              duration: 1,
              ease: [0.22, 0.5, 0.36, 1],
            }}
            className="w-[40rem] h-40 relative"
          >
            {/* Gradients */}
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

            {/* Core component */}
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={1200}
              className="w-full h-full"
              particleColor="#FFFFFF"
            />

            {/* Radial Gradient to prevent sharp edges */}
            <div className="absolute inset-0 w-full h-full bg-background [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5, duration: 1, ease: [0.22, 0.5, 0.36, 1] }}
          >
            <p className="text-2xl md:text-4xl text-center mt-10">
              Let your thoughts soar.
            </p>
          </motion.div>
        </div>

        <div>
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            whileInView={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 0.5, 0.36, 1] }}
            viewport={{ margin: "-75px" }}
          >
            <ContainerScroll
              titleComponent={
                <>
                  <h1 className="text-5xl font-bold text-primary">
                    Vaayu Kosh
                    <br />
                    <span className="text-3xl md:text-7xl font-semibold mt-1 leading-none">
                      Your Personal Secure Vault.
                    </span>
                  </h1>
                </>
              }
            >
              <Image
                src={`/kosh_light.png`}
                alt="hero"
                height={720}
                width={1400}
                className="mx-auto dark:hidden rounded-2xl object-cover h-full object-left-top"
                draggable={false}
              />
              <Image
                src={`/kosh_dark.png`}
                alt="hero"
                height={720}
                width={1400}
                className="mx-auto hidden dark:block rounded-2xl object-cover h-full object-left-top"
                draggable={false}
              />
            </ContainerScroll>
            <p className="text-xl md:text-2xl text-center">
              With VaayuKosh, you can confidently safeguard your thoughts,
              ideas, and personal writings with top-notch security measures.
              Your notes are accessible only to you.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.5,
              ease: easeInOut,
            }}
            viewport={{ margin: "-75px" }}
            className="flex flex-center py-6 gap-4 sticky bottom-0"
          >
            {isAuthenticated ? (
              <Link
                href="/kosh"
                className="rounded-full p-4 bg-primary/10 border shadow-md border-primary/5 hover:border-primary/20 transition-all duration-300 text-xl backdrop-blur-lg"
              >
                Explore Vaayu Kosh
              </Link>
            ) : (
              <div className="rounded-full p-4 bg-primary/10 border shadow-md border-primary/5 hover:border-primary/20 transition-all duration-300 text-xl backdrop-blur-lg">
                <SignInButton redirectUrl="/kosh">
                  Explore Vaayu Kosh
                </SignInButton>
              </div>
            )}
          </motion.div>
        </div>
        <div>
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            whileInView={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 0.5, 0.36, 1] }}
            viewport={{ margin: "-75px" }}
          >
            <ContainerScroll
              titleComponent={
                <>
                  <h1 className="text-5xl font-bold text-primary">
                    Vaayu Mandal
                    <br />
                    <span className="text-3xl md:text-7xl  font-semibold mt-1 leading-none">
                      Connect. Create. Collaborate.
                    </span>
                  </h1>
                </>
              }
            >
              <Image
                src={`/mandal_light.png`}
                alt="hero"
                height={720}
                width={1400}
                className="mx-auto dark:hidden rounded-2xl object-cover h-full object-left-top"
                draggable={false}
              />
              <Image
                src={`/mandal_dark.png`}
                alt="hero"
                height={720}
                width={1400}
                className="mx-auto hidden dark:block rounded-2xl object-cover h-full object-left-top"
                draggable={false}
              />
            </ContainerScroll>
          </motion.div>
          <p className="text-xl md:text-2xl text-center">
            Feel knowledge and ideas soar in VaayuMandal. It is the bustling
            heart of Projekt Vaayu, where writers, thinkers, and creators
            converge to exchange ideas.
          </p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.5,
              ease: easeInOut,
            }}
            className="flex flex-center py-6 gap-4 sticky bottom-0"
          >
            <Link
              href="/mandal"
              className="rounded-full p-4 bg-primary/10 border shadow-md border-primary/5 hover:border-primary/20 transition-all duration-300 text-xl backdrop-blur-lg"
            >
              Explore Vaayu Mandal
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}
