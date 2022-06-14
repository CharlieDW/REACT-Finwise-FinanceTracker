import { useState, useEffect } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from '../hooks/useAuthContext';

const useSignup = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();
  const [isCancelled, setIsCancelled] = useState(false);

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    try {
      // sign user up
      const res = await projectAuth.createUserWithEmailAndPassword(email, password);

      if (!res) {
        throw new Error('Could not complete sign up.');
      }

      // update user's display name
      await res.user.updateProfile({ displayName });

      // dispatch login function
      dispatch({
        type: 'LOGIN',
        payload: res.user,
      });

      if (!isCancelled) {
        console.log('hello from state update');
        setIsPending(false);
        setError(null);
      }
    } catch (e) {
      console.log(e.message);
      if (!isCancelled) {
        setError(e.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    setIsCancelled(false);
    return () => setIsCancelled(true);
  }, []);

  return { isPending, error, signup };
};

export default useSignup;
