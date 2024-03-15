import React, { useState } from 'react';
import FileUpload from './Components/FileUpload';
import BoundingBoxDisplay from './Components/BouncingBox'
import TextImageEditing from './Components/TextImageEditing';
import SaveChanges from './Components/SaveChanges';
import { createWorker } from 'tesseract.js';
import * as pdfjs from 'pdfjs-dist';


const App = () => {
  const [boundingBoxes, setBoundingBoxes] = useState([]);

  const handleFileUpload = async (file) => {
    if (file.type === 'application/pdf') {
      await handlePdfFile(file);
    } else if (file.type === 'application/vnd.ms-powerpoint' || file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
      await handlePptFile(file);
    } else {
      alert('Unsupported file format');
    }
  };

  const handlePdfFile = async (file) => {
    const worker = createWorker({
      logger: m => console.log(m),
    });
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data } = await worker.recognize(file);
    setBoundingBoxes(data.words.map(word => word.bbox));
    await worker.terminate();
  };

  const handlePptFile = async (file) => {
    const fileReader = new FileReader();
    fileReader.onload = async () => {
      const arrayBuffer = fileReader.result;
      const pdfData = new Uint8Array(arrayBuffer);
      const loadingTask = pdfjs.getDocument({data: pdfData});
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1); // Change page number as required
      const viewport = page.getViewport({scale: 1.0}); // Change scale as required
      const textContent = await page.getTextContent();
      const boundingBoxes = textContent.items.map(item => item.transform);
      setBoundingBoxes(boundingBoxes);
    };
    fileReader.readAsArrayBuffer(file);
  };

  const handleSaveChanges = () => {
    // Implement save changes functionality
    alert('Changes saved successfully');
  };

  return (
    <div>
      <FileUpload onFileUpload={handleFileUpload} />
      <BoundingBoxDisplay boundingBoxes={boundingBoxes} />
      <TextImageEditing />
      <SaveChanges onSave={handleSaveChanges} />
    </div>
  );
};

export default App;
