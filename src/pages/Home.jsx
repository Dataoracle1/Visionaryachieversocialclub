import { useState } from 'react';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Statistics from '../components/sections/Statistics';
import Gallery from '../components/sections/Gallery';
import FAQ from '../components/sections/FAQ';
import ExecutiveTeam from '../components/sections/ExecutiveTeam';
import Benefits from '../components/sections/Benefits';
import Events from '../components/sections/Events';
import Testimonials from '../components/sections/Testimonials';
import Contact from '../components/sections/Contact';
import Toast from '../components/Toast';

const Home = () => {
  const [toasts, setToasts] = useState([]);

  const showToast = (type, title, message, duration = 5000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, title, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, duration);
  };

  return (
    <>
      <div className="relative">
        <Hero />
        <About />
        <Statistics />
        <Gallery />
        <FAQ />
        <ExecutiveTeam />
        <Benefits />
        <Events showToast={showToast} />
        <Testimonials />
        <Contact showToast={showToast} />
      </div>

      {/* Toast Notifications */}
      <div className="fixed top-20 right-4 z-50 space-y-3 max-w-md">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            type={toast.type}
            title={toast.title}
            message={toast.message}
            onClose={() =>
              setToasts((prev) => prev.filter((t) => t.id !== toast.id))
            }
          />
        ))}
      </div>
    </>
  );
};

export default Home;