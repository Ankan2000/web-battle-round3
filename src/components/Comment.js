import { Grid, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { createComment, getAllComments, isAuthenticated } from "./helper";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import styles from "./styles/comment.module.css";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import SendIcon from "@material-ui/icons/Send";

const Comment = ({ blogId }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(false);

  const { user, token } = isAuthenticated();

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmition = (event) => {
    event.preventDefault();
    createComment(user._id, blogId, token, comment)
      .then((response) => {
        if (!response || response.error) setError(true);
        else {
          setComment("");
          prefetch();
        }
      })
      .catch((error) => console.error(error));
  };

  const prefetch = () => {
    getAllComments(blogId)
      .then((allComments) => setComments(allComments))
      .catch(console.error);
  };

  useEffect(prefetch, []);

  return (
    <Grid container className={styles.container}>
      <Grid item container xs={12}>
        {comments.map((comment) => (
          <Grid container key={comment._id} className={styles.comment}>
            <Grid item xs={12}>
              <Typography variant="h5" className={styles.user} gutterBottom>
                <AccountCircleIcon
                  style={{ fontSize: "24px", marginRight: "8px" }}
                />
                {comment.user.name.first}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body1"
                style={{ color: "#b0b0b0" }}
                gutterBottom
              >
                {comment.content}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
      {isAuthenticated() && (
        <Grid item xs={12}>
          <form onSubmit={handleSubmition}>
            <FormControl variant="outlined" fullWidth>
              <OutlinedInput
                id="comment"
                type="text"
                value={comment}
                onChange={handleChange}
                style={{ background: "#fff" }}
                placeholder="write your comment..."
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleSubmition}
                      onMouseDown={(event) => event.preventDefault()}
                      edge="end"
                    >
                      <SendIcon color="primary" />
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
          </form>
        </Grid>
      )}
    </Grid>
  );
};

export default Comment;
