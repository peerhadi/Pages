import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    IconButton,
    Fab,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";
import React from "react";

export default function Editor(props) {
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState("");
    const [paraLines, setParaLines] = React.useState("");

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    };

    const handleAddNewPage = () => {
        if (title.length < 5) return;
        handleClose();
        props.handleAddPage();
        setTitle("");
        setParaLines("");
    };

    const handleTitleChange = (e) => {
        if (e.target.value.length > 29) return;
        setTitle(e.target.value);
    };

    const HPLC = (e) => {
        if (title.length >= 5) {
            setParaLines(e.target.value);
        } else return;
    };
    return (
        <>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose}
                    sx={{ textAlign: "center" }}
                >
                    Compose
                </BootstrapDialogTitle>
                <DialogContent dividers id="dialog">
                    <TextField
                        error={title.length > 0 && title.length < 5}
                        id="standard-error-helper-text"
                        label={title.length < 5 ? "Minimun Five Letters" : ""}
                        variant="standard"
                        className="space-between"
                        value={title}
                        onChange={handleTitleChange}
                        inputProps={{
                            style: {
                                fontSize: 18,
                                textAlign: "center",
                                textTransform: "capitalize",
                            },
                        }}
                        fullWidth
                    />
                    <textarea
                        value={paraLines}
                        onChange={HPLC}
                        disabled={!title.length >= 5}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        autoFocus
                        onClick={handleClose}
                        disabled={!title.length >= 5}
                        color="error"
                    >
                        Cancel
                    </Button>
                    <Button
                        autoFocus
                        onClick={handleAddNewPage}
                        disabled={!title.length >= 5}
                    >
                        {props.text}
                    </Button>
                </DialogActions>
            </BootstrapDialog>
            <div id="AddPages">
                {props.iconType === "Add" ? (
                    <Button
                        sx={{
                            fontSize: 19,
                            textTransform: "none",
                            width: 100,
                            display: "block",
                            marginRight: 180,
                        }}
                        autoFocus
                        variant="outlined"
                        onClick={() => handleOpen()}
                    >
                        Add
                    </Button>
                ) : (
                    <Fab
                        color="primary"
                        aria-label="add"
                        id="AddPage"
                        onClick={() => handleOpen()}
                    >
                        <EditIcon />
                    </Fab>
                )}
            </div>
        </>
    );
}

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));
