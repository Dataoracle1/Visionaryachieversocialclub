import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { memberService } from '../services/memberService';

const Profile = ({ showToast }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const memberId = localStorage.getItem('memberId');
    
    if (!memberId) {
      showToast('warning', 'Not Logged In', 'Please login to view your profile');
      navigate('/login');
      return;
    }

    setIsLoading(true);
    try {
      const response = await memberService.getProfile();
      
      setProfile(response);
      setFormData({
        firstName: response.firstName || '',
        lastName: response.lastName || '',
        email: response.email || '',
        phone: response.phone || '',
      });
    } catch (error) {
      console.error('Profile error:', error);
      showToast('error', 'Error', 'Failed to load profile. Please login again.');
      
      // Clear invalid session
      localStorage.removeItem('memberId');
      localStorage.removeItem('memberName');
      navigate('/login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await memberService.updateProfile(formData);

      showToast('success', 'Profile Updated!', 'Your changes have been saved');
      setProfile({ ...profile, ...formData });
      setIsEditing(false);
      localStorage.setItem('memberName', `${formData.firstName} ${formData.lastName}`);
    } catch (error) {
      console.error('Update error:', error);
      showToast('error', 'Update Failed', error.message || 'Please try again');
    }
  };

  const handleLogout = async () => {
    try {
      await memberService.logout();
      showToast('success', 'Logged Out', 'You have been logged out successfully');
      navigate('/');
    } catch (error) {
      // Even if logout API fails, clear local storage and redirect
      console.error('Logout error:', error);
      localStorage.removeItem('memberId');
      localStorage.removeItem('memberName');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      showToast('success', 'Logged Out', 'You have been logged out successfully');
      navigate('/');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  const fullName = `${profile?.firstName || ''} ${profile?.lastName || ''}`.trim() || 'User';
  const initials = `${profile?.firstName?.charAt(0) || ''}${profile?.lastName?.charAt(0) || ''}`.toUpperCase() || 'U';

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-20 h-20 bg-vasc-orange rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {initials}
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-vasc-navy">
                  {fullName}
                </h1>
                <p className="text-gray-600">VASC Member</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
            >
              Logout
            </button>
          </div>

          {!isEditing ? (
            <>
              {/* View Mode */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <p className="mt-1 text-gray-900">{profile?.firstName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <p className="mt-1 text-gray-900">{profile?.lastName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-gray-900">{profile?.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <p className="mt-1 text-gray-900">{profile?.phone || 'Not provided'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Member Since</label>
                  <p className="mt-1 text-gray-900">
                    {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsEditing(true)}
                className="mt-6 w-full bg-vasc-orange text-white py-2 rounded-lg hover:bg-vasc-gold transition-colors"
              >
                Edit Profile
              </button>
            </>
          ) : (
            <>
              {/* Edit Mode */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="+234 800 000 0000"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-vasc-orange text-white py-2 rounded-lg hover:bg-vasc-gold transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        firstName: profile?.firstName || '',
                        lastName: profile?.lastName || '',
                        email: profile?.email || '',
                        phone: profile?.phone || '',
                      });
                    }}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </>
          )}
        </div>

        {/* Quick Links */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-vasc-navy mb-2">My Events</h3>
            <p className="text-gray-600 text-sm mb-4">View your upcoming RSVPs</p>
            <button 
              onClick={() => navigate('/events')}
              className="text-vasc-orange hover:text-vasc-gold font-medium"
            >
              View Events →
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-vasc-navy mb-2">Change Password</h3>
            <p className="text-gray-600 text-sm mb-4">Update your password</p>
            <button 
              onClick={() => showToast('info', 'Coming Soon', 'Password change feature coming soon!')}
              className="text-vasc-orange hover:text-vasc-gold font-medium"
            >
              Change Password →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;