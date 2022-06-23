// MUI
import { createTheme } from '@mui/material/styles';

const dracula = createTheme({
    palette: {
        primary: {
            main: "#bd93f9",
        },
        secondary: {
            main: "#6272a4",
        },
        error: {
            main: "#ff5555"
        },
        warning: {
            main: "#ffb86c"
        },
        success: {
            main: "#50fa7b",
        },
        info: {
            main: "#e9d5ff",
        },
        background: {
            main: "#282a36"
        },
        cursor: {
            main: "#144D53"
        }
    },
    text: {
        primary: "#bd93f9"
    }
});

const nord = createTheme({
    palette: {
        primary: {
            main: "#d8dee9",
        },
        secondary: {
            main: "#617b94",
        },
        error: {
            main: "#bf616a"
        },
        warning: {
            main: "#ebcb8b"
        },
        success: {
            main: "#a3be8c",
        },
        info: {
            main: "#eceff4",
        },
        background: {
            main: "#2e3440"
        },
        cursor: {
            main: "#144D53"
        }
    },
    text: {
        primary: "#d8dee9",
    }
});

const grandPrix = createTheme({
    palette: {
        primary: {
            main: "#c1c7d7",
        },
        secondary: {
            main: "#5c6c80",
        },
        error: {
            main: "#fc5727"
        },
        warning: {
            main: "#e2b714"
        },
        success: {
            main: "#c0d036",
        },
        info: {
            main: "#c0d036",
        },
        background: {
            main: "#314053"
        },
        cursor: {
            main: "#c1c7d71f"
        }
    },
    text: {
        primary: "#c1c7d7",
    }
});

const solarizedDark = createTheme({
    palette: {
        primary: {
            main: "#2aa198",
        },
        secondary: {
            main: "#268bd2",
        },
        error: {
            main: "#dc322f"
        },
        warning: {
            main: "#e2b714"
        },
        success: {
            main: "#859900",
        },
        info: {
            main: "#e9d8a6",
        },
        background: {
            main: "#002b36"
        },
        cursor: {
            main: "#bd93f93f"
        }
    },
    text: {
        primary: "#2aa198",
    }
});

const gruvboxDark = createTheme({
    palette: {
        primary: {
            main: "#ebdbb2",
        },
        secondary: {
            main: "#7c6f64",
        },
        error: {
            main: "#cc241d"
        },
        warning: {
            main: "#fabd2f"
        },
        success: {
            main: "#689d6a",
        },
        info: {
            main: "#d79921",
        },
        background: {
            main: "#282828"
        },
        cursor: {
            main: "#e2b7142f"
        }
    },
    text: {
        primary: "#ebdbb2",
    }
});

export const themes = [
    {
        name: "dracula",
        theme: dracula
    },
    {
        name: "nord",
        theme: nord
    },
    {
        name: "grandPrix",
        theme: grandPrix
    },
    {
        name: "solarizedDark",
        theme: solarizedDark
    },
    {
        name: "gruvboxDark",
        theme: gruvboxDark
    }
]