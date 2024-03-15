import React from 'react';

const SaveChanges = ({ onSave }) => {
  const handleSave = () => {
    // Call onSave function to save changes
    onSave();
  };

  return (
    <button onClick={handleSave}>Save Changes</button>
  );
};

export default SaveChanges;
