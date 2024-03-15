import React from 'react';
import { makeStyles } from '@mui/styles';
import { Typography, Link, Grid } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh', // Set minimum height of container to full viewport height
    },
    footerTop: {
      backgroundColor: '#f2f2f2',
      padding: theme.spacing(4),
      textAlign: 'center',
    },
    footer: {
      backgroundColor: '#333',
      color: '#fff',
      padding: theme.spacing(4),
      textAlign: 'center',
    },
    footerContent: {
      marginTop: theme.spacing(2),
    },
    link: {
      color: '#fff',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  }));
  

const Footer = () => {
  const classes = useStyles();

  return (
    <>
      <section className={classes.footerTop}>
        <Grid container spacing={3} className={classes.footerContent}>
          {/* Booking.com footer content */}
          {/* Replace with your own footer content */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6">Company</Typography>
            <Typography variant="body2">
              <Link href="#" className={classes.link}>About Us</Link>
              <br />
              <Link href="#" className={classes.link}>Careers</Link>
              <br />
              <Link href="#" className={classes.link}>Press</Link>
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6">Explore</Typography>
            <Typography variant="body2">
              <Link href="#" className={classes.link}>Destinations</Link>
              <br />
              <Link href="#" className={classes.link}>Travel Offers</Link>
              <br />
              <Link href="#" className={classes.link}>Blog</Link>
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6">Support</Typography>
            <Typography variant="body2">
              <Link href="#" className={classes.link}>Customer Service</Link>
              <br />
              <Link href="#" className={classes.link}>FAQs</Link>
              <br />
              <Link href="#" className={classes.link}>Contact Us</Link>
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6">Connect</Typography>
            <Typography variant="body2">
              <Link href="#" className={classes.link}>Facebook</Link>
              <br />
              <Link href="#" className={classes.link}>Twitter</Link>
              <br />
              <Link href="#" className={classes.link}>Instagram</Link>
            </Typography>
          </Grid>
        </Grid>
      </section>
      <footer className={classes.footer}>
        <Typography variant="body1">
          &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
        </Typography>
        <Typography variant="body2">
          Made with ❤️ by <Link href="https://yourwebsite.com" className={classes.link}>Your Name</Link>
        </Typography>
      </footer>
    </>
  );
};

export default Footer;
