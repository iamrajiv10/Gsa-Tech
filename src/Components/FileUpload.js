import React, { useState } from 'react';
import { createWorker } from 'tesseract.js';

const FileUpload = ({ onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    onFileUpload(file);
  };

  return (
    <div>
      <input type="file" accept=".pdf,.ppt,.pptx" onChange={handleFileChange} />
    </div>
  );
};

export default FileUpload;
