import * as React from "react";
import Button from "@mui/material/Button";
import { LoadingButton } from "@mui/lab";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FilledInput, FormControl, InputLabel, Link } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
import api from "../utils/api";
import { toast } from "react-toastify";

export default function CreateMedia({
  id,
  open,
  onOpenChange,
  data = {
    name: "",
    desc: "",
    posterUrl: "",
    year: "",
    tags: "",
  },
  onSuccess,
}: {
  id: number;
  open: boolean;
  data: any;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<any>({
    defaultValues: data,
  });

  const handleClose = () => {
    onOpenChange(false);
  };

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    const { error } = await api.put<any, any>(`/api/media/${id}`, {
      ...data,
      ...(data.year ? { year: parseInt(data.year, 10) } : {}),
    });
    if (error) {
      toast.error(error.message || "更新失败");
      return;
    }

    onSuccess?.();
    reset();
    onOpenChange(false);
  };
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        sx={{ width: "100%" }}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit(onSubmit),
          sx: {
            width: "100%",
          },
        }}
      >
        <DialogTitle>更新媒体</DialogTitle>
        <DialogContent>
          <DialogContentText>
            懒！先去
            <Link
              target="_blank"
              underline="none"
              href="https://www.themoviedb.org/"
            >
              TMDB
            </Link>
            拷贝吧
          </DialogContentText>

          <FormControl sx={{ mt: 2, mb: 1, width: "100%" }} variant="filled">
            <InputLabel htmlFor="filled-adornment-name">名称</InputLabel>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <FilledInput
                  id="filled-adornment-name"
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
            <InputLabel htmlFor="filled-adornment-posterUrl">海报</InputLabel>
            <Controller
              name="posterUrl"
              control={control}
              render={({ field }) => (
                <FilledInput
                  id="filled-adornment-posterUrl"
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
            <InputLabel htmlFor="filled-adornment-desc">简介</InputLabel>
            <Controller
              name="desc"
              control={control}
              render={({ field }) => (
                <FilledInput
                  id="filled-adornment-desc"
                  multiline
                  maxRows={4}
                  minRows={4}
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
            <InputLabel htmlFor="filled-adornment-year">年份</InputLabel>
            <Controller
              name="year"
              control={control}
              render={({ field }) => (
                <FilledInput
                  type="number"
                  id="filled-adornment-year"
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
            <InputLabel htmlFor="filled-adornment-tags">标签</InputLabel>
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <FilledInput
                  id="filled-adornment-tags"
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>返回</Button>
          <LoadingButton loading={isSubmitting} type="submit">
            更新
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
