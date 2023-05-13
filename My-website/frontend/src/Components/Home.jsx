import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    InputBase,
    IconButton,
    Paper,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Editor from "./Editor";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch",
            },
        },
    },
}));

export default function Home() {
    const [pageCount, setPageCount] = React.useState(1);

    const handleAddPage = () => {
        setPageCount((pageCount) => pageCount + 1);
    };

    console.log(pageCount);

    return (
        <ThemeProvider theme={darkTheme}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{
                                flexGrow: 2,
                                display: { xs: "none", sm: "block" },
                            }}
                        >
                            Pages
                        </Typography>
                        <Editor
                            handleAddPage={handleAddPage}
                            iconType="Add"
                            text="Add Page"
                        />

                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search"
                                inputProps={{ "aria-label": "search" }}
                            />
                        </Search>
                    </Toolbar>
                </AppBar>
            </Box>{" "}
            <div></div>
            <div className="Pages">
                {Array.from({ length: pageCount }, (index) => (
                    <div className="As" key={index}>
                        <Paper
                            sx={{
                                maxWidth: 300,
                                minHeight: 200,
                                marginTop: -8,
                            }}
                        >
                            <div className="buttons">
                                <Editor
                                    handleAddPage={() => { }}
                                    iconType="Edit"
                                    text="Edit"
                                />
                            </div>
                        </Paper>
                    </div>
                ))}
            </div>
        </ThemeProvider>
    );
}
