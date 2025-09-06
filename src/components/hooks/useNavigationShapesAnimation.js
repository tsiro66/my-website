import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useNavigationShapesAnimation = ({
  sphereRefs,
  scrollContainer,
  currentSectionRef,
  applyRhombusTransformation,
  updateDotsPosition,
}) => {
  const floatingTl = useRef(null);
  const scrollTriggerRef = useRef(null);
  const state = useRef({
    isAnimatingToDots: false,
    isAnimatingToSpheres: false,
    lastProgress: -1,
    isInDotsPosition: false,
    isInitialized: false,
    entranceComplete: false
  });

  useEffect(() => {
    if (!scrollContainer.current) return;

    const [s1, s2, s3] = sphereRefs.map(ref => ref.current);
    
    // Ensure all spheres exist
    if (!s1 || !s2 || !s3) {
      console.warn("NavigationShapes: Sphere refs not ready");
      return;
    }

    // Kill any existing animations first
    gsap.killTweensOf([s1, s2, s3]);
    if (floatingTl.current) {
      floatingTl.current.kill();
      floatingTl.current = null;
    }
    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill();
      scrollTriggerRef.current = null;
    }

    // Initial sphere setup - ensure they're visible but scaled down
    gsap.set([s1, s2, s3], {
      scale: 0,
      opacity: 1, // Changed from 0 to 1 to ensure visibility
      force3D: true,
      x: 0,
      y: 0,
      willChange: "transform",
      visibility: "visible" // Ensure visibility
    });

    // Pre-calculate target final positions
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

    // Create floating animation
    const startFloating = () => {
      if (!state.current.entranceComplete) return;
      if (floatingTl.current) floatingTl.current.kill();
      
      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      tl.to(s1, { x: 20, y: 10, duration: 3, ease: "sine.inOut" }, 0);
      tl.to(s2, { x: -25, y: -20, duration: 4, ease: "sine.inOut" }, 0);
      tl.to(s3, { x: 15, y: 25, duration: 3.5, ease: "sine.inOut" }, 0);
      
      floatingTl.current = tl;
    };

    // Setup scroll trigger BEFORE entrance animation
    const setupScrollTrigger = () => {
      const finalPos = calculateFinalPositions();
      
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scroller: scrollContainer.current,
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Skip tiny changes
          if (Math.abs(progress - state.current.lastProgress) < 0.001) return;
          state.current.lastProgress = progress;

          const ease = gsap.parseEase("power2.inOut")(progress);

          // Handle dots position (end of scroll)
          if (progress >= 0.99 && !state.current.isAnimatingToDots) {
            state.current.isAnimatingToDots = true;
            state.current.isAnimatingToSpheres = false;
            
            if (floatingTl.current) {
              floatingTl.current.pause();
              floatingTl.current.progress(0);
            }
            
            gsap.killTweensOf([s1, s2, s3]);

            // Ensure spheres are visible before animating to dots
            gsap.set([s1, s2, s3], { opacity: 1, visibility: "visible" });
            
            gsap.to(s1, {
              ...finalPos.sphere1,
              opacity: 1,
              duration: 0.4,
              ease: "power2.inOut"
            });
            gsap.to(s2, { 
              ...finalPos.sphere2,
              opacity: 1, 
              duration: 0.4, 
              ease: "power2.inOut" 
            });
            gsap.to(s3, {
              ...finalPos.sphere3,
              opacity: 1,
              duration: 0.4,
              ease: "power2.inOut",
              onComplete: () => {
                state.current.isInDotsPosition = true;
                if (updateDotsPosition) updateDotsPosition(true);
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
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
              onComplete: () => {
                if (self.progress <= 0.01 && state.current.entranceComplete) {
                  startFloating();
                }
              }
            });

          } else if (progress > 0.01 && progress < 0.99) {
            // Middle of scroll
            state.current.isAnimatingToDots = false;
            state.current.isAnimatingToSpheres = false;
            
            if (state.current.isInDotsPosition) {
              state.current.isInDotsPosition = false;
              if (updateDotsPosition) updateDotsPosition(false);
            }

            if (floatingTl.current) {
              floatingTl.current.pause();
              floatingTl.current.progress(0);
            }
            
            gsap.killTweensOf([s1, s2, s3]);

            // Ensure visibility and set positions
            gsap.set(s1, {
              x: finalPos.sphere1.x * ease,
              y: finalPos.sphere1.y * ease,
              scale: 1 - (1 - finalPos.sphere1.scale) * ease,
              opacity: 1,
              visibility: "visible"
            });
            gsap.set(s2, {
              x: finalPos.sphere2.x * ease,
              y: finalPos.sphere2.y * ease,
              scale: 1 - (1 - finalPos.sphere2.scale) * ease,
              opacity: 1,
              visibility: "visible"
            });
            gsap.set(s3, {
              x: finalPos.sphere3.x * ease,
              y: finalPos.sphere3.y * ease,
              scale: 1 - (1 - finalPos.sphere3.scale) * ease,
              opacity: 1,
              visibility: "visible"
            });
          }
        }
      });
    };

    // Check initial scroll position
    const checkInitialPosition = () => {
      const scrollTop = scrollContainer.current.scrollTop;
      const heroHeight = document.querySelector("#hero")?.offsetHeight || window.innerHeight;
      const scrollProgress = Math.min(scrollTop / heroHeight, 1);
      
      if (scrollProgress > 0.01) {
        // We're already scrolled, skip entrance animation
        state.current.entranceComplete = true;
        gsap.set([s1, s2, s3], { scale: 1, opacity: 1 });
        setupScrollTrigger();
        
        // Trigger immediate update
        if (scrollTriggerRef.current) {
          scrollTriggerRef.current.update();
        }
      } else {
        // Do entrance animation
        setupScrollTrigger();
        
        const entranceTl = gsap.timeline({ 
          defaults: { ease: "back.out(1.7)" },
          onComplete: () => {
            state.current.entranceComplete = true;
            startFloating();
          }
        });
        
        entranceTl
          .to(s2, { scale: 1, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.5)" })
          .to(s1, { scale: 1, opacity: 1, duration: 0.6, ease: "elastic.out(1, 0.6)" }, "-=0.4")
          .to(s3, { scale: 1, opacity: 1, duration: 0.6, ease: "elastic.out(1, 0.6)" }, "-=0.4");
      }
    };

    // Initialize after a small delay to ensure DOM is ready
    const initTimer = setTimeout(() => {
      state.current.isInitialized = true;
      checkInitialPosition();
    }, 10);

    return () => {
      clearTimeout(initTimer);
      if (floatingTl.current) floatingTl.current.kill();
      if (scrollTriggerRef.current) scrollTriggerRef.current.kill();
      gsap.killTweensOf([s1, s2, s3]);
    };
  }, [scrollContainer]);
};