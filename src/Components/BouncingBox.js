import React from 'react';

const BoundingBoxDisplay = ({ boundingBoxes }) => {
  return (
    <div>
      {boundingBoxes.map((box, index) => (
        <div key={index} style={{
          position: 'absolute',
          border: '2px solid red',
          left: `${box.x}px`,
          top: `${box.y}px`,
          width: `${box.width}px`,
          height: `${box.height}px`,
        }}></div>
      ))}
    </div>
  );
};

export default BoundingBoxDisplay;
