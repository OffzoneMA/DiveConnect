import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Paper,
  TextField,
  Button,
  FormControlLabel,
  Switch,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { getAllDivingCenters } from "../../features/divingCenters/divingCentersSlice.js";

const diveOptions = [
  "Guided dive to 20 meters",
  "Guided dive to 40 meters",
  "Autonomous dive",
  "Discover scuba diving (baptism dive)",
  "Night dive",
  "Deep dive",
  "Wreck dive",
  "Drift dive",
  "Cave dive",
  "Ice dive",
  "Reef dive",
  "Technical dive",
  "Sidemount dive",
  "Nitrox dive",
  "Search and recovery dive",
  "Underwater photography dive",
  "Underwater videography dive",
  "Shark dive",
  "Manta ray dive",
  "Whale dive",
];

const useStyles = makeStyles(() => ({
  searchBar: {
    position: "relative",
    margin: "auto",
    padding: "20px",
    textAlign: "center",
  },
  formRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20px",
  },
  spacer: {
    margin: "0 10px", // Adjust spacer width as needed
  },
  toggleContainer: {
    textAlign: "center",
  },
  diveTypesInput: {
    "& .MuiAutocomplete-inputRoot": {
      fontSize: "1.2rem", // Adjust the font size as needed
    },
  },
}));

const DivingSearchBar = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleSearch = () => {
    dispatch(getAllDivingCenters());
  };

  const handleToggleAdvancedMode = () => {
    setAdvancedMode(!advancedMode);
  };

  const handleEquipmentCountChange = (equipment, count) => {
    setEquipmentCounts({ ...equipmentCounts, [equipment]: count });
  };

  return (
    <Paper className={classes.searchBar}>
      <div className={classes.formRow}>
        <TextField
          label="Location"
          variant="outlined"
          fullWidth
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <div className={classes.spacer} />
        <Autocomplete
          className={classes.diveTypesInput} // Apply custom styles here
          multiple
          options={diveOptions}
          getOptionLabel={(option) => option}
          renderInput={(params) => <TextField {...params} label="Dive Types" />}
          onChange={(event, value) => console.log(value)} // handle dive type selection
        />
        <div className={classes.spacer} />
        <TextField
          label="Date"
          variant="outlined"
          fullWidth
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <div className={classes.spacer} />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </div>
      <div className={classes.toggleContainer}>
        <FormControlLabel
          control={
            <Switch
              checked={advancedMode}
              onChange={handleToggleAdvancedMode}
            />
          }
          label="Advanced Mode"
        />
      </div>
      {advancedMode && (
        <>
          {/* Equipment fields */}
          <div className={classes.formRow}>
            <TextField
              label="Number of Tanks"
              variant="outlined"
              fullWidth
              type="number"
              value={equipmentCounts.tanks || ""}
              onChange={(e) =>
                handleEquipmentCountChange("tanks", e.target.value)
              }
            />
            <TextField
              label="Number of Regulators"
              variant="outlined"
              fullWidth
              type="number"
              value={equipmentCounts.regulators || ""}
              onChange={(e) =>
                handleEquipmentCountChange("regulators", e.target.value)
              }
            />
          </div>
          <div className={classes.formRow}>
            <TextField
              label="Number of BCs (Buoyancy Compensators)"
              variant="outlined"
              fullWidth
              type="number"
              value={equipmentCounts.bcs || ""}
              onChange={(e) =>
                handleEquipmentCountChange("bcs", e.target.value)
              }
            />
            <TextField
              label="Number of Computers"
              variant="outlined"
              fullWidth
              type="number"
              value={equipmentCounts.computers || ""}
              onChange={(e) =>
                handleEquipmentCountChange("computers", e.target.value)
              }
            />
            <TextField
              label="Number of Fins & Masks"
              variant="outlined"
              fullWidth
              type="number"
              value={equipmentCounts.finsMasks || ""}
              onChange={(e) =>
                handleEquipmentCountChange("finsMasks", e.target.value)
              }
            />
          </div>
        </>
      )}
    </Paper>
  );
};

export default DivingSearchBar;
