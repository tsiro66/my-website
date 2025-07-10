import React from 'react';

const AboutSection = () => {
  return (
    <section className="min-h-screen bg-black flex items-center justify-center snap-start">
      <div className="container mx-auto px-12 md:px-20 lg:px-32 xl:px-40">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
          Σχετικά
        </h2>
        <p className="text-lg md:text-xl text-gray-400">
          Πληροφορίες για εσένα...
        </p>
      </div>
    </section>
  );
};

export default AboutSection;