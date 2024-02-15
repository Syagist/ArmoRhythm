import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import {useState} from "react";
import { useRouter } from 'next/navigation'

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const menuItems = [
    {text: 'Main', link: '/'},
    {text: 'Tracks', link: '/tracks'},
    {text: 'Albums', link: '/albums'},
]

export default function NavBar() {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{mr: 2, ...(open && {display: 'none'})}}
                >
                    <MenuIcon/>
                </IconButton>

            </Toolbar>
            <Drawer
                sx={{
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon/>
                </IconButton>
                <Divider/>
                <List>
                    {menuItems.map(({text, link}) => (
                        <ListItem key={link} disablePadding>
                            <ListItemButton onClick={() => router.push(link)}>
                                <ListItemIcon>
                                    <InboxIcon/>
                                </ListItemIcon>
                                <ListItemText primary={text}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
}