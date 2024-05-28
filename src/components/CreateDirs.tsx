import * as React from "react";
import Button from "@mui/material/Button";
import { LoadingButton } from "@mui/lab";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FilledInput, FormControl, InputLabel } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
import api from "../utils/api";
import { toast } from "react-toastify";

export default function CreateDirs({ mediaId, onSuccess }: { mediaId: number, onSuccess: () => void }) {
  const [open, setOpen] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<any>({
    defaultValues: {
      dir: "",
      remark: "",
      season: 0,
      link: "",
      notifyTgChat: "",
      mediaId: mediaId,
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    const { error } = await api.post<any, any>("/api/monitorDirs", {
      ...data,
      ...(data.season ? { season: parseInt(data.season, 10) } : {}),
      mediaId: mediaId,
    });
    if (error) {
      toast.error(error.message || "新增失败");
      return;
    }

    onSuccess?.();
    reset();
    setOpen(false);
  };
  return (
    <React.Fragment>
      <Button onClick={handleClickOpen}>新增目录</Button>
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
        <DialogTitle>新增目录</DialogTitle>
        <DialogContent>
          <FormControl sx={{ mt: 2, mb: 1, width: "100%" }} variant="filled">
            <InputLabel htmlFor="filled-adornment-dir">路径</InputLabel>
            <Controller
              name="dir"
              control={control}
              render={({ field }) => (
                <FilledInput
                  id="filled-adornment-dir"
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
            <InputLabel htmlFor="filled-adornment-link">链接</InputLabel>
            <Controller
              name="link"
              control={control}
              render={({ field }) => (
                <FilledInput
                  id="filled-adornment-link"
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
            <InputLabel htmlFor="filled-adornment-notifyTgChat">
              频道
            </InputLabel>
            <Controller
              name="notifyTgChat"
              control={control}
              render={({ field }) => (
                <FilledInput
                  id="filled-adornment-notifyTgChat"
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
            <InputLabel htmlFor="filled-adornment-season">季</InputLabel>
            <Controller
              name="season"
              control={control}
              render={({ field }) => (
                <FilledInput
                  // type="number"
                  id="filled-adornment-season"
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
            <InputLabel htmlFor="filled-adornment-remark">备注</InputLabel>
            <Controller
              name="remark"
              control={control}
              render={({ field }) => (
                <FilledInput
                  id="filled-adornment-remark"
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
            新增
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
