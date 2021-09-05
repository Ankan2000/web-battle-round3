import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

const Error = ({ values, setValues }) => {
  const handleClose = () => setValues({ ...values, error: "" });

  return (
    <Snackbar
      open={values.error}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity="error" onClose={handleClose}>
        {values.error}
      </Alert>
    </Snackbar>
  );
};

export default Error;
