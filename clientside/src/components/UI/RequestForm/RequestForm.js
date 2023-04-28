import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import classes from "../../../Pages/Provider/ProviderCard/ProviderCard.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import AntSwitch from "../ToggleButton/ToggleButton";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function RequestForm({ providerId, hourlyRate }) {

    // get customer id from redux store
  const customerId = useSelector((state) => state.user.id);

  // req schema, this will be sent to backend to create a new request
  const reqSchema = {
    totalHrs: "",
    startDate: new Date(),
    endDate: new Date(),
    providerId: providerId,
    hourlyRate: hourlyRate,
    customerId: customerId,
    reqDescription: "",
    recurring: false,
  }

  // state to store request data
  const [open, setOpen] = React.useState(false);
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [reqData, setReqData] = React.useState(reqSchema);

  // handle open and close of dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // handle request
  const handleRequest = () => {
    setReqData({ ...reqData, startDate: startDate, endDate: endDate });
    console.log(reqData);
    setReqData({...reqSchema});
    setOpen(false);
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
        <Button
          onClick={handleClickOpen}
          className={`btn btn-rounded waves-effect w-md waves-light text-muted ${classes.button_color}`}
        >
          Request a service
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Get the care you need now</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To request a service, please enter all your request information
              here. We will send updates
            </DialogContentText>
            <Grid container spacing={2} className="mt-3">
              <Grid item xs={12} sm={6}>
                <FormLabel
                  id="demo-row-radio-buttons-group-label mt-4"
                  sx={{  textAlign: "left" }}
                >
                  Please enter start date
                </FormLabel>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                    console.log(startDate);
                  }}
                  className="form-control"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel
                  id="demo-row-radio-buttons-group-label mt-4"
                  sx={{ textAlign: "left" }}
                >
                  Please enter end date
                </FormLabel>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => {
                    setEndDate(date);
                    console.log(endDate);
                  }}
                  className="form-control z-3"
                  
                  
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} alignItems="center">
                <div className="d-flex  mt-4 justify-content-between align-items-center">
                  <Typography sx={{ mr: 2, fontSize: "0.9rem" }}>
                    One Time Service
                  </Typography>
                  <AntSwitch
                    // defaultChecked
                    checked={reqData.recurring}
                    onChange={(e) => {setReqData({...reqData, recurring: e.target.checked})}}
                    inputProps={{ "aria-label": "ant design" }}
                    sx={{ mr: 2 }}
                  />
                  <Typography sx={{ fontSize: "0.9rem" }}>Recurring</Typography>
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="totalHrs"
                  label="Total Hours Needed"
                  type="number"
                  fullWidth
                  variant="outlined"
                  name="totalHrs"
                  value={reqData.totalHrs}
                  onChange={(e) => {
                    setReqData({ ...reqData, totalHrs: +e.target.value });
                  }}
                  className="mt-md-3"
                  size="small"
                  InputLabelProps={{
                    style: {
                      fontSize: "0.8rem",
                    zIndex:0
                    },
                  }}
                />
              </Grid>
            </Grid>

            <TextareaAutosize
              maxRows={4}
              aria-label="maximum height"
              placeholder="If you have special requests, please enter here."
             
              variant="standard"
              className="form-control mt-3 w-100"
              value={reqData.reqDescription}
              onChange={(e) => {
                setReqData({ ...reqData, reqDescription: e.target.value });
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleRequest}>Request</Button>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  );
}
