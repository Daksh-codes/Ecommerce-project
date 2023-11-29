import React, { useState } from 'react';


const ProductInsert = () => {
  const [files, setFiles
  ] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });


  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input type="file" name="file" onChange={handleFileChange} multiple />
      <button type="submit">Upload</button>
    </form>
  );
};

export default ProductInsert ;
