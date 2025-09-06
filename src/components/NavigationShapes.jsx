import { useRef, useEffect, useCallback } from "react";
import { useNavigationShapesAnimation } from "./hooks/useNavigationShapesAnimation";
import gsap from "gsap";

const NavigationShapes = ({ scrollContainer, currentSection = 0 }) => {
  const sphere1 = useRef(null);
  const sphere2 = useRef(null);
  const sphere3 = useRef(null);
  const currentSectionRef = useRef(currentSection);
  const isInDotsPosition = useRef(false);
  const isInitialized = useRef(false);

  // Update ref on currentSection change
  useEffect(() => {
    currentSectionRef.current = currentSection;
  }, [currentSection]);

  // Apply rhombus transformation only when in dots position
  useEffect(() => {
    // Only apply if we're in dots position and initialized
    if (isInDotsPosition.current && isInitialized.current) {
      applyRhombusTransformation(currentSection);
    }
  }, [currentSection]);

  // Transform the active sphere into a rhombus based on current section
  const applyRhombusTransformation = useCallback((section = currentSectionRef.current) => {
    const spheres = [sphere1.current, sphere2.current, sphere3.current];
    
    // Ensure all spheres exist
    if (!spheres.every(s => s)) return;

    // Reset all spheres to circular with smooth animation
    spheres.forEach((sphere, index) => {
      if (sphere) {
        const inner = sphere.querySelector(".shape-inner");
        if (inner) {
          // If this sphere should be active (sections 1, 2, 3 map to spheres 0, 1, 2)
          if (section > 0 && section <= 3 && index === section - 1) {
            gsap.to(inner, {
              rotation: 45,
              borderRadius: "10%",
              duration: 0.3,
              ease: "power2.inOut"
            });
          } else {
            // Reset to circle
            gsap.to(inner, {
              rotation: 0,
              borderRadius: "50%",
              duration: 0.3,
              ease: "power2.inOut"
            });
          }
        }
      }
    });
  }, []);

  // Callback to update dots position state
  const updateDotsPosition = (inDots) => {
    isInDotsPosition.current = inDots;
    
    // If we're leaving dots position (going back to hero), reset all to circles
    if (!inDots) {
      const spheres = [sphere1.current, sphere2.current, sphere3.current];
      spheres.forEach((sphere) => {
        if (sphere) {
          const inner = sphere.querySelector(".shape-inner");
          if (inner) {
            gsap.to(inner, {
              rotation: 0,
              borderRadius: "50%",
              duration: 0.3,
              ease: "power2.inOut"
            });
          }
        }
      });
    }
  };

  // Mark as initialized after mount
  useEffect(() => {
    isInitialized.current = true;
  }, []);

  // Hook for optimized scroll animation
  useNavigationShapesAnimation({
    sphereRefs: [sphere1, sphere2, sphere3],
    scrollContainer,
    currentSectionRef,
    applyRhombusTransformation,
    updateDotsPosition
  });

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50">
      <div
        ref={sphere1}
        className="absolute right-[15%] top-[20%] w-64 h-64 z-10 will-change-transform"
        style={{ 
          filter: "drop-shadow(0 0 40px rgba(168, 85, 247, 0.4))",
          visibility: "visible"
        }}
      >
        <div className="shape-inner absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-700 w-full h-full rounded-full will-change-transform" />
      </div>

      <div
        ref={sphere2}
        className="absolute right-[20%] top-[35%] w-96 h-96 z-20 will-change-transform"
        style={{ 
          filter: "drop-shadow(0 0 50px rgba(236, 72, 153, 0.4))",
          visibility: "visible"
        }}
      >
        <div className="shape-inner absolute inset-0 bg-gradient-to-br from-pink-400 to-fuchsia-600 w-full h-full rounded-full will-change-transform" />
      </div>

      <div
        ref={sphere3}
        className="absolute right-[12%] top-[50%] w-48 h-48 z-30 will-change-transform"
        style={{ 
          filter: "drop-shadow(0 0 35px rgba(251, 191, 36, 0.4))",
          visibility: "visible"
        }}
      >
        <div className="shape-inner absolute inset-0 bg-gradient-to-br from-yellow-400 to-amber-600 w-full h-full rounded-full will-change-transform" />
      </div>
    </div>
  );
};

export default NavigationShapes;