import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function Stripe() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://wwwmpa.mpa-garching.mpg.de/galform/cr/CR_TCDM_dump40_400_170000_12000_100_blue.gif"
          title="Produkt 1"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Produkt 1
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In semper ante enim, id fringilla nibh tincidunt vel. Proin ultricies ultrices est et sagittis. 
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Vælg produkt
        </Button>
      </CardActions>

      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://i.pinimg.com/474x/86/c7/ed/86c7eda19275d6f9cdc37b30f3046952.jpg"
          title="Produkt 2"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Produkt 2
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In semper ante enim, id fringilla nibh tincidunt vel. Proin ultricies ultrices est et sagittis. 
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Vælg produkt
        </Button>
      </CardActions>
    </Card>
  );
}

