"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Send } from "lucide-react";
import { Agentation } from "agentation";

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

  const shake = {
    animate: {
      x: [0, -2, 2, -2, 2, -1, 1, 0],
      transition: { duration: 0.5, repeat: Infinity, repeatDelay: 0.5 },
    },
  };

  const useDragScroll = (containerRef: React.RefObject<HTMLDivElement | null>) => {
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);
    const velocity = useRef(0);
    const lastX = useRef(0);
    const lastTime = useRef(0);
    const rafId = useRef<number | null>(null);

    const applyMomentum = () => {
      if (!containerRef.current || Math.abs(velocity.current) < 0.5) return;
      containerRef.current.scrollLeft -= velocity.current;
      velocity.current *= 0.95;
      rafId.current = requestAnimationFrame(applyMomentum);
    };

    const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      if (rafId.current) cancelAnimationFrame(rafId.current);
      isDragging.current = true;
      startX.current = e.pageX - containerRef.current.offsetLeft;
      scrollLeft.current = containerRef.current.scrollLeft;
      lastX.current = e.pageX;
      lastTime.current = Date.now();
      velocity.current = 0;
      containerRef.current.style.cursor = "grabbing";
      containerRef.current.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging.current || !containerRef.current) return;
      e.preventDefault();
      const x = e.pageX - containerRef.current.offsetLeft;
      const walk = (x - startX.current) * 1.5;
      containerRef.current.scrollLeft = scrollLeft.current - walk;
      const now = Date.now();
      const dt = now - lastTime.current;
      if (dt > 0) {
        velocity.current = ((e.pageX - lastX.current) * 1.5) / dt * 16;
      }
      lastX.current = e.pageX;
      lastTime.current = now;
    };

    const onPointerUp = () => {
      if (!containerRef.current) return;
      isDragging.current = false;
      containerRef.current.style.cursor = "grab";
      rafId.current = requestAnimationFrame(applyMomentum);
    };

    return { onPointerDown, onPointerMove, onPointerUp };
  };

  const reelsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const reelsDrag = useDragScroll(reelsRef);
  const testimonialsDrag = useDragScroll(testimonialsRef);

  const reels = [
    { gif: "/videos/reel1.gif", views: "3.1M", link: "https://www.instagram.com/reel/DUlLiqLkcFC/" },
    { gif: "/videos/reel2.gif", views: "2.7M", link: "https://www.instagram.com/reel/DRnGP-kkreS/" },
    { gif: "/videos/reel3.gif", views: "70.8K", link: "https://www.instagram.com/reel/DJCGdPvT6qY/" },
    { gif: "/videos/reel4.gif", views: "335K", link: "https://www.instagram.com/reel/DIjFFAUTD5v/" },
    { gif: "/videos/reel5.gif", views: "6.2M", link: "https://www.instagram.com/reel/DS4jOvGiRDC/" },
    { gif: "/videos/reel6.gif", views: "1.2M", link: "https://www.instagram.com/reel/DY4OVgrsK6V/" },
  ];

  const testimonials = [
    { image: "/images/testimonial-deonn.jpg", handle: "@de.onn", link: "https://www.instagram.com/de.onn/", text: "Ever since I started working with Raza, my life has just become way simpler. I'm able to expand into different content genres without worrying about my videos getting edited." },
    { image: "/images/testimonial-itzthomzi.jpg", handle: "@itzthomzi", link: "https://www.instagram.com/itzthomzi/", text: "I have content scheduled for the next two weeks now. Wouldn't have been possible without such a great editor." },
    { image: "/images/testimonial-socialfayaz.jpg", handle: "@social.fayaz", link: "https://www.instagram.com/social.fayaz/", text: "After working with me for about a year, Raza has now assigned a professional editor from his team to help me full time. No complaints." },
  ];

  return (
    <main className="min-h-screen bg-purple text-cream overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-12 lg:py-16">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-7 flex flex-col justify-center">
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
                  variants={shake}
                  animate="animate"
                  className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tight text-white"
                >
                  THAT HITS
                </motion.h1>
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
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
          className="mt-28"
        >
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
              className="inline-block bg-orange px-4 py-2"
            >
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black leading-[0.9] tracking-tight text-white">
                TOP PERFORMING
              </span>
            </motion.div>
          </div>

          <div
            ref={reelsRef}
            onPointerDown={reelsDrag.onPointerDown}
            onPointerMove={reelsDrag.onPointerMove}
            onPointerUp={reelsDrag.onPointerUp}
            onPointerLeave={reelsDrag.onPointerUp}
            style={{ cursor: "grab" }}
            className="overflow-x-scroll scrollbar-hide -mx-6 sm:-mx-8 lg:-mx-12 py-2 select-none"
          >
            <div className="flex gap-6 px-6 sm:px-8 lg:px-12 w-max">
              {[...reels, ...reels].map((reel, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.03, zIndex: 10 }}
                  whileTap={{ scale: 1.03 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: (i % reels.length) * 0.08, ease: [0.215, 0.61, 0.355, 1] }}
                  className="w-[280px] sm:w-[320px] lg:w-[380px] flex-shrink-0"
                >
                  <a href={reel.link} target="_blank" rel="noopener noreferrer" draggable={false} className="block relative aspect-[9/16] w-full bg-purple overflow-hidden">
                    <Image
                      src={reel.gif}
                      alt={`Reel ${(i % reels.length) + 1}`}
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
        </motion.div>

        {/* Testimonials section */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
          className="mt-28"
        >
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
              className="inline-block bg-orange px-4 py-2"
            >
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black leading-[0.9] tracking-tight text-white">
                TESTIMONIALS
              </span>
            </motion.div>
          </div>

          <div
            ref={testimonialsRef}
            onPointerDown={testimonialsDrag.onPointerDown}
            onPointerMove={testimonialsDrag.onPointerMove}
            onPointerUp={testimonialsDrag.onPointerUp}
            onPointerLeave={testimonialsDrag.onPointerUp}
            style={{ cursor: "grab" }}
            className="overflow-x-scroll scrollbar-hide -mx-6 sm:-mx-8 lg:-mx-12 py-2 select-none"
          >
            <div className="flex gap-6 px-6 sm:px-8 lg:px-12 w-max">
              {[...testimonials, ...testimonials].map((testimonial, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.03, zIndex: 10 }}
                  whileTap={{ scale: 1.03 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: (i % testimonials.length) * 0.12, ease: [0.215, 0.61, 0.355, 1] }}
                  className="w-[280px] sm:w-[320px] lg:w-[380px] flex-shrink-0 p-6 lg:p-8 flex flex-col"
                >
                  <a href={testimonial.link} target="_blank" rel="noopener noreferrer" draggable={false} className="block relative aspect-square w-full rounded-2xl overflow-hidden bg-cream/5">
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
        </motion.div>

        {/* Bottom editorial bar */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
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
        {process.env.NODE_ENV === "development" && <Agentation />}
      </div>
    </main>
  );
}
