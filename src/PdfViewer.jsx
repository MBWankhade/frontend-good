import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { pdfjs } from 'react-pdf';

const PdfViewer = ({ pdfBuffer }) => {
  const pdfData = new Uint8Array(pdfBuffer.data);

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}>
        <Viewer fileUrl={pdfData} />
      </Worker>
    </div>
  );
};

export default PdfViewer;
