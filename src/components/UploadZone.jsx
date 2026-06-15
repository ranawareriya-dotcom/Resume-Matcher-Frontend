import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function UploadZone({ onFileSelected, selectedFile }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onFileSelected(acceptedFiles[0]);
      }
    },
    [onFileSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive ? "active" : ""}`}
      >
        <input {...getInputProps()} />
        <div className="dropzone-icon">📄</div>
        {isDragActive ? (
          <p>Drop your resume here!</p>
        ) : (
          <>
            <p>Drag & drop your resume PDF here</p>
            <p className="dropzone-hint">or click to browse — PDF only, max 10MB</p>
          </>
        )}
      </div>

      {selectedFile && (
        <div className="file-selected">
          ✅ <strong>{selectedFile.name}</strong> ready to analyse
        </div>
      )}
    </div>
  );
}
