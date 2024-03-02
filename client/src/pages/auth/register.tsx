import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import { wrapper } from "@/store";
import MainLayout from "@/layouts/MainLayout";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import registrationValidationSchema from "@/validationSchema/registrationValidationSchema";
import { useFormik } from "formik";
import { register } from "@/api/auth";
import FileUpload from "@/components/fileUpload/FileUpload";
import { UploadedFileProps } from "@/types/components/fileUploadProps";
import IconButton from "@mui/material/IconButton";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import fuStyles from "@/styles/FileUpload.module.scss";
import authStyles from "@/styles/Auth.module.scss";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

const Register = () => {
  const [picture, setPicture] = useState<UploadedFileProps>({
    file: null,
    base64: "/images/user/user-profile-default.jpg",
  });
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      reTypePassword: "",
    },
    validationSchema: registrationValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await register({
          firstName: values.firstName,
          lastName: values.lastName,
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
            Regiter and listen your favorite artists new releases
          </h1>
          <form onSubmit={formik.handleSubmit}>
            <FileUpload setFile={setPicture} accept="image/*">
              <Card className={fuStyles.upload_button_box}>
                <IconButton aria-label="upload">
                  <AddAPhotoIcon />
                </IconButton>
              </Card>
              <Card className={fuStyles.upload_picture_wrapper}>
                <img src={picture.base64} alt={"cover"} />
              </Card>
            </FileUpload>
            <Grid container justifyContent="center" gap={2}>
              <TextField
                fullWidth={true}
                label="First Name"
                {...formik.getFieldProps("firstName")}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
              <TextField
                fullWidth={true}
                label="Enter your lastName"
                {...formik.getFieldProps("lastName")}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
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
              <FormControl fullWidth={true} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  label="Password"
                  id="outlined-adornment-password"
                  {...formik.getFieldProps("reTypePassword")}
                  error={
                    formik.touched.reTypePassword &&
                    Boolean(formik.errors.reTypePassword)
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
                    variant="contained"
                    type="submit"
                    fullWidth={true}
                  >
                    Register
                  </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button
                    className="button-medium"
                    variant="outlined"
                    fullWidth={true}
                    onClick={() => router.push("/auth/login")}
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

export default Register;
export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {},
);
