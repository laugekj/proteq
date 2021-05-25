import React, { useState, useEffect, Component } from 'react';
import Container from "@material-ui/core/Container";
import DownloadLink from "react-download-link";
import Button from "@material-ui/core/Button";

export function DownloadFile() {
    //const data = { FileType : FileType, FileData : FileData };
    const [file, setFile] = useState();

    useEffect(() => {
        const getFile = localStorage.getItem("file");
        if (getFile != null) {
            const foundFile = JSON.parse(getFile);
            setFile(foundFile);
            
        }
    }, []);
    function getFiles(id) {
        
        fetch('api/file/' + 45, { method: 'GET' }).then(response => {
            return response.blob();
            })
            .then((responseJson) => {
                    setFile(responseJson);
                    localStorage.setItem('file', JSON.stringify(responseJson))
                });
        
    }
    function displayFiles() {
        fetch('api/file/' + 45, { method: 'GET' })
            .then(response => {
                response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = url;
                    a.click();                 
                });
                
            });
    }

    //function getAllFiles({ serverfiles }) {

    //    const [files, setFiles] = useState(serverfiles);

    //    const onComplete = (inputFile) => {
    //        const newFiles = [];
    //        files.forEach((file) => {
    //            if (file.id === inputFile.id) {
    //                file.completed = !file.completed;
    //                // Do some database stuff
    //            }
    //            newFiles.push(file);
    //        });
    //        setFiles(newFiles);
    //    };
    //}
    
return ( 
    <Container component="main" maxWidth="xs">
        <h1>Download filer</h1>
   
            <DownloadLink
            label="Download fil"
            exportFile={() => Promise.resolve(displayFiles())}
        />
         
        
        <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={getFiles}> Hent filer
        </Button>
    </Container>
    )
}
