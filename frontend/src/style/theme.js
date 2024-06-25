import { createTheme } from "@mui/material/styles";
// test commit
const theme = createTheme({
  palette: {
    primary: {
      main: "#007bff", // Adjust primary color to a more vibrant blue
    },
    secondary: {
      main: "#ff4081", // Adjust secondary color to a more vibrant pink
    },
    text: {
      primary: "#333", // Adjust primary text color for better readability
      secondary: "#666", // Adjust secondary text color for better contrast
    },
    background: {
      default: "#f5f5f5", // Adjust default background color for a lighter shade
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h1: {
      fontSize: "2rem", // Increase heading sizes for better hierarchy
      fontWeight: 600, // Adjust heading font weight for emphasis
      lineHeight: 1.2, // Improve heading line height for better readability
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: 1.2,
    },
    body1: {
      fontSize: "1rem", // Adjust body text font size for better readability
      lineHeight: 1.4, // Improve body text line height for better readability
    },
  },
  spacing: (factor) => `${0.5 * factor}rem`, // Adjust spacing scale for better consistency
});

export default theme;
