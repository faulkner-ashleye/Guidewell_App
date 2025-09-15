import React, { useState, useRef } from 'react';

type Props = { onParsed:(accounts:any[])=>void };
export default function DocUpload({ onParsed }:Props){
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      
      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target?.result as string);
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    }
  };

  const handleCameraCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      
      // Create preview for camera capture
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Simulate document parsing
      const mockAccount = {
        id: crypto.randomUUID(),
        type: 'loan' as const,
        name: `Parsed ${selectedFile.type.startsWith('image/') ? 'Document' : 'PDF'}`,
        balance: Math.floor(Math.random() * 50000) + 10000, // Random balance between 10k-60k
        apr: Math.round((Math.random() * 8 + 3) * 100) / 100 // Random APR between 3-11%
      };
      
      onParsed([mockAccount]);
    }
  };

  const resetUpload = () => {
    setSelectedFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <h3>Upload Financial Documents</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
        Take a photo or upload a PDF of your bank statements, loan documents, or other financial records.
      </p>

      {/* Camera Capture */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
          📸 Take a Photo
        </label>
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleCameraCapture}
          style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
      </div>

      {/* File Upload */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
          📁 Upload File
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,application/pdf"
          onChange={handleFileSelect}
          style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
      </div>

      {/* Preview */}
      {preview && (
        <div style={{ marginBottom: '20px' }}>
          <h4>Preview:</h4>
          <img 
            src={preview} 
            alt="Document preview" 
            style={{ maxWidth: '100%', maxHeight: '200px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
        </div>
      )}

      {/* File Info */}
      {selectedFile && (
        <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
          <p><strong>File:</strong> {selectedFile.name}</p>
          <p><strong>Size:</strong> {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
          <p><strong>Type:</strong> {selectedFile.type}</p>
        </div>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', gap: '10px' }}>
        {selectedFile && (
          <>
            <button 
              onClick={handleUpload}
              style={{ 
                flex: 1, 
                padding: '12px', 
                backgroundColor: '#007bff', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Parse Document
            </button>
            <button 
              onClick={resetUpload}
              style={{ 
                padding: '12px', 
                backgroundColor: '#6c757d', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Reset
            </button>
          </>
        )}
      </div>

      {/* Sample Button for Testing */}
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#fff3cd', borderRadius: '4px' }}>
        <p style={{ fontSize: '12px', margin: '0 0 10px 0', color: '#856404' }}>
          For testing purposes:
        </p>
        <button 
          onClick={() => onParsed([{ 
            id: crypto.randomUUID(), 
            type: 'loan' as const, 
            name: 'Sample Student Loan', 
            balance: 24000, 
            apr: 6.8 
          }])}
          style={{ 
            padding: '8px 12px', 
            backgroundColor: '#ffc107', 
            color: '#000', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          Parse Sample Document
        </button>
      </div>
    </div>
  );
}