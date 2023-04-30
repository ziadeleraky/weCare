import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useSelector } from "react-redux";

export default function FormDialog({ data, updateData }) {
  const [open, setOpen] = React.useState(false);

  const [updatedData, setUpdatedData] = React.useState(data.value);
  const id = useSelector((state) => state.user.id);
  const userType = useSelector((state) => state.user.userType);

  // here we set the url type to know which profile we are going to fetch
  let urlType = userType === "serviceProvider" ? "providers" : "users";

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = async () => {
    await axios
      .patch(
        `http://localhost:7000/api/v1/${urlType}/${id}`,
        { [data.name]: updatedData },
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        updateData({ [data.name]: updatedData });
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#66b9a6",
      },
    },
    typography: {
      fontFamily: "var(--textFont)",
    },

    components: {
      // Name of the component
      MuiTextField: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            color: "var(--mainColor)",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Button onClick={handleClickOpen} style={{ background: "none" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            style={{ fill: "#5ca795", width: "25px" }}
          >
            <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" />
          </svg>
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Update your {data.label}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id={data.name}
              label={data.label}
              value={updatedData}
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setUpdatedData(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleUpdate}>Update</Button>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  );
}
