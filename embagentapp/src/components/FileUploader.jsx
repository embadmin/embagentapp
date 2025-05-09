import React from 'react'

const FileUploader = ({ files, setFiles }) => {
  const handleUpload = (e) => {
    setFiles([...e.target.files]);
  }

  return (
    <div className="p-4 border-2 border-dashed border-purple-500 rounded-lg text-white">
      <input
        type="file"
        multiple
        onChange={handleUpload}
        className="w-full"
      />
      <ul className="mt-2">
        {Array.from(files).map((file, i) => (
          <li key={i}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FileUploader;