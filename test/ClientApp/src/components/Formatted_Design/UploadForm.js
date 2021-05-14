import React, { useState } from "react";
import axios from "axios";

export const UploadForm = () => {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();
  const [fileType, setFileType] = useState();

  const saveFile = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    setFileType(e.target.files[0].type);
  };

  const uploadFile = async (e) => {
    e.preventDefault();
    console.log(file);
    const formData = new FormData();
    formData.append("formFile", file);
    formData.append("type", fileType);
    formData.append("fileName", fileName);

    try {
      const res = await axios.post("http://localhost:5000/api/file", formData);
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  };


  const getImage = async (e) => {
    e.preventDefault();
    //const data = {Id: 2}
    fetch('api/file/2', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }//,
        //body: JSON.stringify(data)
    }).then(response => {
        console.log('SERVER RESPONSE: ', response.json)
    });
  };

  return (
    <form onSubmit={uploadFile}>
    <label>
      Upload file:
      <input type="file" onChange={saveFile} />
    </label>
    <br />
    <button type="submit">Submit</button>
  </form>

  
  );
};