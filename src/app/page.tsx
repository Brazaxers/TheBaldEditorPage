"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Send } from "lucide-react";
import { Agentation } from "agentation";

export default function Home() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", instagram: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const reelRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (dir: "left" | "right", ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return;
    const cardWidth = ref.current.firstElementChild?.clientWidth || 320;
    const gap = 24;
    ref.current.scrollBy({ left: dir === "right" ? cardWidth + gap : -(cardWidth + gap), behavior: "smooth" });
  };

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
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.7 },
    }),
  };

  return (
    <main className="min-h-screen bg-black text-cream selection:bg-orange/30">
      <div className="relative px-6 sm:px-8 lg:px-12 py-12 max-w-7xl mx-auto">
        {/* Logo + badge */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-4 mb-20"
        >
          <motion.div
            custom={1}
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
        </motion.div>

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
              className="mb-8"
            >
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-orange">
                3/10 slots left!
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
                <motion.h1
                  custom={5}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tight text-white animate-[shake_0.5s_infinite]"
                >
                  THAT HITS.
                </motion.h1>
              </motion.div>
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
                For content creators and brands who refuse to blend in.
              </p>
            </motion.div>

            {/* Contact form — editorial style */}
            <motion.div
              custom={9}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              {/* Form label */}
              <div className="mb-6">
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-cream/30">
                  Inquiry Form
                </span>
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
                  <p className="text-cream/40 text-sm">I&apos;ll get back to you faster than a hard cut.</p>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Right column — mascot */}
          <motion.div
            custom={8}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5 flex items-center justify-center lg:justify-end"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: -2 }}
              transition={{ duration: 0.3 }}
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
          </motion.div>
        </div>

        {/* Video carousel section */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-28"
        >
          <div className="mb-12">
            <div className="inline-block bg-orange px-4 py-2">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black leading-[0.9] tracking-tight text-white">
                TOP PERFORMING
              </span>
            </div>
          </div>

          <div className="relative">
            <div
              ref={reelRef}
              className="overflow-x-scroll scroll-snap-x scrollbar-hide -mx-6 sm:-mx-8 lg:-mx-12 py-2"
            >
              <div className="flex gap-6 px-6 sm:px-8 lg:px-12 w-max">
                {[
                  { gif: "/videos/reel1.gif", views: "3.1M", link: "https://www.instagram.com/reel/DUlLiqLkcFC/" },
                  { gif: "/videos/reel2.gif", views: "2.7M", link: "https://www.instagram.com/reel/DRnGP-kkreS/" },
                  { gif: "/videos/reel3.gif", views: "70.8K", link: "https://www.instagram.com/reel/DJCGdPvT6qY/" },
                  { gif: "/videos/reel4.gif", views: "335K", link: "https://www.instagram.com/reel/DIjFFAUTD5v/" },
                  { gif: "/videos/reel5.gif", views: "6.2M", link: "https://www.instagram.com/reel/DS4jOvGiRDC/" },
                  { gif: "/videos/reel6.gif", views: "1.2M", link: "https://www.instagram.com/reel/DY4OVgrsK6V/" },
                ].map((reel, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
                    className="w-[280px] sm:w-[320px] lg:w-[380px] flex-shrink-0 scroll-snap-center"
                  >
                    <a href={reel.link} target="_blank" rel="noopener noreferrer" className="block relative aspect-[9/16] w-full bg-purple overflow-hidden">
                      <Image
                        src={reel.gif}
                        alt={`Reel ${i + 1}`}
                        width={380}
                        height={675}
                        unoptimized
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-3 right-4 text-2xl sm:text-3xl lg:text-4xl font-black text-white drop-shadow-[0_3px_8px_rgba(0,0,0,0.9)]">
                        {reel.views}
                      </span>
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 mt-4 px-6 sm:px-8 lg:px-12">
              <button onClick={() => scrollCarousel("left", reelRef)} className="w-10 h-10 rounded-full bg-orange/20 hover:bg-orange/40 flex items-center justify-center text-cream text-xl font-bold transition-colors cursor-pointer">
                ‹
              </button>
              <button onClick={() => scrollCarousel("right", reelRef)} className="w-10 h-10 rounded-full bg-orange/20 hover:bg-orange/40 flex items-center justify-center text-cream text-xl font-bold transition-colors cursor-pointer">
                ›
              </button>
            </div>
          </div>
        </motion.div>

        {/* Testimonials section */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-28"
        >
          <div className="mb-12">
            <div className="inline-block bg-orange px-4 py-2">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black leading-[0.9] tracking-tight text-white">
                TESTIMONIALS
              </span>
            </div>
          </div>

          <div className="relative">
            <div
              ref={testimonialRef}
              className="overflow-x-scroll scroll-snap-x scrollbar-hide -mx-6 sm:-mx-8 lg:-mx-12 py-2"
            >
              <div className="flex gap-6 px-6 sm:px-8 lg:px-12 w-max">
                {[
                  { image: "/images/testimonial-deonn.jpg", handle: "@de.onn", link: "https://www.instagram.com/de.onn/", text: "Ever since I started working with Raza, my life has just become way simpler. I'm able to expand into different content genres without worrying about my videos getting edited." },
                  { image: "/images/testimonial-itzthomzi.jpg", handle: "@itzthomzi", link: "https://www.instagram.com/itzthomzi/", text: "I have content scheduled for the next two weeks now. Wouldn't have been possible without such a great editor." },
                  { image: "/images/testimonial-socialfayaz.jpg", handle: "@social.fayaz", link: "https://www.instagram.com/social.fayaz/", text: "After working with me for about a year, Raza has now assigned a professional editor from his team to help me full time. No complaints." },
                ].map((testimonial, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
                    className="w-[280px] sm:w-[320px] lg:w-[380px] flex-shrink-0 p-6 lg:p-8 flex flex-col scroll-snap-center"
                  >
                    <a href={testimonial.link} target="_blank" rel="noopener noreferrer" className="block relative aspect-square w-full rounded-2xl overflow-hidden bg-cream/5">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.handle}
                        width={400}
                        height={400}
                        sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 380px"
                        className="w-full h-full object-cover"
                        style={{ imageRendering: "auto" }}
                      />
                      <span className="absolute bottom-2 right-3 text-sm text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        {testimonial.handle}
                      </span>
                    </a>
                    <div className="pt-4">
                      <span className="text-6xl leading-none text-orange/40 font-serif select-none">&ldquo;</span>
                      <p className="text-cream/70 text-sm sm:text-base leading-relaxed -mt-4">
                        {testimonial.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 mt-4 px-6 sm:px-8 lg:px-12">
              <button onClick={() => scrollCarousel("left", testimonialRef)} className="w-10 h-10 rounded-full bg-orange/20 hover:bg-orange/40 flex items-center justify-center text-cream text-xl font-bold transition-colors cursor-pointer">
                ‹
              </button>
              <button onClick={() => scrollCarousel("right", testimonialRef)} className="w-10 h-10 rounded-full bg-orange/20 hover:bg-orange/40 flex items-center justify-center text-cream text-xl font-bold transition-colors cursor-pointer">
                ›
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom editorial bar */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mt-20 pt-8 border-t border-cream/10"
        >
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-cream/30">
              ┬⌐ 2026 The Bald Editor
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange" />
              <div className="w-2 h-2 bg-cream" />
              <div className="w-2 h-2 bg-black" />
            </div>
          </div>
        </motion.div>
        {process.env.NODE_ENV === "development" && <Agentation />}
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          20% { transform: translateX(-2px) rotate(-1deg); }
          40% { transform: translateX(2px) rotate(1deg); }
          60% { transform: translateX(-2px) rotate(-1deg); }
          80% { transform: translateX(2px) rotate(1deg); }
        }
        .animate-[shake_0.5s_infinite] {
          animation: shake 0.5s infinite;
          animation-delay: 1s;
          animation-iteration-count: infinite;
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </main>
  );
}