import React, {useEffect, useState} from 'react';
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
export function FilesToDownload() {
    
    const [myFilesId, setMyFilesId] = useState([]);
    const [myFileNames, setMyFileNames] = useState([]);

    useEffect(()=>{
        const urlstring = window.location.href;
        const id = urlstring.split('?')[1];
        getAllFilesAssociatedToStepId(id)
      }, []);
    

    function getAllFilesAssociatedToStepId(stepId) {
        fetch('api/download/GetAllFilesFromStepId/' + stepId, {
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
                    setMyFilesId(arr => [...arr, `${obj.id}`]);
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
        <Button onClick={e => requestFileDownload(fileName, index)}>Hent { fileName }</Button>
        )}
        </div>
        
    </Container>
    )
}