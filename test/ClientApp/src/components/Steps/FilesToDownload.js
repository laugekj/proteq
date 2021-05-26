import React, {useEffect, useState} from 'react';
import DownloadLink from "react-download-link";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
export function FilesToDownload() {
    
    const [myFilesId, setMyFilesId] = useState([]);
    const [myFileNames, setMyFileNames] = useState([]);

    useEffect(()=>{
        getAllFilesAssociatedToStepId(45)
      }, []);
    

    function getAllFilesAssociatedToStepId(stepId) {
        fetch('api/download/' + stepId, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            }
        }).then(response => {
            console.log(response);

            response.json().then(json => 
                json.forEach(obj => {
                    console.log(obj);
                    setMyFileNames( arr => [...arr, `${obj.fileName}`]);
                    setMyFilesId(arr => [...arr, `${obj.myFilesId}`]);
                }));

                


            });
    }

    function downloadFile(fileName, fileId) {
        fetch('api/download/GetFileById/' + fileId, { method: 'GET' })
            .then(response => {
                response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = fileName;
                    a.click();                 
                });
                
            });
    }

    function requestFileDownload(fileName, arrayIndex) {
        // convert arrayIndex to fileId
        downloadFile(fileName, myFilesId[arrayIndex])
    }


return ( 
    <Container component="main" maxWidth="xs">
        <div>{myFileNames.map((fileName, index) =>
        <p onClick={e => requestFileDownload(fileName, index)}>{ fileName }</p>
        )}
        </div>

            <DownloadLink
            label="Download fil"
            exportFile={() => Promise.resolve(e => downloadFile(45))}
        />
         
    </Container>
    )
}