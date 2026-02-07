// import { useState } from 'react';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const navLinks = [
//     { name: 'Home', href: '#home' },
//     { name: 'About', href: '#about' },
//     { name: 'Gallery', href: '#gallery' },
//     { name: 'Benefits', href: '#benefits' },
//     { name: 'Events', href: '#events' },
//     { name: 'Testimonials', href: '#testimonials' },
//     { name: 'FAQ', href: '#faq' },
//     { name: 'Contact', href: '#contact' },
//   ];

//   const scrollToSection = (e, href) => {
//     e.preventDefault();
//     const element = document.querySelector(href);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' });
//       setIsMobileMenuOpen(false);
//     }
//   };

//   return (
//     <nav className="fixed top-0 w-full bg-white shadow-md z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div className="flex items-center">
//             <img
             
//   src="https://i.postimg.cc/8P5w5Bnz/achieverlogo.png"
//   alt="VASC Logo"
//   className="h-14 w-14 md:h-20 md:w-20 lg:h-31 lg:w-31"
// />

            
//             <span className="ml-3 text-vasc-navy font-bold text-lg hidden sm:block">
//               VASC
//             </span>
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex space-x-8">
//             {navLinks.map((link) => (
//               <a
//                 key={link.name}
//                 href={link.href}
//                 onClick={(e) => scrollToSection(e, link.href)}
//                 className="text-gray-700 hover:text-vasc-orange transition-colors font-medium"
//               >
//                 {link.name}
//               </a>
//             ))}
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             className="md:hidden text-gray-700 hover:text-vasc-orange transition-colors"
//             aria-label="Toggle menu"
//           >
//             {isMobileMenuOpen ? (
//               <svg
//                 className="h-6 w-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             ) : (
//               <svg
//                 className="h-6 w-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               </svg>
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isMobileMenuOpen && (
//         <div className="md:hidden bg-white border-t">
//           <div className="px-4 pt-2 pb-4 space-y-2">
//             {navLinks.map((link) => (
//               <a
//                 key={link.name}
//                 href={link.href}
//                 onClick={(e) => scrollToSection(e, link.href)}
//                 className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-vasc-orange/10 hover:text-vasc-orange rounded transition-colors"
//               >
//                 {link.name}
//               </a>
//             ))}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;    





import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { membersAPI } from '../services/navbarService';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [memberName, setMemberName] = useState('');
  const [openDropdown, setOpenDropdown] = useState(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const memberId = localStorage.getItem('memberId');
    const name = localStorage.getItem('memberName');
    setIsLoggedIn(!!memberId);
    setMemberName(name || '');
  }, [location]);

  const handleLogout = () => {
    membersAPI.logout();
    setIsLoggedIn(false);
    setMemberName('');
    setUserDropdownOpen(false);
    navigate('/');
  };

  const scrollToSection = (e, href) => {
    e.preventDefault();
    
    // If we're not on the home page, navigate there first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation, then scroll
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const closeAllDropdowns = () => {
    setOpenDropdown(null);
    setUserDropdownOpen(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      closeAllDropdowns();
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center" onClick={closeAllDropdowns}>
         

            <img
             src="https://i.postimg.cc/8P5w5Bnz/achieverlogo.png"
             alt="VASC Logo"
              className="h-[100px] w-[100px] rounded-full" 
           />
             <span className="ml-3 text-vasc-navy font-bold text-lg hidden sm:block">
              VASC
            </span>

          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="#home"
              onClick={(e) => scrollToSection(e, '#home')}
              className="text-gray-700 hover:text-vasc-orange transition-colors font-medium"
            >
              Home
            </a>
            
            <a
              href="#about"
              onClick={(e) => scrollToSection(e, '#about')}
              className="text-gray-700 hover:text-vasc-orange transition-colors font-medium"
            >
              About
            </a>

            {/* Activities Dropdown */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => toggleDropdown('activities')}
                className="flex items-center text-gray-700 hover:text-vasc-orange transition-colors font-medium"
              >
                Activities
                <svg className={`ml-1 h-4 w-4 transition-transform ${openDropdown === 'activities' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              {openDropdown === 'activities' && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                  <a
                    href="#gallery"
                    onClick={(e) => scrollToSection(e, '#gallery')}
                    className="block px-4 py-2 text-gray-700 hover:bg-vasc-orange/10 hover:text-vasc-orange transition-colors"
                  >
                    Gallery
                  </a>
                  <a
                    href="#events"
                    onClick={(e) => scrollToSection(e, '#events')}
                    className="block px-4 py-2 text-gray-700 hover:bg-vasc-orange/10 hover:text-vasc-orange transition-colors"
                  >
                    Events
                  </a>
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => toggleDropdown('resources')}
                className="flex items-center text-gray-700 hover:text-vasc-orange transition-colors font-medium"
              >
                Resources
                <svg className={`ml-1 h-4 w-4 transition-transform ${openDropdown === 'resources' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              {openDropdown === 'resources' && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                  <a
                    href="#benefits"
                    onClick={(e) => scrollToSection(e, '#benefits')}
                    className="block px-4 py-2 text-gray-700 hover:bg-vasc-orange/10 hover:text-vasc-orange transition-colors"
                  >
                    Benefits
                  </a>
                  <a
                    href="#testimonials"
                    onClick={(e) => scrollToSection(e, '#testimonials')}
                    className="block px-4 py-2 text-gray-700 hover:bg-vasc-orange/10 hover:text-vasc-orange transition-colors"
                  >
                    Testimonials
                  </a>
                  <a
                    href="#faq"
                    onClick={(e) => scrollToSection(e, '#faq')}
                    className="block px-4 py-2 text-gray-700 hover:bg-vasc-orange/10 hover:text-vasc-orange transition-colors"
                  >
                    FAQ
                  </a>
                </div>
              )}
            </div>

            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="text-gray-700 hover:text-vasc-orange transition-colors font-medium"
            >
              Contact
            </a>

            {/* Auth Section */}
            {isLoggedIn ? (
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-vasc-orange transition-colors"
                >
                  <div className="w-10 h-10 bg-vasc-orange rounded-full flex items-center justify-center text-white font-bold">
                    {memberName?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <svg className={`h-4 w-4 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                {userDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2">
                    <div className="px-4 py-3 border-b">
                      <p className="text-sm font-medium text-gray-900">{memberName}</p>
                      <p className="text-xs text-gray-500">VASC Member</p>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-vasc-orange/10 hover:text-vasc-orange transition-colors"
                    >
                      <div className="flex items-center">
                        <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                        My Profile
                      </div>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors border-t mt-2 pt-2"
                    >
                      <div className="flex items-center">
                        <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                        </svg>
                        Logout
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-medium text-white bg-vasc-orange rounded-lg hover:bg-vasc-gold transition-colors"
              >
                Join Now
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-700 hover:text-vasc-orange transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="block px-3 py-2 text-gray-700 hover:bg-vasc-orange/10 hover:text-vasc-orange rounded transition-colors">
              Home
            </a>
            <a href="#about" onClick={(e) => scrollToSection(e, '#about')} className="block px-3 py-2 text-gray-700 hover:bg-vasc-orange/10 hover:text-vasc-orange rounded transition-colors">
              About
            </a>
            
            {/* Activities */}
            <div className="py-1">
              <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Activities</p>
              <a href="#gallery" onClick={(e) => scrollToSection(e, '#gallery')} className="block px-6 py-2 text-gray-700 hover:bg-vasc-orange/10 hover:text-vasc-orange rounded transition-colors">
                Gallery
              </a>
              <a href="#events" onClick={(e) => scrollToSection(e, '#events')} className="block px-6 py-2 text-gray-700 hover:bg-vasc-orange/10 hover:text-vasc-orange rounded transition-colors">
                Events
              </a>
            </div>

            {/* Resources */}
            <div className="py-1">
              <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Resources</p>
              <a href="#benefits" onClick={(e) => scrollToSection(e, '#benefits')} className="block px-6 py-2 text-gray-700 hover:bg-vasc-orange/10 hover:text-vasc-orange rounded transition-colors">
                Benefits
              </a>
              <a href="#testimonials" onClick={(e) => scrollToSection(e, '#testimonials')} className="block px-6 py-2 text-gray-700 hover:bg-vasc-orange/10 hover:text-vasc-orange rounded transition-colors">
                Testimonials
              </a>
              <a href="#faq" onClick={(e) => scrollToSection(e, '#faq')} className="block px-6 py-2 text-gray-700 hover:bg-vasc-orange/10 hover:text-vasc-orange rounded transition-colors">
                FAQ
              </a>
            </div>

            <a href="#contact" onClick={(e) => scrollToSection(e, '#contact')} className="block px-3 py-2 text-gray-700 hover:bg-vasc-orange/10 hover:text-vasc-orange rounded transition-colors">
              Contact
            </a>

            {/* Mobile Auth */}
            <div className="border-t pt-2 mt-2">
              {isLoggedIn ? (
                <>
                  <div className="px-3 py-2 mb-2">
                    <p className="text-sm font-medium text-gray-900">{memberName}</p>
                    <p className="text-xs text-gray-500">VASC Member</p>
                  </div>
                  <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-vasc-orange/10 hover:text-vasc-orange rounded transition-colors">
                    My Profile
                  </Link>
                  {/* <a href="#" className="block px-3 py-2 text-gray-700 hover:bg-vasc-orange/10 hover:text-vasc-orange rounded transition-colors">
                    Membership
                  </a> */}
                  {/* <a href="#" className="block px-3 py-2 text-gray-700 hover:bg-vasc-orange/10 hover:text-vasc-orange rounded transition-colors">
                    Settings
                  </a> */}
                  <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded transition-colors">
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center px-3 py-2 bg-vasc-orange text-white hover:bg-vasc-gold rounded transition-colors font-medium">
                  Join Now
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;