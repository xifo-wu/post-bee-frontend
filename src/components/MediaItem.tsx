import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";
import UpdateMedia from "./UpdateMedia";
import Dirs from "./Dirs";

const MediaItem = ({ item, onSuccess }: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [dirsOpen, setDirsOpen] = useState(false);

  const handleDeleteClickOpen = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleConfirmDelete = async () => {
    const { error } = await api.delete<any, any>(`/api/media/${item.id}`);

    if (error) {
      toast.error(error.message);
      return;
    }

    handleDeleteClose();
    onSuccess?.();
  };

  return (
    <>
      <Box
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Box
          sx={{
            backgroundColor: "rgb(24 24 27)",
            borderRadius: ".375rem",
            position: "relative",
            paddingBottom: "calc(9 / 6 * 100%)",
            cursor: "pointer",
          }}
        >
          <Box
            component="img"
            sx={{
              position: "absolute",
              height: "100%",
              width: "100%",
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              color: "transparent",
            }}
            src={item.posterUrl}
          />
        </Box>
        <Typography
          variant="body2"
          sx={{
            mt: 1,
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {item.name}
        </Typography>
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={() => setDirsOpen(true)}>监控目录</MenuItem>
        <MenuItem onClick={() => setUpdateOpen(true)}>编辑媒体</MenuItem>
        <MenuItem onClick={handleDeleteClickOpen}>删除媒体</MenuItem>
      </Menu>

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

      <UpdateMedia
        onSuccess={onSuccess}
        data={item}
        id={item.id}
        onOpenChange={setUpdateOpen}
        open={updateOpen}
      />

      <Dirs
        id={item.id}
        open={dirsOpen}
        onOpenChange={setDirsOpen}
        onSuccess={onSuccess}
      />
    </>
  );
};

export default MediaItem;
