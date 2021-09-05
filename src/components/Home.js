import Grid from "@material-ui/core/Grid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import { getAllBlogs, getAllPrivateBlogs, isAuthenticated } from "./helper";
import Layout from "./Layout";
import Typography from "@material-ui/core/Typography";
import styles from "./styles/home.module.css";

const parseISOString = (s) => {
  var b = s.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
};

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [privateBlogs, setPrivateBlogs] = useState([]);
  const [featuredBlog, setFeaturedBlog] = useState(null);

  const { user, token } = isAuthenticated();

  useEffect(() => {
    getAllBlogs()
      .then((blogs) => {
        setFeaturedBlog(blogs[0]);
        setBlogs(blogs.filter((blog, index) => index !== 0));
      })
      .catch((err) => console.error(err));

    if (isAuthenticated()) {
      getAllPrivateBlogs(user._id, token)
        .then((blogs) => setPrivateBlogs(blogs))
        .catch((err) => console.error(err));
    }
  }, []);

  return (
    <Layout>
      <Typography
        variant="h2"
        align="center"
        style={{
          padding: "10px 20px",
          paddingTop: "20px",
          color: "#fff",
          background: "#505050",
        }}
      >
        All Available Blogs
      </Typography>
      {featuredBlog && (
        <Grid container style={{ padding: "30px", backgroundColor: "#505050" }}>
          <Grid item sm={12} style={{ position: "relative" }}>
            <div className={styles.featuredContainer}>
              <img
                src={featuredBlog.image}
                alt="Featured Image"
                width="100%"
                height="100%"
              />
              <div className={styles.featuredContent}>
                <Link
                  to={`/blog/${featuredBlog._id}`}
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  <Typography variant="h3" component="h2" gutterBottom>
                    {featuredBlog.title}
                  </Typography>
                </Link>
                <Typography
                  variant="body2"
                  style={{ color: "#000", height: "50%", overflow: "hidden" }}
                  component="p"
                  gutterBottom
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: featuredBlog.content,
                    }}
                  ></span>
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  align="right"
                  style={{
                    position: "absolute",
                    bottom: "30px",
                  }}
                >
                  By {featuredBlog.user.name.first} on{" "}
                  {parseISOString(featuredBlog.createdAt).toDateString()}
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      )}
      <Grid container spacing={1} className={styles.container}>
        {blogs.map((blog) => (
          <Grid item key={blog._id} xs={12} sm={6} lg={4}>
            <Link to={`/blog/${blog._id}`} style={{ textDecoration: "none" }}>
              <Card
                title={blog.title}
                content={blog.content}
                author={blog.user.name.first}
                time={blog.createdAt}
                image={blog.image}
              />
            </Link>
          </Grid>
        ))}
      </Grid>
      {isAuthenticated() && privateBlogs && privateBlogs.length && (
        <Grid container spacing={1} className={styles.container}>
          <Grid item xs={12}>
            <Typography
              variant="h2"
              align="center"
              style={{
                padding: "10px 20px",
                paddingTop: "20px",
                color: "#fff",
                background: "#505050",
              }}
            >
              Here is all your Private Blogs
            </Typography>
          </Grid>
          {privateBlogs.map((blog) => (
            <Grid item key={blog._id} xs={12} sm={6}>
              <Link to={`/blog/${blog._id}`} style={{ textDecoration: "none" }}>
                <Card
                  title={blog.title}
                  content={blog.content}
                  author={blog.user.name.first}
                  time={blog.createdAt}
                  image={blog.image}
                />
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </Layout>
  );
};

export default Home;
