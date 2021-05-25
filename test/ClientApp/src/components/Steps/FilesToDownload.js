
import React, { useState, useEffect } from 'react';
import DownloadLink from "react-download-link";



export function FilesToDownload() {
  
function getFilesFromStep(stepId) {
    
    console.log("stepId input: ", stepId);
        fetch('api/download/' + stepId, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            }
        }).then(response => {
            console.log(response);

            response.json().then(json => 
                
                json.forEach(obj => {
                console.log(obj)

                let myBlob = new Blob([obj.fileContents], {type: obj.contentType});

                let url = window.URL.createObjectURL(myBlob);
                let a = document.createElement('a');
                a.href = url;
                a.download = url;
                a.click();

                URL.revokeObjectURL(a.href);

                }));
            });
}


return (
    <div>
                    <DownloadLink
                label="Download fil"
                exportFile={() => Promise.resolve(getFilesFromStep(45))}
                />
</div>
 );

}