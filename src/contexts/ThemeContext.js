import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { getDesignTokens } from '../theme';
import axios from 'axios';

export const ThemeContext = createContext({
  mode: 'system',
  toggleTheme: () => {},
  setThemeMode: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('system');

  // Get user preferences from database on mount
  useEffect(() => {
    const getUserPreferences = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/preferences`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          if (response.data.preferences) {
            // Set theme preference
            setMode(response.data.preferences.theme || getSystemTheme());
          } else {
            // Use system defaults if no preferences saved
            setMode(getSystemTheme());
          }
        } else {
          // Not logged in - use system defaults
          setMode(getSystemTheme());
        }
      } catch (error) {
        console.error('Error fetching user preferences:', error);
        // Fallback to system defaults
        setMode(getSystemTheme());
      }
    };

    getUserPreferences();
  }, []);

  // Get system theme preference
  const getSystemTheme = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  // Listen for system theme changes
  useEffect(() => {
    if (mode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => {
        setMode(getSystemTheme());
      };
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [mode]);

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    updateUserPreferences({ theme: newMode });
  };

  const setThemeMode = (newMode) => {
    setMode(newMode);
    updateUserPreferences({ theme: newMode });
  };

  // Update user preferences in database
  const updateUserPreferences = async (preferences) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await axios.put(
          `${process.env.REACT_APP_API_URL}/api/auth/preferences`,
          preferences,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
      }
    } catch (error) {
      console.error('Error updating user preferences:', error);
    }
  };

  const actualMode = mode === 'system' ? getSystemTheme() : mode;
  const theme = useMemo(() => createTheme(getDesignTokens(actualMode)), [actualMode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, setThemeMode }}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
