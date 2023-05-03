import React, { useState } from 'react';

// Theme personalization of Material UI
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

// CSS & Drawer
import CssBaseLine from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';

// Nav Bar
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toobar from '@mui/material/Toolbar';

// Material Grids and Boxs
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

// Material Lists
import List from '@mui/material/List';

// Icons
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge';

// List for the menu
import { MenuItems } from './MenuItems';

// Width for Drawer Menu
const drawerWidth: number = 240;

// Props (propietes) form AppBar
interface AppBarProps extends MuiAppBarProps {
    open?: boolean // si el menu esta abierto o cerrado
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => (
    {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            // The sharp curve is used by objects that may return to the screen at any time.
            /* EASING
            Puede cambiar algunos o todos los valores de aceleración, 
            o proporcionar los suyos propios,
             proporcionando un transition-timing-functionvalor de CSS personalizado.
            */
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen // out
        }),
        ... (open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen //entry
            }),
        })
    }
));

// Drawer Menu
/*
 * El Navigation Drawer es un panel deslizante cuyo objetivo es dotar al 
 * usuario con una navegación más cómoda entre las opciones 
 * populares de tu aplicación.
 */
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen //entry
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen
                }),
                width: theme.spacing(7),
                //Breakpoint to media Queries of CSS in different display sizes
                // (arreglar si se ve mal en android)
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9)
                }
            })
        }

    })
);


// Define Theme
const myTheme  = createTheme();

// Dashboard content
// TODO: Refactor with Navigation Components
const DashboardContent = () => {

    /**
     * variable open que se podifica con setOpen y por defecto es true
     */
    const [open, setopen] = useState(true)
    
}



