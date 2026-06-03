"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Send } from "lucide-react";

export default function Home() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", instagram: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("https://rankforge.alanview.com/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer rf_2a2200a66c5f4dbb8c8eec94e735ef77fe3d935bfdff494081e6cdce2909ee3d",
        },
        body: JSON.stringify({
          schema: {
            name: "string",
            email: "string",
            phone: "string",
            instagram: "string",
          },
          data: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            instagram: formData.instagram,
          },
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: "Something went wrong" }));
        throw new Error(err.message || `Error ${res.status}`);
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", instagram: "" });
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err: any) {
      setError(err.message || "Failed to send. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: i * 0.12, ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number] },
    }),
  };

  return (
    <main className="min-h-screen bg-purple text-cream overflow-hidden">
      {/* Top editorial bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, ease: [0.215, 0.61, 0.355, 1] }}
        className="h-1.5 bg-orange origin-left"
      />

      {/* Thin rule */}
      <div className="w-full h-px bg-cream/10" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-12 lg:py-16">
        {/* Header row — editorial style */}
        <div className="flex items-center justify-between mb-16">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="w-44"
          >
            <Image
              src="/images/primary-logo.png"
              alt="The Bald Editor"
              width={176}
              height={66}
              className="w-full h-auto"
              priority
            />
          </motion.div>
          <motion.p
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-xs font-bold tracking-[0.3em] uppercase text-cream/40"
          >
            Video Editing Studio
          </motion.p>
        </div>

        {/* Main editorial grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left column — content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Issue/date stamp — editorial detail */}
            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-4 mb-8"
            >
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-orange">
                Now Accepting Clients
              </span>
              <div className="flex-1 h-px bg-cream/10" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-cream/30">
                2026
              </span>
            </motion.div>

            {/* Big headline — stacked, editorial */}
            <div className="space-y-0 mb-10">
              <motion.h1
                custom={3}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tight text-cream"
              >
                VIDEO
              </motion.h1>
              <motion.h1
                custom={4}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tight text-cream"
              >
                EDITING
              </motion.h1>
              <motion.div
                custom={5}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="inline-block bg-orange px-4 py-2 mt-2"
              >
                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tight text-white">
                  THAT HITS
                </h1>
              </motion.div>
              <motion.h1
                custom={6}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tight text-cream"
              >
                DIFFERENT.
              </motion.h1>
            </div>

            {/* Editorial pull quote style */}
            <motion.div
              custom={7}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="border-l-4 border-orange pl-6 mb-10"
            >
              <p className="text-lg sm:text-xl text-cream/60 font-medium leading-relaxed">
                For content creators, influencers, and brands who refuse to blend in.
              </p>
            </motion.div>

            {/* Thin rule */}
            <motion.div
              custom={8}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="w-full h-px bg-cream/10 mb-10"
            />

            {/* Contact form — editorial style */}
            <motion.div
              custom={9}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              {/* Form label */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px bg-cream/10" />
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-cream/30">
                  Inquiry Form
                </span>
                <div className="flex-1 h-px bg-cream/10" />
              </div>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name + Email row */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-bold tracking-[0.3em] uppercase text-cream/30 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        placeholder="Your name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-0 py-3 bg-transparent border-b border-cream/20 focus:border-orange focus:outline-none transition-colors text-cream placeholder:text-cream/25 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold tracking-[0.3em] uppercase text-cream/30 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-0 py-3 bg-transparent border-b border-cream/20 focus:border-orange focus:outline-none transition-colors text-cream placeholder:text-cream/25 font-medium"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-[10px] font-bold tracking-[0.3em] uppercase text-cream/30 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 234 567 890"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-0 py-3 bg-transparent border-b border-cream/20 focus:border-orange focus:outline-none transition-colors text-cream placeholder:text-cream/25 font-medium"
                    />
                  </div>

                  {/* Instagram */}
                  <div>
                    <label className="block text-[10px] font-bold tracking-[0.3em] uppercase text-cream/30 mb-2">
                      Instagram ID
                    </label>
                    <input
                      type="text"
                      placeholder="@yourhandle"
                      value={formData.instagram}
                      onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                      className="w-full px-0 py-3 bg-transparent border-b border-cream/20 focus:border-orange focus:outline-none transition-colors text-cream placeholder:text-cream/25 font-medium"
                    />
                  </div>

                  {/* Error */}
                  {error && (
                    <p className="text-sm text-red-400 font-medium">{error}</p>
                  )}

                  {/* CTA — editorial, sharp */}
                  <div className="pt-2">
                    <motion.button
                      type="submit"
                      disabled={submitting}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className="group flex items-center gap-4 bg-orange px-8 py-4 text-white font-black text-sm tracking-[0.15em] uppercase hover:bg-orange/80 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>{submitting ? "SENDING..." : "LET'S TALK"}</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-10 px-6 border border-orange"
                >
                  <p className="text-2xl font-black text-orange mb-1">MESSAGE SENT!</p>
                  <p className="text-cream/40 text-sm">I'll get back to you faster than a hard cut.</p>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Right column — mascot + visual */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            {/* Color block behind mascot */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
              className="absolute w-[300px] h-[300px] lg:w-[380px] lg:h-[380px] bg-orange/10 -z-10"
            />

            {/* Thin border frame */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute w-[280px] h-[280px] lg:w-[350px] lg:h-[350px] border border-cream/10 -z-10 -translate-x-4 -translate-y-4"
            />

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="relative"
            >
              <Image
                src="/images/mascot-1-white.png"
                alt="The Bald Editor mascot"
                width={350}
                height={350}
                className="w-[240px] sm:w-[280px] lg:w-[320px] h-auto"
                priority
              />
            </motion.div>
          </div>
        </div>

        {/* Video carousel section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
          className="mt-28 pt-14 border-t border-cream/10"
        >
          <div className="flex items-center gap-4 mb-12">
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-orange">
              Top Performing
            </span>
            <div className="flex-1 h-px bg-cream/10" />
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-cream/30">
              Most Views
            </span>
          </div>

          <div className="overflow-hidden -mx-6 sm:-mx-8 lg:-mx-12">
            <motion.div
              drag="x"
              dragConstraints={{ right: 0, left: -800 }}
              className="flex gap-6 px-6 sm:px-8 lg:px-12 cursor-grab active:cursor-grabbing"
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.215, 0.61, 0.355, 1] }}
                  className="min-w-[280px] sm:min-w-[320px] lg:min-w-[380px] flex-shrink-0"
                >
                  <div className="aspect-[9/16] w-full bg-cream/5 flex items-center justify-center text-cream/20 text-xs font-bold tracking-[0.2em] uppercase">
                    Video
                  </div>
                  <div className="pt-4 flex items-center justify-between">
                    <div className="h-3 w-24 bg-cream/5" />
                    <div className="h-3 w-20 bg-cream/5" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Testimonials section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
          className="mt-28 pt-14 border-t border-cream/10"
        >
          <div className="flex items-center gap-4 mb-12">
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-orange">
              Testimonials
            </span>
            <div className="flex-1 h-px bg-cream/10" />
          </div>

          <div className="grid sm:grid-cols-3 gap-6 lg:gap-8">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.215, 0.61, 0.355, 1] }}
                className="border border-cream/10 p-6 lg:p-8 flex flex-col"
              >
                <div className="aspect-square w-full bg-cream/5 mb-6 flex items-center justify-center text-cream/20 text-xs font-bold tracking-[0.2em] uppercase">
                  Photo
                </div>
                <div className="border-t border-cream/10 pt-4 space-y-2">
                  <div className="h-4 w-3/4 bg-cream/5" />
                  <div className="h-3 w-1/2 bg-cream/5" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom editorial bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-20 pt-8 border-t border-cream/10"
        >
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-cream/30">
              © 2026 The Bald Editor
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange" />
              <div className="w-2 h-2 bg-cream" />
              <div className="w-2 h-2 bg-black" />
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
