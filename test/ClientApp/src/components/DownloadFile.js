import React, { useState, useEffect, Component } from 'react';
import Container from "@material-ui/core/Container";
import DownloadLink from "react-download-link";
import Button from "@material-ui/core/Button";

export function DownloadFile() {

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

    return (
            <Container component="main" maxWidth="xs">
                <DownloadLink
                label="Download fil"
                exportFile={() => Promise.resolve(displayFiles())}
                />
            </Container>
    )
}
