import { Grid, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import Comment from "./Comment";
import { getBlog } from "./helper";
import Layout from "./Layout";

const parseISOString = (s) => {
  var b = s.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
};

const Blog = ({ match }) => {
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    image: "",
    author: "",
    time: "",
  });

  useEffect(
    () =>
      getBlog(match.params.blogId).then((currentBlog) => {
        const { title, content, image, user, createdAt } = currentBlog;
        setBlog({
          ...blog,
          title,
          content,
          image,
          time: createdAt,
          author: user.name.first,
        });
      }),
    []
  );
  return (
    <Layout>
      <Grid container>
        <Grid item xs={12}>
          <img
            src={blog.image}
            alt="Thumbnail"
            width="100%"
            height="450px"
            style={{ objectFit: "cover" }}
          />
        </Grid>
        <Grid container style={{ padding: "20px 40px" }}>
          <Grid item xs={12}>
            <Typography variant="h3" component="h1" gutterBottom>
              {blog.title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              component="p"
              style={{ color: "#666" }}
            >
              By {blog.author} on
              {parseISOString(blog.time).toDateString()}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="body1"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            ></Typography>
          </Grid>
        </Grid>
      </Grid>
      <Comment blogId={match.params.blogId} />
    </Layout>
  );
};

export default Blog;
