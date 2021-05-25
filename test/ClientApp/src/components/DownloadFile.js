import React, { useState, useEffect, Component } from 'react';
import Container from "@material-ui/core/Container";
import DownloadLink from "react-download-link";
import Button from "@material-ui/core/Button";

export function DownloadFile() {
    const [file, setFile] = useState();
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const getFile = localStorage.getItem("file");
        if (getFile != null) {
            const foundFile = JSON.parse(getFile);
            setFile(foundFile);

        }
    }, []);

    const getFiles = () =>
        files.push("fileName1", "fileName2", "fileName3");
    console.log("HALLO", files);

    function getFile(id) {

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
                    getFile();
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;

                    a.download = url;
                    a.click();

                });

            });
    }

    getFiles();


    const listFiles = files.map((files) =>
        <li>{files}</li>
    );

    return (
        <Container component="main" maxWidth="xs">
            <React.StrictMode>
                <ul>{listFiles}</ul>
            </React.StrictMode>
            <DownloadLink
                label="Download fil"
                exportFile={() => Promise.resolve(displayFiles())}
            />


            {/*<Button*/}
            {/*    fullWidth*/}
            {/*    variant="contained"*/}
            {/*    color="primary"*/}
            {/*    onClick={getFile}> Hent filer*/}
            {/*</Button>*/}
        </Container>
    )
}
