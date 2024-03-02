import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { wrapper } from "@/store";
import MainLayout from "@/layouts/MainLayout";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import loginValidationSchema from "@/validationSchema/loginValidationSchema";
import { login } from "@/api/auth";
import { useRouter } from "next/router";
import authStyles from "@/styles/Auth.module.scss";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await login({
          email: values.email,
          password: values.password,
        });
        await router.push("/profile/" + response._id);
      } catch (e) {
        console.log(e);
      }
    },
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <MainLayout title={"Track list for Music Platform"}>
      <Card className={authStyles.auth_box}>
        <div className={authStyles.auth_banner}>
          <img
            src="/images/banners/logn-register-banner.jpg"
            alt="auth banner"
          />
        </div>
        <Box p={3}>
          <h1 className={authStyles.auth_box}>
            Login and listen your favorite artists new releases
          </h1>
          <form onSubmit={formik.handleSubmit}>
            <Grid container justifyContent="center" gap={2}>
              <TextField
                fullWidth={true}
                label="Enter your email"
                {...formik.getFieldProps("email")}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <FormControl fullWidth={true} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  label="Password"
                  id="outlined-adornment-password"
                  {...formik.getFieldProps("password")}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Button
                    className="button-medium"
                    variant="outlined"
                    fullWidth={true}
                    onClick={() => router.push("/auth/register")}
                  >
                    Register
                  </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button
                    className="button-medium"
                    variant="contained"
                    type="submit"
                    fullWidth={true}
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Card>
    </MainLayout>
  );
};

export default Login;
export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {},
);
