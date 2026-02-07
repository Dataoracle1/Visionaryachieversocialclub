// Minimal API service for Navbar component

export const membersAPI = {
  // Logout member - clears authentication data from localStorage
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('memberId');
    localStorage.removeItem('memberName');
  },
};