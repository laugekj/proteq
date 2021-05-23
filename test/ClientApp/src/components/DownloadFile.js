import { Container } from "@material-ui/core";
import DownloadLink from "react-download-link";

//function DownloadFile() {
//    const data = { FileType = FileType, FileData = FileData };

//    fetch('api/fileModel', {
//        method: 'GET', // or 'PUT'
//        headers: {
//            'Content-Type': 'application/json',
//        },
//        body: JSON.stringify(data),
//    }).then(response => {
//        console.log(response);
//        // 201 is "Created" (success)
//        if (response.status === 201) {
//            handleClose();
//            console.log("File returned", data)
//        } else {
//            // waah, error handler
//        }
//    });
//}

export class FetchFiles extends Component {
    static displayName = FetchFiles.name;

    constructor(props) {
        super(props);
        this.state = { users: [], loading: true };

        this.populateUserData = this.populateUserData.bind(this);
        this.forceRefetch = this.forceRefetch.bind(this);

    }

    componentDidMount() {
        this.populateUserData(false);
    }


    forceRefetch() {
        console.log("refetch pls");
        this.populateUserData(false);
    }

    async populateUserData(bool) {
        const response = await fetch('api/user');
        const data = await response.json();
        this.setState({ users: data, loading: bool });
    }

return ( 
    <Container component="main" maxWidth="xs">
        <h1>Download filer</h1>
         <DownloadLink
        label="Save"
        filename="myfile.txt"
        exportFile={() => "My cached data"}
        />

        <Button
            //  type="submit"
            fullWidth
            variant="contained"
            color="primary"
            // className={classes.submit}
            onClick={() => DownloadFile()}
        > </Button>
    </Container>
)