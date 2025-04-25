import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/api';
import StripeOnboarding from '../../StripeOnboarding/StripeOnboarding';

const StripeStatus = () => {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkStripeStatus = async () => {
      try {
        // Get the access token from localStorage
        const accessToken = localStorage.getItem('accessToken');
        
        if (!accessToken) {
          // If no access token, redirect to login
          navigate('/login?role=locksmith');
          return;
        }

        // Set the authorization header
        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        
        // Make the GET request to check onboarding status
        const response = await api.get('/api/locksmiths/check_onboarding_status/');
        
        if (response.data) {
          setIsOnboarded(true);
        } else {
          setIsOnboarded(false);
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          // Unauthorized - redirect to login
          navigate('/login?role=locksmith');
        } else {
          setError('Error checking Stripe status. Please try again.');
          console.error('Error checking Stripe status:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    checkStripeStatus();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  return (
    <div>
      {isOnboarded ? (
        <>
          <div className="alert alert-success">
            Stripe account already created.
          </div>
          <StripeOnboarding /> {/* Make sure to import your StripeOnboard component */}
        </>
      ) : (
        navigate('/create-stripe')
      )}
    </div>
  );
};

export default StripeStatus;