import { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Editor from "./Editor";
import { createBlog, isAuthenticated } from "./helper";
import Error from "./Error";
import Layout from "./Layout";
import styles from "./styles/blog.module.css";
import CircularProgress from "@material-ui/core/CircularProgress";

const MakeBlog = () => {
  const [values, setValues] = useState({
    title: "",
    image: "",
    content: "",
    privateBlog: false,
    formData: new FormData(),
    loading: false,
    error: false,
    success: false,
  });

  const { title, content, privateBlog, formData, loading } = values;

  const { user, token } = isAuthenticated();

  const handleChange = (name) => (event) => {
    const value =
      name === "image"
        ? event.target.files[0]
        : name === "privateBlog"
        ? event.target.checked
        : name === "content"
        ? event
        : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const handleSubmition = (event) => {
    event.preventDefault();
    formData.set("user", user._id);
    formData.set("privateBlog", privateBlog);
    setValues({ ...values, error: false, loading: true });
    createBlog(user._id, token, formData).then((response) => {
      if (response.error) {
        setValues({ ...values, error: response.msg, loading: false });
        console.error(response);
      } else {
        setValues({
          ...values,
          title: "",
          image: undefined,
          privateBlog: false,
          loading: false,
          success: true,
          formData: new FormData(),
        });
        setValues({ ...values, content: "" });
        console.log(response);
      }
    });
  };

  return (
    <Layout>
      <Error values={values} setValues={setValues} />
      <Grid container className={styles.container}>
        <Grid item sm={8}>
          <form onSubmit={handleSubmition}>
            <TextField
              variant="outlined"
              id="title"
              label="Title"
              type="text"
              value={title}
              onChange={handleChange("title")}
              fullWidth
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={privateBlog}
                  onChange={handleChange("privateBlog")}
                  name="privacy"
                  color="primary"
                />
              }
              label="Private"
            />
            <label htmlFor="image">Image: </label>
            <input type="file" id="image" onChange={handleChange("image")} />
            <Editor
              placeholder="Write your blog here..."
              handleChange={handleChange}
              editorHtml={content}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
            >
              Create
              {loading && (
                <CircularProgress
                  color="secondary"
                  className={styles.loader}
                  size={20}
                />
              )}
            </Button>
          </form>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default MakeBlog;
