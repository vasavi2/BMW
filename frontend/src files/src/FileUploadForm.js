
import React, { useState } from 'react';
import { Container, Grid, TextField, Select, MenuItem, Button, TextareaAutosize } from '@mui/material';
import Copilot from './Copilot';
import "./style.css"
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios';
 
const FileUploadForm = () => {
  const [selectedType, setSelectedType] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileNames, setFileNames] = useState('');
  const [submitForm, setSubmitForm] = useState(false);
 
  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };
 
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
const names = files.map(file => file.name).join(', ');
    setFileNames(names);
  };
 
//   const handleSubmit = async () => {
//     const formData = new FormData();
//     selectedFiles.forEach((file, index) => {

//       // console.log("selectedFiles--->",file["name"])
//       formData.append(`file${index + 1}`, file["name"]);
//     });

 
//     try {
// const response = await axios.post('http://127.0.0.1:9008/receive_data_final_final2', formData);
//       console.log("response----->",response.data);

//       setSubmitForm(true);
//       alert("Files uploaded successfully!");
//     } catch (error) {
//       console.error("Error uploading files:", error);
//     }
//   };


const handleSubmit = async () => {
  const fileNames = selectedFiles.map(file => file.name);

  try {
    const response = await axios.post('http://127.0.0.1:9008/receive_data_final_final2', {
      files: fileNames
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log("response----->", response.data);

    setSubmitForm(true);
    alert("File names uploaded successfully!");
  } catch (error) {
    console.error("Error uploading file names:", error);
  }
};



 
  return (
    <div className='app'>
      {
        submitForm ? (
          <div >
            <Copilot />
          </div>
        ) : (
          <Container maxWidth="md" style={{ marginTop: '50px', marginLeft: "300px" }}>
            <h2 style={{ color: "white", marginLeft: "220px" }}>Upload The Test Case File</h2>
            <Grid container justifyContent="center">
              <Grid item xs={12} md={6}>
                <form>
                  <div style={{ border: "2px solid #ADD8E6", padding: "20px", height: "430px", width: "370px", backgroundColor: "white", marginTop: "20px", borderRadius: "20px" }}>
                    <h2 style={{ textAlign: "center", color: "black" }}>Upload Files</h2>
                    <div style={{ marginTop: "20px" }}>
                      <label>Choose File Type:</label>
                      <TextField
                        select
                        value={selectedType}
                        onChange={handleTypeChange}
                        fullWidth
                      >
                        <MenuItem value="">Choose type</MenuItem>
                        <MenuItem value="pdf">PDF</MenuItem>
                        <MenuItem value="xlsx">Excel</MenuItem>
                        <MenuItem value="csv">CSV</MenuItem>
                      </TextField>
                    </div>
                    <div style={{ marginTop: "20px" }}>
                      <label>
                        Upload {selectedType && `${selectedType.toUpperCase()} `} files:
                        <input
                          type="file"
                          multiple
                          onChange={handleFileChange}
                          accept={`.${selectedType}`}
                          style={{ display: "none" }}
                          id="fileInput"
                        />
                        <label htmlFor="fileInput">
                          <Button variant="contained" component="span" style={{ marginLeft: "10px", width: "180px", position: "fixed", bottom: "270px" }}>
                            Choose Files
                          </Button>
                        </label>
                      </label>
                    </div>
                    <div style={{ marginTop: "20px" }}>
                      <label>Selected Files:</label>
                      <TextareaAutosize
                        value={fileNames}
                        readOnly
                        style={{ width: '100%', height: '100px' }}
                      />
                    </div>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ marginTop: "20px", float: "right" }}
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              </Grid>
            </Grid>
          </Container>
        )
      }
    </div>
  );
};
 
export default FileUploadForm;