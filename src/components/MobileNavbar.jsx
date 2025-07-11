import { IoMdPhonePortrait } from "react-icons/io";

const MobileNavbar = () => {

  return (
    <div className="fixed top-0 left-0 w-full h-16 z-[999] flex items-center justify-between px-4 backdrop-blur-md bg-black/30 text-white lg:hidden">
      {/* Left: Logo Spheres */}
      <div className="relative w-10 h-10">
        <div className="absolute w-6 h-6 rounded-full bg-gradient-to-br from-pink-400 to-fuchsia-600 top-2 left-0 z-10 shadow shadow-pink-400/40" />
        <div className="absolute w-5 h-5 rounded-full bg-gradient-to-br from-purple-400 to-purple-700 top-0 left-4 z-0 shadow shadow-purple-400/40" />
        <div className="absolute w-4 h-4 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 top-5 left-5 z-20 shadow shadow-yellow-400/40" />
      </div>

      

      {/* Right: Hamburger */}
      
        <IoMdPhonePortrait className="text-3xl" />

    </div>
  );
};

export default MobileNavbar;
