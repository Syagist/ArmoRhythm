import * as React from 'react';
import {useState} from "react";
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import {useRouter} from 'next/navigation'
import {AppBar, Typography} from "@mui/material";
import navStyles from '../styles/Navbar.module.scss'
import LanguageSelect from "./languageSelect";
import { Button as BaseButton, ButtonProps } from '@mui/base/Button';
import clsx from 'clsx';


const menuItems = [
    {text: 'Main', icon: <InboxIcon/>, href: '/'},
    {text: 'Track List', icon: <InboxIcon/>, href: '/tracks'},
    {text: 'Album List', icon: <InboxIcon/>, href: '/albums'},
]

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const router = useRouter()

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={navStyles.nav_wrapper}>
            <CssBaseline/>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Persistent drawer
                    </Typography>
                    <div className={navStyles.auth_lang_box}>
                        <div className={navStyles.auth_box}>
                            <BaseButton onClick={() => router.push('/auth/login')}>Login</BaseButton>
                            <BaseButton onClick={() => router.push('/auth/register')}>Register</BaseButton>
                        </div>

                        <div className={navStyles.lang_box}>
                            <LanguageSelect/>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="persistent"
                anchor="left"
                open={open}>
                <div>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </div>
                <List>
                    {menuItems.map(({text, href, icon}, index) => (
                        <ListItem button key={href} onClick={() => router.push(href)}>
                            <ListItemIcon>
                                {icon}
                            </ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </div>
    );
}


