"use client";

import { Box, Container, Typography } from "@mui/material";
import React from "react";

import { TbEye, TbEyeClosed } from "react-icons/tb";
import { LoadingButton } from "@mui/lab";
import loginPic from "/login-pic.svg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import api from "./utils/api";

// Hooks
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

// Types
import { SubmitHandler } from "react-hook-form";

interface FieldValues {
  username: string;
  password: string;
}

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FieldValues>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data: any) => {
    const { response, error } = await api.post<any, any>("/api/login", data);
    if (error) {
      toast.error(error.msg || "登录失败");
      return;
    }

    window.localStorage.setItem("accessToken", response.token)
    navigate("/");
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Container
      sx={{
        width: "100%",
        minHeight: "100vh",
        height: "100%",
        display: "flex",
        gap: 4,
      }}
    >
      <Box
        sx={{
          flex: 1,
          py: 4,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ ml: 1, fontWeight: 500, fontSize: "1rem" }}>
            POST BEE
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            maxWidth: "460px",
          }}
        >
          <Box sx={{ mb: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, lineHeight: 2 }}>
              欢迎回来 !
            </Typography>
            <Typography variant="body2">请先登录您的账号</Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <FormControl sx={{ mt: 2, mb: 1, width: "100%" }} variant="filled">
              <InputLabel htmlFor="filled-adornment-username">
                用户名
              </InputLabel>
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <FilledInput
                    id="filled-adornment-username"
                    sx={{
                      "::before": {
                        borderColor: "#fff",
                      },
                    }}
                    {...field}
                  />
                )}
              />
            </FormControl>

            <FormControl sx={{ mt: 2, mb: 1, width: "100%" }} variant="filled">
              <InputLabel htmlFor="filled-adornment-password">密码</InputLabel>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <FilledInput
                    id="filled-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end" sx={{ pr: 1 }}>
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <TbEye /> : <TbEyeClosed />}
                        </IconButton>
                      </InputAdornment>
                    }
                    sx={{
                      "::before": {
                        borderColor: "#fff",
                      },
                    }}
                    {...field}
                  />
                )}
              />
            </FormControl>

            <FormControl sx={{ mt: 2, mb: 1, width: "100%" }} variant="filled">
              <LoadingButton
                loading={isSubmitting}
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  letterSpacing: "0.04em",
                  height: "56px",
                  fontSize: "1rem",
                  lineHeight: "1.4375em",
                  color: "#fff",
                }}
                fullWidth
              >
                登录
              </LoadingButton>
            </FormControl>
          </Box>
        </Box>
      </Box>

      <Box
        sx={(theme) => ({
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          [theme.breakpoints.down("md")]: {
            display: "none",
          },
        })}
      >
        <Box
          sx={(theme) => ({
            [theme.breakpoints.up("md")]: {
              width: 488,
            },
            [theme.breakpoints.down("md")]: {
              width: 0,
            },
          })}
        >
          <img
            src={loginPic}
            alt="login"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
