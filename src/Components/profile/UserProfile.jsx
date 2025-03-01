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

const TabPanel = ({ children, value, index, ...other }) => (
  <div role="tabpanel" hidden={value !== index} {...other}>
    {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
  </div>
);

const UserProfile = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    title: '',
    company: '',
    phone: '',
    location: '',
    bio: '',
    socialLinks: {
      linkedin: '',
      twitter: '',
      website: ''
    },
    businessDetails: {
      businessName: '',
      businessType: '',
      registrationNumber: '',
      taxNumber: '',
      businessAddress: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
      },
      businessPhone: '',
      businessEmail: '',
      businessWebsite: '',
      industry: '',
      yearEstablished: ''
    }
  });

  const [editForm, setEditForm] = useState({ ...profile });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (profile) {
      setEditForm(profile);
    }
  }, [profile]);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/me`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setProfile({
        ...profile,
        ...data,
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);
    
    // Add all other fields to formData
    Object.keys(editForm).forEach(key => {
      if (key === 'skills' || key === 'experience' || key === 'education' || key === 'socialLinks' || key === 'businessDetails') {
        formData.append(key, JSON.stringify(editForm[key]));
      } else {
        formData.append(key, editForm[key]);
      }
    });

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setProfile(updatedUser);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Add all fields to formData
    Object.keys(editForm).forEach(key => {
      if (key === 'skills' || key === 'experience' || key === 'education' || key === 'socialLinks' || key === 'businessDetails') {
        formData.append(key, JSON.stringify(editForm[key]));
      } else {
        formData.append(key, editForm[key]);
      }
    });

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setProfile(updatedUser);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      // Show error
      return;
    }
    
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });
      
      if (response.ok) {
        setOpenPasswordDialog(false);
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      }
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };

  const handleDeleteAccount = async () => {
    const confirm = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (!confirm) return;
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/delete-account`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        localStorage.removeItem('token');
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  const renderProfileInfo = () => (
    <Stack spacing={3}>
      {isEditing ? (
        <>
          <TextField
            label="Title"
            value={editForm.title}
            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
            fullWidth
          />
          <TextField
            label="Bio"
            value={editForm.bio}
            onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
            multiline
            rows={4}
            fullWidth
          />
          <TextField
            label="Company"
            value={editForm.company}
            onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
            fullWidth
          />
          <TextField
            label="Location"
            value={editForm.location}
            onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
            fullWidth
          />
          <TextField
            label="Phone"
            value={editForm.phone}
            onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
            fullWidth
          />
        </>
      ) : (
        <>
          <Typography variant="h6" color="primary">{profile.title}</Typography>
          <Typography variant="body1">{profile.bio}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <WorkIcon color="primary" />
            <Typography>{profile.company}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <LocationOnIcon color="primary" />
            <Typography>{profile.location}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <PhoneIcon color="primary" />
            <Typography>{profile.phone}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <EmailIcon color="primary" />
            <Typography>{profile.email}</Typography>
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
              value={editForm.businessDetails?.businessName || ''}
              onChange={(e) => setEditForm({
                ...editForm,
                businessDetails: {
                  ...editForm.businessDetails,
                  businessName: e.target.value
                }
              })}
              fullWidth
            />
            <TextField
              label="Business Type"
              value={editForm.businessDetails?.businessType || ''}
              onChange={(e) => setEditForm({
                ...editForm,
                businessDetails: {
                  ...editForm.businessDetails,
                  businessType: e.target.value
                }
              })}
              fullWidth
            />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Registration Number"
                  value={editForm.businessDetails?.registrationNumber || ''}
                  onChange={(e) => setEditForm({
                    ...editForm,
                    businessDetails: {
                      ...editForm.businessDetails,
                      registrationNumber: e.target.value
                    }
                  })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Tax Number"
                  value={editForm.businessDetails?.taxNumber || ''}
                  onChange={(e) => setEditForm({
                    ...editForm,
                    businessDetails: {
                      ...editForm.businessDetails,
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
                  value={editForm.businessDetails?.businessAddress?.street || ''}
                  onChange={(e) => setEditForm({
                    ...editForm,
                    businessDetails: {
                      ...editForm.businessDetails,
                      businessAddress: {
                        ...editForm.businessDetails?.businessAddress,
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
                  value={editForm.businessDetails?.businessAddress?.city || ''}
                  onChange={(e) => setEditForm({
                    ...editForm,
                    businessDetails: {
                      ...editForm.businessDetails,
                      businessAddress: {
                        ...editForm.businessDetails?.businessAddress,
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
                  value={editForm.businessDetails?.businessAddress?.state || ''}
                  onChange={(e) => setEditForm({
                    ...editForm,
                    businessDetails: {
                      ...editForm.businessDetails,
                      businessAddress: {
                        ...editForm.businessDetails?.businessAddress,
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
                  value={editForm.businessDetails?.businessAddress?.zipCode || ''}
                  onChange={(e) => setEditForm({
                    ...editForm,
                    businessDetails: {
                      ...editForm.businessDetails,
                      businessAddress: {
                        ...editForm.businessDetails?.businessAddress,
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
                  value={editForm.businessDetails?.businessAddress?.country || ''}
                  onChange={(e) => setEditForm({
                    ...editForm,
                    businessDetails: {
                      ...editForm.businessDetails,
                      businessAddress: {
                        ...editForm.businessDetails?.businessAddress,
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
                  value={editForm.businessDetails?.businessPhone || ''}
                  onChange={(e) => setEditForm({
                    ...editForm,
                    businessDetails: {
                      ...editForm.businessDetails,
                      businessPhone: e.target.value
                    }
                  })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Business Email"
                  value={editForm.businessDetails?.businessEmail || ''}
                  onChange={(e) => setEditForm({
                    ...editForm,
                    businessDetails: {
                      ...editForm.businessDetails,
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
                  value={editForm.businessDetails?.industry || ''}
                  onChange={(e) => setEditForm({
                    ...editForm,
                    businessDetails: {
                      ...editForm.businessDetails,
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
                  value={editForm.businessDetails?.yearEstablished || ''}
                  onChange={(e) => setEditForm({
                    ...editForm,
                    businessDetails: {
                      ...editForm.businessDetails,
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
            {profile.businessDetails?.businessName && (
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Business Name</Typography>
                <Typography variant="body1">{profile.businessDetails.businessName}</Typography>
              </Box>
            )}
            
            {profile.businessDetails?.businessType && (
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Business Type</Typography>
                <Typography variant="body1">{profile.businessDetails.businessType}</Typography>
              </Box>
            )}

            <Grid container spacing={3}>
              {profile.businessDetails?.registrationNumber && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">Registration Number</Typography>
                  <Typography variant="body1">{profile.businessDetails.registrationNumber}</Typography>
                </Grid>
              )}
              
              {profile.businessDetails?.taxNumber && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">Tax Number</Typography>
                  <Typography variant="body1">{profile.businessDetails.taxNumber}</Typography>
                </Grid>
              )}
            </Grid>

            {profile.businessDetails?.businessAddress && (
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Business Address</Typography>
                <Typography variant="body1">
                  {[
                    profile.businessDetails.businessAddress.street,
                    profile.businessDetails.businessAddress.city,
                    profile.businessDetails.businessAddress.state,
                    profile.businessDetails.businessAddress.zipCode,
                    profile.businessDetails.businessAddress.country
                  ].filter(Boolean).join(', ')}
                </Typography>
              </Box>
            )}

            <Grid container spacing={3}>
              {profile.businessDetails?.businessPhone && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">Business Phone</Typography>
                  <Typography variant="body1">{profile.businessDetails.businessPhone}</Typography>
                </Grid>
              )}
              
              {profile.businessDetails?.businessEmail && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">Business Email</Typography>
                  <Typography variant="body1">{profile.businessDetails.businessEmail}</Typography>
                </Grid>
              )}
            </Grid>

            <Grid container spacing={3}>
              {profile.businessDetails?.industry && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">Industry</Typography>
                  <Typography variant="body1">{profile.businessDetails.industry}</Typography>
                </Grid>
              )}
              
              {profile.businessDetails?.yearEstablished && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">Year Established</Typography>
                  <Typography variant="body1">{profile.businessDetails.yearEstablished}</Typography>
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
              value={editForm.socialLinks?.linkedin || ''}
              onChange={(e) => setEditForm({
                ...editForm,
                socialLinks: { ...editForm.socialLinks, linkedin: e.target.value }
              })}
              fullWidth
              InputProps={{
                startAdornment: <LinkedInIcon sx={{ mr: 1, color: '#0077b5' }} />
              }}
            />
            <TextField
              label="Twitter URL"
              value={editForm.socialLinks?.twitter || ''}
              onChange={(e) => setEditForm({
                ...editForm,
                socialLinks: { ...editForm.socialLinks, twitter: e.target.value }
              })}
              fullWidth
              InputProps={{
                startAdornment: <TwitterIcon sx={{ mr: 1, color: '#1DA1F2' }} />
              }}
            />
            <TextField
              label="Website URL"
              value={editForm.socialLinks?.website || ''}
              onChange={(e) => setEditForm({
                ...editForm,
                socialLinks: { ...editForm.socialLinks, website: e.target.value }
              })}
              fullWidth
              InputProps={{
                startAdornment: <LanguageIcon sx={{ mr: 1, color: 'primary.main' }} />
              }}
            />
          </>
        ) : (
          <Stack spacing={2}>
            {profile.socialLinks?.linkedin && (
              <Button
                variant="outlined"
                startIcon={<LinkedInIcon />}
                href={profile.socialLinks.linkedin}
                target="_blank"
                sx={{ justifyContent: 'flex-start' }}
              >
                LinkedIn Profile
              </Button>
            )}
            {profile.socialLinks?.twitter && (
              <Button
                variant="outlined"
                startIcon={<TwitterIcon />}
                href={profile.socialLinks.twitter}
                target="_blank"
                sx={{ justifyContent: 'flex-start' }}
              >
                Twitter Profile
              </Button>
            )}
            {profile.socialLinks?.website && (
              <Button
                variant="outlined"
                startIcon={<LanguageIcon />}
                href={profile.socialLinks.website}
                target="_blank"
                sx={{ justifyContent: 'flex-start' }}
              >
                Personal Website
              </Button>
            )}
            {!profile.socialLinks?.linkedin && !profile.socialLinks?.twitter && !profile.socialLinks?.website && (
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
                    src={`${process.env.REACT_APP_API_URL}${profile.avatar}`}
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
                  {`${profile.firstName} ${profile.lastName}`}
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