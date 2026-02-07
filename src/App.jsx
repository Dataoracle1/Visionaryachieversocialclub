// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import ChatWidget from './components/ChatWidget';
// import Home from './pages/Home';

// function App() {
//   return (
//     <Router>
//       <div className="min-h-screen bg-white flex flex-col">
//         <Navbar />
//         <main className="flex-grow">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             {/* Add more routes as needed */}
//           </Routes>
//         </main>
//         <Footer />
//         <ChatWidget />
//       </div>
//     </Router>
//   );
// }

// export default App;   


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import Toast from './components/Toast';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

function App() {
  const [toasts, setToasts] = useState([]);

  const showToast = (type, title, message, duration = 5000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, title, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, duration);
  };

  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login showToast={showToast} />} />
            <Route path="/register" element={<Register showToast={showToast} />} />
            <Route path="/profile" element={<Profile showToast={showToast} />} />
          </Routes>
        </main>
        <Footer />
        <ChatWidget />

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
      </div>
    </Router>
  );
}

export default App;