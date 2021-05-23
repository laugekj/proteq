import React, { useState, useEffect, Component } from 'react';
import Container from "@material-ui/core/Container";
import DownloadLink from "react-download-link";
import Button from "@material-ui/core/Button";

function DownloadFile() {
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
        return response.json();
        })
        .then((responseJson) {
            setFile(responseJson);
            localStorage.setItem('file', JSON.stringify(responseJson))
        });
    }

    
return ( 
    <Container component="main" maxWidth="xs">
        <h1>Download filer</h1>
         <DownloadLink
        label="Download fil"
            filename="myfile.txt"
            exportFile={() => getFiles()}
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

export default DownloadFile;