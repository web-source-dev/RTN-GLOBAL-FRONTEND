import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  TextField,
  Button,
  useTheme,
  Tabs,
  Tab,
  IconButton,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import LanguageIcon from '@mui/icons-material/Language';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SecurityIcon from '@mui/icons-material/Security';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import UserSettings from './UserSettings';
import BusinessIcon from '@mui/icons-material/Business';
import API from '../../BackendAPi/ApiProvider';
import { useNavigate } from 'react-router-dom';

const TabPanel = ({ children, value, index, ...other }) => (
  <div role="tabpanel" hidden={value !== index} {...other}>
    {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
  </div>
);

const UserProfile = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    company: '',
    position: '',
    bio: '',
    website: '',
    avatar: null,
    socialLinks: {
      linkedin: '',
      twitter: '',
      github: '',
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await API.get('/api/user/profile');
      setUserData(response.data);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError(err.response?.data?.message || 'Failed to load profile data');
      
      // Redirect to login if unauthorized
      if (err.response?.status === 401) {
        navigate('/auth/login', { state: { from: '/profile' } });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await API.put('/api/user/profile', userData);
      setSuccess('Profile updated successfully');
      setIsEditing(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    
    try {
      await API.put('/api/auth/change-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      
      setOpenPasswordDialog(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setSuccess('Password changed successfully');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (error) {
      console.error('Error changing password:', error);
      setError(error.response?.data?.message || 'Failed to change password');
    }
  };

  const handleDeleteAccount = async () => {
    const confirm = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (!confirm) return;
    
    try {
      await API.delete('/api/user/account');
      navigate('/auth/login', { state: { message: 'Your account has been deleted successfully' } });
    } catch (error) {
      console.error('Error deleting account:', error);
      setError(error.response?.data?.message || 'Failed to delete account');
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);
    
    // Add all other fields to formData
    Object.keys(userData).forEach(key => {
      if (key === 'skills' || key === 'experience' || key === 'education' || key === 'socialLinks' || key === 'businessDetails') {
        formData.append(key, JSON.stringify(userData[key]));
      } else {
        formData.append(key, userData[key]);
      }
    });

    try {
      const response = await API.put('/api/user/profile', formData);

      if (response.ok) {
        const updatedUser = await response.json();
        setUserData(updatedUser);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const renderProfileInfo = () => (
    <Stack spacing={3}>
      {isEditing ? (
        <>
          <TextField
            label="Title"
            value={userData.position}
            onChange={(e) => setUserData({ ...userData, position: e.target.value })}
            fullWidth
          />
          <TextField
            label="Bio"
            value={userData.bio}
            onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
            multiline
            rows={4}
            fullWidth
          />
          <TextField
            label="Company"
            value={userData.company}
            onChange={(e) => setUserData({ ...userData, company: e.target.value })}
            fullWidth
          />
          <TextField
            label="Location"
            value={userData.location}
            onChange={(e) => setUserData({ ...userData, location: e.target.value })}
            fullWidth
          />
          <TextField
            label="Phone"
            value={userData.phone}
            onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
            fullWidth
          />
        </>
      ) : (
        <>
          <Typography variant="h6" color="primary">{userData.position}</Typography>
          <Typography variant="body1">{userData.bio}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <WorkIcon color="primary" />
            <Typography>{userData.company}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <LocationOnIcon color="primary" />
            <Typography>{userData.location}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <PhoneIcon color="primary" />
            <Typography>{userData.phone}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <EmailIcon color="primary" />
            <Typography>{userData.email}</Typography>
          </Box>
        </>
      )}
    </Stack>
  );

  const renderBusinessDetails = () => (
    <Card elevation={0} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Business Details
      </Typography>
      <Stack spacing={3}>
        {isEditing ? (
          <>
            <TextField
              label="Business Name"
              value={userData.businessDetails?.businessName || ''}
              onChange={(e) => setUserData({
                ...userData,
                businessDetails: {
                  ...userData.businessDetails,
                  businessName: e.target.value
                }
              })}
              fullWidth
            />
            <TextField
              label="Business Type"
              value={userData.businessDetails?.businessType || ''}
              onChange={(e) => setUserData({
                ...userData,
                businessDetails: {
                  ...userData.businessDetails,
                  businessType: e.target.value
                }
              })}
              fullWidth
            />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Registration Number"
                  value={userData.businessDetails?.registrationNumber || ''}
                  onChange={(e) => setUserData({
                    ...userData,
                    businessDetails: {
                      ...userData.businessDetails,
                      registrationNumber: e.target.value
                    }
                  })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Tax Number"
                  value={userData.businessDetails?.taxNumber || ''}
                  onChange={(e) => setUserData({
                    ...userData,
                    businessDetails: {
                      ...userData.businessDetails,
                      taxNumber: e.target.value
                    }
                  })}
                  fullWidth
                />
              </Grid>
            </Grid>

            <Typography variant="subtitle1" sx={{ mt: 2 }}>Business Address</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Street Address"
                  value={userData.businessDetails?.businessAddress?.street || ''}
                  onChange={(e) => setUserData({
                    ...userData,
                    businessDetails: {
                      ...userData.businessDetails,
                      businessAddress: {
                        ...userData.businessDetails?.businessAddress,
                        street: e.target.value
                      }
                    }
                  })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="City"
                  value={userData.businessDetails?.businessAddress?.city || ''}
                  onChange={(e) => setUserData({
                    ...userData,
                    businessDetails: {
                      ...userData.businessDetails,
                      businessAddress: {
                        ...userData.businessDetails?.businessAddress,
                        city: e.target.value
                      }
                    }
                  })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="State/Province"
                  value={userData.businessDetails?.businessAddress?.state || ''}
                  onChange={(e) => setUserData({
                    ...userData,
                    businessDetails: {
                      ...userData.businessDetails,
                      businessAddress: {
                        ...userData.businessDetails?.businessAddress,
                        state: e.target.value
                      }
                    }
                  })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="ZIP/Postal Code"
                  value={userData.businessDetails?.businessAddress?.zipCode || ''}
                  onChange={(e) => setUserData({
                    ...userData,
                    businessDetails: {
                      ...userData.businessDetails,
                      businessAddress: {
                        ...userData.businessDetails?.businessAddress,
                        zipCode: e.target.value
                      }
                    }
                  })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Country"
                  value={userData.businessDetails?.businessAddress?.country || ''}
                  onChange={(e) => setUserData({
                    ...userData,
                    businessDetails: {
                      ...userData.businessDetails,
                      businessAddress: {
                        ...userData.businessDetails?.businessAddress,
                        country: e.target.value
                      }
                    }
                  })}
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Business Phone"
                  value={userData.businessDetails?.businessPhone || ''}
                  onChange={(e) => setUserData({
                    ...userData,
                    businessDetails: {
                      ...userData.businessDetails,
                      businessPhone: e.target.value
                    }
                  })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Business Email"
                  value={userData.businessDetails?.businessEmail || ''}
                  onChange={(e) => setUserData({
                    ...userData,
                    businessDetails: {
                      ...userData.businessDetails,
                      businessEmail: e.target.value
                    }
                  })}
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Industry"
                  value={userData.businessDetails?.industry || ''}
                  onChange={(e) => setUserData({
                    ...userData,
                    businessDetails: {
                      ...userData.businessDetails,
                      industry: e.target.value
                    }
                  })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Year Established"
                  type="number"
                  value={userData.businessDetails?.yearEstablished || ''}
                  onChange={(e) => setUserData({
                    ...userData,
                    businessDetails: {
                      ...userData.businessDetails,
                      yearEstablished: e.target.value
                    }
                  })}
                  fullWidth
                />
              </Grid>
            </Grid>
          </>
        ) : (
          <Stack spacing={3}>
            {userData.businessDetails?.businessName && (
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Business Name</Typography>
                <Typography variant="body1">{userData.businessDetails.businessName}</Typography>
              </Box>
            )}
            
            {userData.businessDetails?.businessType && (
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Business Type</Typography>
                <Typography variant="body1">{userData.businessDetails.businessType}</Typography>
              </Box>
            )}

            <Grid container spacing={3}>
              {userData.businessDetails?.registrationNumber && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">Registration Number</Typography>
                  <Typography variant="body1">{userData.businessDetails.registrationNumber}</Typography>
                </Grid>
              )}
              
              {userData.businessDetails?.taxNumber && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">Tax Number</Typography>
                  <Typography variant="body1">{userData.businessDetails.taxNumber}</Typography>
                </Grid>
              )}
            </Grid>

            {userData.businessDetails?.businessAddress && (
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Business Address</Typography>
                <Typography variant="body1">
                  {[
                    userData.businessDetails.businessAddress.street,
                    userData.businessDetails.businessAddress.city,
                    userData.businessDetails.businessAddress.state,
                    userData.businessDetails.businessAddress.zipCode,
                    userData.businessDetails.businessAddress.country
                  ].filter(Boolean).join(', ')}
                </Typography>
              </Box>
            )}

            <Grid container spacing={3}>
              {userData.businessDetails?.businessPhone && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">Business Phone</Typography>
                  <Typography variant="body1">{userData.businessDetails.businessPhone}</Typography>
                </Grid>
              )}
              
              {userData.businessDetails?.businessEmail && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">Business Email</Typography>
                  <Typography variant="body1">{userData.businessDetails.businessEmail}</Typography>
                </Grid>
              )}
            </Grid>

            <Grid container spacing={3}>
              {userData.businessDetails?.industry && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">Industry</Typography>
                  <Typography variant="body1">{userData.businessDetails.industry}</Typography>
                </Grid>
              )}
              
              {userData.businessDetails?.yearEstablished && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">Year Established</Typography>
                  <Typography variant="body1">{userData.businessDetails.yearEstablished}</Typography>
                </Grid>
              )}
            </Grid>
          </Stack>
        )}
      </Stack>
    </Card>
  );

  const renderSocialLinks = () => (
    <Card elevation={0} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Social Media Links
      </Typography>
      <Stack spacing={3}>
        {isEditing ? (
          <>
            <TextField
              label="LinkedIn URL"
              value={userData.socialLinks?.linkedin || ''}
              onChange={(e) => setUserData({
                ...userData,
                socialLinks: { ...userData.socialLinks, linkedin: e.target.value }
              })}
              fullWidth
              InputProps={{
                startAdornment: <LinkedInIcon sx={{ mr: 1, color: '#0077b5' }} />
              }}
            />
            <TextField
              label="Twitter URL"
              value={userData.socialLinks?.twitter || ''}
              onChange={(e) => setUserData({
                ...userData,
                socialLinks: { ...userData.socialLinks, twitter: e.target.value }
              })}
              fullWidth
              InputProps={{
                startAdornment: <TwitterIcon sx={{ mr: 1, color: '#1DA1F2' }} />
              }}
            />
            <TextField
              label="Website URL"
              value={userData.socialLinks?.github || ''}
              onChange={(e) => setUserData({
                ...userData,
                socialLinks: { ...userData.socialLinks, github: e.target.value }
              })}
              fullWidth
              InputProps={{
                startAdornment: <LanguageIcon sx={{ mr: 1, color: 'primary.main' }} />
              }}
            />
          </>
        ) : (
          <Stack spacing={2}>
            {userData.socialLinks?.linkedin && (
              <Button
                variant="outlined"
                startIcon={<LinkedInIcon />}
                href={userData.socialLinks.linkedin}
                target="_blank"
                sx={{ justifyContent: 'flex-start' }}
              >
                LinkedIn Profile
              </Button>
            )}
            {userData.socialLinks?.twitter && (
              <Button
                variant="outlined"
                startIcon={<TwitterIcon />}
                href={userData.socialLinks.twitter}
                target="_blank"
                sx={{ justifyContent: 'flex-start' }}
              >
                Twitter Profile
              </Button>
            )}
            {userData.socialLinks?.github && (
              <Button
                variant="outlined"
                startIcon={<LanguageIcon />}
                href={userData.socialLinks.github}
                target="_blank"
                sx={{ justifyContent: 'flex-start' }}
              >
                GitHub Profile
              </Button>
            )}
            {!userData.socialLinks?.linkedin && !userData.socialLinks?.twitter && !userData.socialLinks?.github && (
              <Typography color="text.secondary">No social links added yet</Typography>
            )}
          </Stack>
        )}
      </Stack>
    </Card>
  );

  const renderSecuritySettings = () => (
    <Card elevation={0} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Security Settings
      </Typography>
      <Stack spacing={3}>
        <Card variant="outlined" sx={{ p: 2 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="subtitle1" fontWeight="medium">
                Password
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Change your account password
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<SecurityIcon />}
              onClick={() => setOpenPasswordDialog(true)}
              sx={{
                background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
              }}
            >
              Change Password
            </Button>
          </Stack>
        </Card>

        <Card variant="outlined" sx={{ p: 2 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="subtitle1" fontWeight="medium" color="error">
                Delete Account
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Permanently delete your account and all data
              </Typography>
            </Box>
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleDeleteAccount()}
            >
              Delete Account
            </Button>
          </Stack>
        </Card>
      </Stack>
    </Card>
  );

  const renderPasswordDialog = () => (
    <Dialog 
      open={openPasswordDialog} 
      onClose={() => setOpenPasswordDialog(false)}
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle>
        <Stack direction="row" alignItems="center" spacing={1}>
          <SecurityIcon color="primary" />
          <Typography variant="h6">Change Password</Typography>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 2, minWidth: 400 }}>
          <TextField
            type="password"
            label="Current Password"
            value={passwordData.currentPassword}
            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
            fullWidth
            required
          />
          <TextField
            type="password"
            label="New Password"
            value={passwordData.newPassword}
            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
            fullWidth
            required
            helperText="Password must be at least 6 characters long"
          />
          <TextField
            type="password"
            label="Confirm New Password"
            value={passwordData.confirmPassword}
            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
            error={passwordData.newPassword !== passwordData.confirmPassword}
            helperText={passwordData.newPassword !== passwordData.confirmPassword ? "Passwords don't match" : ''}
            fullWidth
            required
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={() => setOpenPasswordDialog(false)}>
          Cancel
        </Button>
        <Button 
          onClick={handlePasswordChange} 
          variant="contained"
          disabled={
            !passwordData.currentPassword ||
            !passwordData.newPassword ||
            passwordData.newPassword !== passwordData.confirmPassword ||
            passwordData.newPassword.length < 6
          }
          sx={{
            background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
          }}
        >
          Update Password
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box
      py={6}
      sx={{
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
          : 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)',
        minHeight: '100vh'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Left Column - Profile Image and Tabs */}
          <Grid item xs={12} md={4}>
            <Card 
              elevation={0}
              sx={{ 
                position: 'sticky',
                top: 40,
                borderRadius: 2,
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(145deg, #2d2d2d 0%, #1a1a1a 100%)'
                  : 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
              }}
            >
              <CardContent>
                <Box sx={{ position: 'relative', mb: 3 }}>
                  <Avatar
                    src={`${process.env.REACT_APP_API_URL}${userData.avatar}`}
                    sx={{
                      width: 150,
                      height: 150,
                      mx: 'auto',
                      border: '4px solid white',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                    }}
                  />
                  {isEditing && (
                    <IconButton
                      component="label"
                      sx={{
                        position: 'absolute',
                        bottom: -10,
                        right: '50%',
                        transform: 'translateX(75px)',
                        bgcolor: 'background.paper',
                        boxShadow: 1,
                      }}
                    >
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                      <PhotoCameraIcon />
                    </IconButton>
                  )}
                </Box>

                <Typography variant="h5" align="center" gutterBottom>
                  {`${userData.firstName} ${userData.lastName}`}
                </Typography>

                <Tabs
                  orientation="vertical"
                  value={activeTab}
                  onChange={(e, newValue) => setActiveTab(newValue)}
                  sx={{
                    borderRight: 1,
                    borderColor: 'divider',
                    '& .MuiTab-root': {
                      minHeight: 48,
                      justifyContent: 'flex-start',
                    }
                  }}
                >
                  <Tab icon={<PersonIcon />} label="Profile" iconPosition="start" />
                  <Tab icon={<BusinessIcon />} label="Business" iconPosition="start" />
                  <Tab icon={<LanguageIcon />} label="Social" iconPosition="start" />
                  <Tab icon={<SettingsIcon />} label="Settings" iconPosition="start" />
                  <Tab icon={<SecurityIcon />} label="Security" iconPosition="start" />
                </Tabs>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Column - Content */}
          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
              {isEditing ? (
                <>
                  <Button 
                    variant="contained" 
                    onClick={handleSubmit} 
                    sx={{ 
                      mr: 1,
                      background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
                    }}
                  >
                    Save Changes
                  </Button>
                  <Button 
                    variant="outlined" 
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  variant="contained"
                  startIcon={<EditIcon />}
                  onClick={() => setIsEditing(true)}
                  sx={{
                    background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
                  }}
                >
                  Edit Profile
                </Button>
              )}
            </Box>

            <Card elevation={0} sx={{ borderRadius: 2 }}>
              <CardContent>
                <TabPanel value={activeTab} index={0}>
                  {renderProfileInfo()}
                </TabPanel>
                <TabPanel value={activeTab} index={1}>
                  {renderBusinessDetails()}
                </TabPanel>
                <TabPanel value={activeTab} index={2}>
                  {renderSocialLinks()}
                </TabPanel>
                <TabPanel value={activeTab} index={3}>
                  <UserSettings />
                </TabPanel>
                <TabPanel value={activeTab} index={4}>
                  {renderSecuritySettings()}
                </TabPanel>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {renderPasswordDialog()}
    </Box>
  );
};

export default UserProfile; 