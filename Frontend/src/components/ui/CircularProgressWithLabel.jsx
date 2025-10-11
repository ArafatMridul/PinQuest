import React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

/**
 * A wrapper around MUI CircularProgress that displays a label in the center.
 * @param {object} props - MUI props + value (0–100)
 */
const CircularProgressWithLabel = (props) => {
    return (
        <Box
            sx={{
                position: "relative",
                display: "inline-flex",
            }}
        >
            <CircularProgress
                variant={props.value ? "determinate" : "indeterminate"}
                size={40}
                color="inherit"
                {...props}
            />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {props.value && (
                    <Typography
                        variant="caption"
                        component="div"
                        sx={{
                            color: "black",
                            fontSize: "10px",
                            fontWeight: "900",
                            fontFamily: "inherit"
                        }}
                    >{`${Math.round(props.value)}%`}</Typography>
                )}
            </Box>
        </Box>
    );
};

export default CircularProgressWithLabel;
