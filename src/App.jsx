import { useRef, useEffect, useState } from "react"
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import FooterSection from "./components/FooterSection";
import NavigationShapes from "./components/NavigationShapes";

const App = () => {
  const containerRef = useRef(null);
  const [currentSection, setCurrentSection] = useState(0);
  const isScrolling = useRef(false);
  const lastScrollTime = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Update current section indicator
    const updateCurrentSection = () => {
      const scrollPosition = container.scrollTop;
      const sectionIndex = Math.round(scrollPosition / window.innerHeight);
      setCurrentSection(sectionIndex);
    };

    // Scroll to specific section with custom animation
    const scrollToSection = (index) => {
      if (isScrolling.current) return;
      
      isScrolling.current = true;
      const targetPosition = index * window.innerHeight;
      const startPosition = container.scrollTop;
      const distance = targetPosition - startPosition;
      const duration = 800;
      const startTime = performance.now();
      
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeInOutQuad = progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        
        container.scrollTop = startPosition + (distance * easeInOutQuad);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          isScrolling.current = false;
        }
      };
      
      requestAnimationFrame(animate);
    };

    // Handle keyboard navigation
    const handleKeyDown = (e) => {
      if (isScrolling.current) return;
      
      const currentIndex = Math.round(container.scrollTop / window.innerHeight);
      let targetIndex = currentIndex;
      
      switch(e.key) {
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault();
          targetIndex = Math.min(currentIndex + 1, 3);
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          targetIndex = Math.max(currentIndex - 1, 0);
          break;
        case 'Home':
          e.preventDefault();
          targetIndex = 0;
          break;
        case 'End':
          e.preventDefault();
          targetIndex = 3;
          break;
        default:
          return;
      }
      
      if (targetIndex !== currentIndex) {
        scrollToSection(targetIndex);
      }
    };

    // Handle wheel events with debouncing
    const handleWheel = (e) => {
      e.preventDefault();
      
      const now = Date.now();
      const timeSinceLastScroll = now - lastScrollTime.current;
      
      // Debounce wheel events
      if (timeSinceLastScroll < 1000 || isScrolling.current) {
        return;
      }
      
      lastScrollTime.current = now;
      
      const currentIndex = Math.round(container.scrollTop / window.innerHeight);
      const direction = e.deltaY > 0 ? 1 : -1;
      const targetIndex = Math.min(Math.max(currentIndex + direction, 0), 3);
      
      if (targetIndex !== currentIndex) {
        scrollToSection(targetIndex);
      }
    };

    // Add event listeners
    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('keydown', handleKeyDown);
    container.addEventListener('scroll', updateCurrentSection);
    
    // Focus container for keyboard events
    container.tabIndex = 0;
    container.focus();

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('keydown', handleKeyDown);
      container.removeEventListener('scroll', updateCurrentSection);
    };
  }, []);

  return (
    <>    
    <div className="hidden lg:block">
  <NavigationShapes scrollContainer={containerRef} currentSection={currentSection} />
</div>

      <div
        ref={containerRef}
        className="h-screen overflow-y-auto focus:outline-none"
        style={{
          overscrollBehavior: 'contain'
        }}
      >
        <HeroSection className="h-screen snap-start" />
        <AboutSection className="h-screen snap-start" />
        <ContactSection className="h-screen snap-start" />
        <FooterSection className="h-screen snap-start" />
      </div>
    </>
  );
};

export default App;