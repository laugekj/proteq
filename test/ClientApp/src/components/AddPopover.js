import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import AddUser from './AddUser';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export default function SimplePopover({refetch}) {
   // const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    
  };

  const handleClose = () => {
    setAnchorEl(null);
  

  };

  const forceRefetch = () => {
     
      setAnchorEl(null);
      refetch();
  }

  


  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>

    <IconButton 
    aria-describedby={id}
    color="secondary" 
    aria-label="Rediger"
    variant="contained"
    onClick={handleClick}
    >
        <AddIcon />
    </IconButton>
      
      
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
       <AddUser handleClose={forceRefetch}></AddUser>
      </Popover>
    </div>
  );
}