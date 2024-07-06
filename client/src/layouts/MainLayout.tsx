import React from "react";
import Navbar from "../components/navbar/Navbar";
import Container from "@mui/material/Container";
import Player from "../components/player/Player";
import Head from "next/head";
import { MainLayoutProps } from "@/types/layouts/mainLayoutProps";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title,
  description,
  keywords,
}) => {
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 370,
        md: 768,
        lg: 1440,
        xl: 1920,
      },
    },
    components: {
      MuiContainer: {
        styleOverrides: {
          root: {
            maxWidth: "1900px",
          },
        },
      },
    },
  });

  return (
    <>
      <Head>
        <title>{title || "Music platform"}</title>
        <meta
          name="description"
          content={
            `Music platform. Here everyone can leave their track and become famous.` +
            description
          }
        />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content={keywords || "Music, Tracks, Artists"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Container style={{ margin: "90px 0" }}>{children}</Container>
        <Player />
      </ThemeProvider>
    </>
  );
};

export default MainLayout;
