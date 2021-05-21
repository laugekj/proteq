function DownloadFile() {
    const data = { FileType = FileType, FileData = FileData };

    fetch('api/fileModel', {
        method: 'GET', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => {
        console.log(response);
        // 201 is "Created" (success)
        if (response.status === 201) {
            handleClose();
            console.log("File returned", data)
        } else {
            // waah, error handler
        }
    });
}

return (
    <Container component="main" maxWidth="xs">
        <Button
            //  type="submit"
            fullWidth
            variant="contained"
            color="primary"
            // className={classes.submit}
            onClick={() => DownloadFile()}
        >
    </Container>
    )