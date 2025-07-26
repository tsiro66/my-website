// NavigationShapes.js (updated with correct rhombus logic)
import { useRef, useEffect } from "react";
import { useNavigationShapesAnimation } from "../components/hooks/useNavigationShapesAnimation"; // adjust path if needed
import gsap from "gsap";

const NavigationShapes = ({ scrollContainer, currentSection = 0 }) => {
  const sphere1 = useRef(null);
  const sphere2 = useRef(null);
  const sphere3 = useRef(null);
  const currentSectionRef = useRef(currentSection);

  // Update ref on currentSection change
  useEffect(() => {
    currentSectionRef.current = currentSection;
  }, [currentSection]);

  // Apply rhombus on currentSection change when in dot mode
  useEffect(() => {
    applyRhombusTransformation(currentSection);
  }, [currentSection]);

  // Transform the active sphere into a rhombus based on current section
  const applyRhombusTransformation = (section = currentSectionRef.current) => {
    const spheres = [sphere1.current, sphere2.current, sphere3.current];

    // Reset all spheres to circular
    spheres.forEach((sphere) => {
      if (sphere) {
        const inner = sphere.querySelector(".shape-inner");
        if (inner) {
          gsap.set(inner, { rotation: 0, borderRadius: "50%" });
        }
      }
    });

    // Apply rhombus to the correct active sphere
    if (section > 0 && section <= 3) {
      const activeSphere = spheres[section - 1];
      if (activeSphere) {
        const inner = activeSphere.querySelector(".shape-inner");
        if (inner) {
          gsap.to(inner, {
            rotation: 45,
            borderRadius: "10%",
            duration: 0.3,
            ease: "power2.inOut"
          });
        }
      }
    }
  };

  // Hook for optimized scroll animation
  useNavigationShapesAnimation({
    sphereRefs: [sphere1, sphere2, sphere3],
    scrollContainer,
    currentSectionRef,
    applyRhombusTransformation
  });

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50">
      <div
        ref={sphere1}
        className="absolute right-[15%] top-[20%] w-64 h-64 z-10"
      >
        <div className="shape-inner absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-700 w-full h-full rounded-full" />
      </div>

      <div
        ref={sphere2}
        className="absolute right-[20%] top-[35%] w-96 h-96 z-20"
      >
        <div className="shape-inner absolute inset-0 bg-gradient-to-br from-pink-400 to-fuchsia-600 w-full h-full rounded-full" />
      </div>

      <div
        ref={sphere3}
        className="absolute right-[12%] top-[50%] w-48 h-48 z-30"
      >
        <div className="shape-inner absolute inset-0 bg-gradient-to-br from-yellow-400 to-amber-600 w-full h-full rounded-full" />
      </div>
    </div>
  );
};

export default NavigationShapes;
