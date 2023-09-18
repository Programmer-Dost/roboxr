// components/ConfirmLeave.js

import { useEffect } from 'react';

const ConfirmLeave = () => {
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      // Display a confirmation message to the user
      e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
    };

    // Add the event listener when the component mounts
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return null;
};

export default ConfirmLeave;
