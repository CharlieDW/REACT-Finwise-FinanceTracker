import { useState, useEffect } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setIsPending(true);
    setError(null);

    try {
      // log user out from FB
      await projectAuth.signOut();

      // dispatch logout action
      dispatch({
        type: 'LOGOUT',
      });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (e) {
      console.log('Logout - ' + e.message);
      if (!isCancelled) {
        setIsPending(false);
        setError(e.message);
      }
    }
  };

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return { logout, isPending, isCancelled, error };
};
