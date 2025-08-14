import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useNavigationShapesAnimation = ({
  sphereRefs,
  scrollContainer,
  currentSectionRef,
  applyRhombusTransformation,
  updateDotsPosition, // New callback to track dots position
}) => {
  const floatingTl = useRef(null);
  const scrollTriggerRef = useRef(null);
  const state = useRef({
    isAnimatingToDots: false,
    isAnimatingToSpheres: false,
    lastProgress: -1,
    isInDotsPosition: false
  });

  useEffect(() => {
    if (!scrollContainer.current) return;

    const [s1, s2, s3] = sphereRefs.map(ref => ref.current);

    // Initial sphere setup
    gsap.set([s1, s2, s3], {
      scale: 0,
      opacity: 0,
      force3D: true,
      x: 0,
      y: 0,
      willChange: "transform"
    });

    const entranceTl = gsap.timeline({ defaults: { ease: "back.out(1.7)" } });
    entranceTl
      .to(s2, { scale: 1, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.5)" })
      .to(s1, { scale: 1, opacity: 1, duration: 0.6, ease: "elastic.out(1, 0.6)" }, "-=0.4")
      .to(s3, { scale: 1, opacity: 1, duration: 0.6, ease: "elastic.out(1, 0.6)" }, "-=0.4");

    // Create floating animation (sinusoidal)
    const startFloating = () => {
      if (floatingTl.current) floatingTl.current.kill();
      const tl = gsap.timeline({ repeat: -1, yoyo: true });

      tl.to(s1, { x: 20, y: 10, duration: 3, ease: "sine.inOut" }, 0);
      tl.to(s2, { x: -25, y: -20, duration: 4, ease: "sine.inOut" }, 0);
      tl.to(s3, { x: 15, y: 25, duration: 3.5, ease: "sine.inOut" }, 0);

      floatingTl.current = tl;
    };

    // Pre-calculate target final positions only once
    const calculateFinalPositions = () => {
      const finalRight = window.innerWidth * 0.9;
      const baseY = 500;
      const spacing = 30;

      const [r1, r2, r3] = [s1, s2, s3].map(el => el.getBoundingClientRect());

      return {
        sphere1: {
          x: finalRight - r1.left - r1.width / 2,
          y: baseY - (r1.top + r1.height / 2),
          scale: 20 / 256
        },
        sphere2: {
          x: finalRight - r2.left - r2.width / 2,
          y: baseY + spacing - (r2.top + r2.height / 2),
          scale: 20 / 384
        },
        sphere3: {
          x: finalRight - r3.left - r3.width / 2,
          y: baseY + spacing * 2 - (r3.top + r3.height / 2),
          scale: 20 / 192
        }
      };
    };

    entranceTl.eventCallback("onComplete", () => {
      const finalPos = calculateFinalPositions();
      startFloating();

      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scroller: scrollContainer.current,
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          if (Math.abs(progress - state.current.lastProgress) < 0.01) return;

          state.current.lastProgress = progress;

          const ease = gsap.parseEase("power2.inOut")(progress);

          if (progress >= 0.99 && !state.current.isAnimatingToDots) {
            state.current.isAnimatingToDots = true;
            state.current.isAnimatingToSpheres = false;
            floatingTl.current?.pause();
            gsap.killTweensOf([s1, s2, s3]);

            // Animate to dots position
            gsap.to(s1, {
              ...finalPos.sphere1,
              duration: 0.4,
              ease: "power2.inOut"
            });
            gsap.to(s2, { 
              ...finalPos.sphere2, 
              duration: 0.4, 
              ease: "power2.inOut" 
            });
            gsap.to(s3, {
              ...finalPos.sphere3,
              duration: 0.4,
              ease: "power2.inOut",
              onComplete: () => {
                state.current.isInDotsPosition = true;
                if (updateDotsPosition) updateDotsPosition(true);
                // Apply rhombus transformation after reaching dots position
                applyRhombusTransformation(currentSectionRef.current);
              }
            });

          } else if (progress <= 0.01 && !state.current.isAnimatingToSpheres) {
            state.current.isAnimatingToSpheres = true;
            state.current.isAnimatingToDots = false;
            state.current.isInDotsPosition = false;
            if (updateDotsPosition) updateDotsPosition(false);

            gsap.killTweensOf([s1, s2, s3]);
            gsap.to([s1, s2, s3], {
              x: 0,
              y: 0,
              scale: 1,
              duration: 0.5,
              ease: "power2.out",
              onComplete: () => {
                if (self.progress <= 0.01) startFloating();
              }
            });

          } else {
            state.current.isAnimatingToDots = false;
            state.current.isAnimatingToSpheres = false;
            
            // Only update dots position state if we're transitioning
            if (state.current.isInDotsPosition && progress < 0.99) {
              state.current.isInDotsPosition = false;
              if (updateDotsPosition) updateDotsPosition(false);
            }

            floatingTl.current?.pause();
            gsap.killTweensOf([s1, s2, s3]);

            gsap.set(s1, {
              x: finalPos.sphere1.x * ease,
              y: finalPos.sphere1.y * ease,
              scale: 1 - (1 - finalPos.sphere1.scale) * ease
            });
            gsap.set(s2, {
              x: finalPos.sphere2.x * ease,
              y: finalPos.sphere2.y * ease,
              scale: 1 - (1 - finalPos.sphere2.scale) * ease
            });
            gsap.set(s3, {
              x: finalPos.sphere3.x * ease,
              y: finalPos.sphere3.y * ease,
              scale: 1 - (1 - finalPos.sphere3.scale) * ease
            });
          }
        }
      });
    });

    return () => {
      floatingTl.current?.kill();
      scrollTriggerRef.current?.kill();
      gsap.killTweensOf([s1, s2, s3]);
    };
  }, [scrollContainer]);
};