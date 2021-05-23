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
                    a.download = 'employees.json';
                    a.click();
                });
                window.location.href = response.url;
            });
    }
    

    
return ( 
    <Container component="main" maxWidth="xs">
        <h1>Download filer</h1>
         <DownloadLink
            label="Download fil"
            filename="file.txt"
            exportFile={() => Promise.resolve(displayFiles())}
        />
        
        <Button
            //  type="submit"
            fullWidth
            variant="contained"
            color="primary"
            // className={classes.submit}
            onClick={getFiles}> Hent filer
        </Button>
    </Container>
    )
}
