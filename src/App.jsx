import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";

import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import FooterSection from "./components/FooterSection";
import NavigationShapes from "./components/NavigationShapes";
import MobileNavbar from "./components/MobileNavbar";

import "./index.css";
import "./font.css";

const App = () => {
  const containerRef = useRef(null);
  const sectionRefs = useRef([]); // wrapper DOM nodes in the scroll container
  const [currentSection, setCurrentSection] = useState(0);
  const currentSectionRef = useRef(0);

  const isAutoScrolling = useRef(false);
  const lastWheelTime = useRef(0);

  // Programmatic smooth scroll that *locks* indicator updates while running
  const scrollToSection = (index) => {
    const container = containerRef.current;
    const target = sectionRefs.current[index];
    if (!container || !target) return;
    if (isAutoScrolling.current) return;

    isAutoScrolling.current = true;
    gsap.killTweensOf(container, "scrollTop");

    gsap.to(container, {
      scrollTop: target.offsetTop,
      duration: 0.72,
      ease: "power2.inOut",
      onComplete: () => {
        // ensure we land exactly on the target
        container.scrollTop = target.offsetTop;

        // set both state and ref so NavigationShapes and other code see the final index
        setCurrentSection(index);
        currentSectionRef.current = index;

        // small timeout so any scroll-triggered visual work can settle
        setTimeout(() => {
          isAutoScrolling.current = false;
        }, 35);
      }
    });
  };

  // Helper: find wrapper by id and scroll to it
  const scrollToSectionById = (id) => {
    const idx = sectionRefs.current.findIndex((el) => el && el.id === id);
    if (idx !== -1) scrollToSection(idx);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Find which section's center is closest to container viewport center
    const updateCurrentSection = () => {
      if (isAutoScrolling.current) return; // << LOCK: ignore while auto-scrolling

      const scrollTop = container.scrollTop;
      const containerMiddle = scrollTop + container.clientHeight / 2;

      let closest = 0;
      let bestDist = Infinity;
      sectionRefs.current.forEach((sec, idx) => {
        if (!sec) return;
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        const center = top + height / 2;
        const dist = Math.abs(center - containerMiddle);
        if (dist < bestDist) {
          bestDist = dist;
          closest = idx;
        }
      });

      if (closest !== currentSectionRef.current) {
        currentSectionRef.current = closest;
        setCurrentSection(closest);
      }
    };

    // Wheel / touchpad handling with debounce
    const handleWheel = (e) => {
      // we want to control the scroll ourselves
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheelTime.current < 650 || isAutoScrolling.current) return;
      lastWheelTime.current = now;

      // compute current index using the same center logic
      updateCurrentSection();
      const currentIndex = currentSectionRef.current;
      const dir = e.deltaY > 0 ? 1 : -1;
      const target = Math.min(Math.max(currentIndex + dir, 0), sectionRefs.current.length - 1);
      if (target !== currentIndex) scrollToSection(target);
    };

    // Keyboard navigation
    const handleKeyDown = (e) => {
      if (isAutoScrolling.current) return;
      const currentIndex = currentSectionRef.current;
      let target = currentIndex;
      switch (e.key) {
        case "ArrowDown":
        case "PageDown":
          e.preventDefault();
          target = Math.min(currentIndex + 1, sectionRefs.current.length - 1);
          break;
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          target = Math.max(currentIndex - 1, 0);
          break;
        case "Home":
          e.preventDefault();
          target = 0;
          break;
        case "End":
          e.preventDefault();
          target = sectionRefs.current.length - 1;
          break;
        default:
          return;
      }
      if (target !== currentIndex) scrollToSection(target);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("keydown", handleKeyDown);
    container.addEventListener("scroll", updateCurrentSection);

    // make container focusable for keyboard events
    container.tabIndex = 0;
    // focusing immediately may or may not work depending on browser/user gesture; it's fine if it doesn't
    try { container.focus(); } catch (err) {console.log(err.message)}

    // initialize currentSection
    setTimeout(updateCurrentSection, 0);

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("keydown", handleKeyDown);
      container.removeEventListener("scroll", updateCurrentSection);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <MobileNavbar />

      {/* Navigation shapes (desktop) */}
      <div className="hidden lg:block">
        {/* pass the numeric 0-based index */}
        <NavigationShapes scrollContainer={containerRef} currentSection={currentSection} />
      </div>

      {/* main scroll container */}
      <div
        ref={containerRef}
        className="h-screen overflow-y-auto focus:outline-none"
        style={{ overscrollBehavior: "contain" }}
      >
        {/* wrappers MUST be direct children of container so offsetTop is relative to container */}
        <div id="hero-wrapper" ref={(el) => (sectionRefs.current[0] = el)}>
          <HeroSection onContactClick={() => scrollToSectionById("contact-wrapper")} />
        </div>

        <div id="about-wrapper" ref={(el) => (sectionRefs.current[1] = el)}>
          <AboutSection onContactClick={() => scrollToSectionById("contact-wrapper")} />
        </div>

        <div id="contact-wrapper" ref={(el) => (sectionRefs.current[2] = el)}>
          <ContactSection />
        </div>

        <div id="footer-wrapper" ref={(el) => (sectionRefs.current[3] = el)}>
          <FooterSection onContactClick={() => scrollToSectionById("contact-wrapper")} />
        </div>
      </div>
    </>
  );
};

export default App;
