import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NavigationShapes = ({ scrollContainer }) => {
  const sphere1 = useRef(null);
  const sphere2 = useRef(null);
  const sphere3 = useRef(null);
  const floatingAnimations = useRef([]);
  const scrollTriggers = useRef([]);

  useEffect(() => {
    if (!scrollContainer.current) return;

    gsap.set([sphere1.current, sphere2.current, sphere3.current], {
      scale: 0,
      opacity: 0,
    });

    const entranceTl = gsap.timeline({ defaults: { ease: "back.out(1.7)" } });

    entranceTl
      .to(sphere2.current, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)",
      })
      .to(
        sphere1.current,
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "elastic.out(1, 0.6)",
        },
        "-=0.4"
      )
      .to(
        sphere3.current,
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "elastic.out(1, 0.6)",
        },
        "-=0.4"
      );

    const createFloatingAnimation = (element, xRange, yRange, duration) =>
      gsap
        .timeline({ repeat: -1, yoyo: true })
        .to(element, {
          x: `random(-${xRange}, ${xRange})`,
          y: `random(-${yRange}, ${yRange})`,
          duration,
          ease: "sine.inOut",
        });

    const applyScrollAnimation = (
      el,
      finalX,
      finalY,
      scale,
      index,
      xRange,
      yRange,
      duration
    ) => {
      const trigger = ScrollTrigger.create({
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
        scroller: scrollContainer.current,
        onUpdate: (self) => {
          const progress = self.progress;

          if (progress >= 1) {
            // fully past hero: stay snapped
            gsap.to(el, {
              x: finalX,
              y: finalY,
              scale,
              duration: 0.2,
              ease: "expo.out",
              overwrite: "auto",
            });

            if (floatingAnimations.current[index]) {
              floatingAnimations.current[index].kill();
              floatingAnimations.current[index] = null;
            }
          } else if (progress <= 0) {
            // fully inside hero: restore float
            if (!floatingAnimations.current[index]) {
              floatingAnimations.current[index] = createFloatingAnimation(
                el,
                xRange,
                yRange,
                duration
              );
            }
          } else {
            // during scroll: interpolate
            if (floatingAnimations.current[index]) {
              floatingAnimations.current[index].kill();
              floatingAnimations.current[index] = null;
            }

            gsap.to(el, {
              x: finalX * progress,
              y: finalY * progress,
              scale: 1 - (1 - scale) * progress,
              duration: 0.2,
              ease: "expo.out",
              overwrite: "auto",
            });
          }
        },
      });

      scrollTriggers.current.push(trigger);
    };

    entranceTl.eventCallback("onComplete", () => {
      // Initial float
      floatingAnimations.current = [
        createFloatingAnimation(sphere1.current, 30, 20, 3),
        createFloatingAnimation(sphere2.current, 25, 25, 4),
        createFloatingAnimation(sphere3.current, 35, 15, 3.5),
      ];

      const finalRight = window.innerWidth * 0.9;

      const s1Rect = sphere1.current.getBoundingClientRect();
      const s2Rect = sphere2.current.getBoundingClientRect();
      const s3Rect = sphere3.current.getBoundingClientRect();

      const baseY = 500;
      const spacing = 30;

      applyScrollAnimation(
        sphere1.current,
        finalRight - s1Rect.left - s1Rect.width / 2,
        baseY - (s1Rect.top + s1Rect.height / 2),
        20 / 256,
        0,
        30,
        20,
        3
      );
      applyScrollAnimation(
        sphere2.current,
        finalRight - s2Rect.left - s2Rect.width / 2,
        baseY + spacing - (s2Rect.top + s2Rect.height / 2),
        20 / 384,
        1,
        25,
        25,
        4
      );
      applyScrollAnimation(
        sphere3.current,
        finalRight - s3Rect.left - s3Rect.width / 2,
        baseY + spacing * 2 - (s3Rect.top + s3Rect.height / 2),
        20 / 192,
        2,
        35,
        15,
        3.5
      );
    });

    return () => {
      entranceTl.kill();
      floatingAnimations.current.forEach((anim) => anim?.kill());
      scrollTriggers.current.forEach((t) => t.kill());
      scrollTriggers.current = [];
    };
  }, [scrollContainer]);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50">
      <div
        ref={sphere1}
        className="absolute right-[15%] top-[20%] w-64 h-64 rounded-full overflow-hidden z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-700 shadow-2xl shadow-purple-500/50" />
      </div>

      <div
        ref={sphere2}
        className="absolute right-[20%] top-[35%] w-96 h-96 rounded-full overflow-hidden z-20"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-fuchsia-600 shadow-2xl shadow-pink-500/50" />
      </div>

      <div
        ref={sphere3}
        className="absolute right-[12%] top-[50%] w-48 h-48 rounded-full overflow-hidden z-30"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-amber-600 shadow-2xl shadow-yellow-500/50" />
      </div>
    </div>
  );
};

export default NavigationShapes;