import React, { useEffect, useState } from "react";
import { Button } from 'reactstrap';

function StepFilesButton({stepId}) {

    const [myFilesId, setMyFilesId] = useState([]);
    const [myFileNames, setMyFileNames] = useState([]);

    useEffect(()=>{
        getAllFilesAssociatedToStepId(stepId)
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

    function removeSelectedFile(arrayIndex) {
        var selectedFileId = myFilesId[arrayIndex];

        fetch('api/file/' + selectedFileId, { method: 'DELETE' })
        .then(response => {
            if (response.status === 200) {
                myFileNames.splice(arrayIndex, 1);
                myFilesId.splice(arrayIndex, 1);
            }
            
        });
    }

  return (
    <div>{myFileNames.map((fileName, index) =>
        <Button onClick={e => removeSelectedFile(index)}>Fjern { fileName }</Button>
        )}
        </div>
  );
}
export default StepFilesButton;