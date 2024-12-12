import React, { useContext, useEffect } from 'react';
import RouterPage from '../src/router.jsx';
import { DataContext } from './components/DataProvider/Data.jsx';
import { Type } from './utilities/action.type.js';
import { auth } from './utilities/firebase.js';

function App() { 
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
    // Subscribe to authentication state changes
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // If user is authenticated, update the context
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        // If user is not authenticated, set user to null
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });

    // Cleanup function to unsubscribe from auth listener
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <RouterPage />
    </>
  );
}

export default App;
