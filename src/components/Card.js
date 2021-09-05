import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const parseISOString = (s) => {
  var b = s.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
};

const useStyles = makeStyles({
  root: {
    maxWidth: 515,
    maxHeight: 365,
  },
  header: {
    whiteSpace: "nowrap",
    width: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
});

const CardComponent = ({ title, content, author, time, image }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Placeholder Thumbnail"
          height="140"
          image={image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography
            variant="h4"
            component="h2"
            className={classes.header}
            gutterBottom
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            gutterBottom
          >
            <span
              dangerouslySetInnerHTML={{
                __html: content.substr(0, 250) + "...",
              }}
            ></span>
          </Typography>
          <Typography variant="body1" component="p" align="right">
            By {author} on {parseISOString(time).toDateString()}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardComponent;
