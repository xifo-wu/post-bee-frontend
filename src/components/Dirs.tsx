import useSWR from "swr";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Button, DialogActions, DialogContentText, Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CreateDirs from "./CreateDirs";
import { useState } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";

export default function Dirs({
  id,
  open,
  onOpenChange,
}: {
  id: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}) {
  const { data: res = {}, mutate } = useSWR(
    open
      ? {
          url: "/api/monitorDirs",
          params: { mediaId: id },
        }
      : null
  );

  const rows = res.data || [];
  const [currentId, setCuurentId] = useState(0);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDeleteClickOpen = (params: any) => {
    console.log(params, "?????");
    setCuurentId(params.id)
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };


  const columns: GridColDef[] = [
    { field: "dir", headerName: "路径", width: 280 },
    { field: "link", headerName: "分享地址", width: 130 },
    { field: "notifyTgChat", headerName: "通知频道", width: 130 },
    {
      field: "season",
      headerName: "季",
      type: "number",
      width: 90,
    },
    {
      field: "remark",
      headerName: "备注",
      width: 90,
    },
    {
      field: "actions",
      headerName: "操作",
      renderCell: (params) => {
        return (
          <Stack>
            <Button onClick={() => handleDeleteClickOpen(params)}>删除</Button>
          </Stack>
        );
      },
    },
  ];

  const handleClose = () => {
    onOpenChange(false);
  };

  const handleConfirmDelete = async () => {
    const { error } = await api.delete<any, any>(`/api/monitorDirs/${currentId}`);

    if (error) {
      toast.error(error.message);
      return;
    }

    handleDeleteClose();
    setCuurentId(0);
    mutate();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      sx={{ width: "100%" }}
      PaperProps={{
        sx: {
          width: "100%",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>监控目录</Box>
        <CreateDirs mediaId={id} onSuccess={mutate} />
      </DialogTitle>

      <DialogContent>
        <DataGrid rows={rows} editMode="row" columns={columns} />
      </DialogContent>

      <Dialog
        open={deleteOpen}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">确定删除吗？</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            删除后无法恢复本条记录。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>返回</Button>
          <Button onClick={handleConfirmDelete} autoFocus>
            确定
          </Button>
        </DialogActions>
      </Dialog>

    </Dialog>
  );
}
