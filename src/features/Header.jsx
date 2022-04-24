import ThemeToggle from "./theme/ThemeToggle";
import {AppBar, Avatar, Grid, Icon, IconButton, Typography} from "@mui/material";
import {SiMaterialui, SiReact} from "react-icons/si";

const Header = () => {
    return (
        <AppBar
            position='relative'
            color='transparent'
            elevation={0}
        >
            <Grid
                container
                justifyContent='space-between'
            >
                <Grid item>
                    <Grid
                        container
                        alignItems='center'
                        spacing={1}
                    >
                        <Grid item>
                            <Grid
                                container
                                wrap='nowrap'
                                alignItems='center'
                            >
                                <Grid item>
                                    <IconButton
                                        size='large'
                                        style={{ backgroundColor: 'transparent' }}
                                        component='a'
                                        target="_blank"
                                        href="https://reactjs.org/"
                                        rel="noreferrer"
                                    >
                                        <SiReact color={'#54d0fa'}/>
                                    </IconButton>
                                </Grid>
                                <Grid item>
                                    <Typography
                                        color='primary'
                                        fontWeight='Bold'
                                        style={{userSelect: 'none'}}
                                    >
                                        +
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <IconButton
                                        size='large'
                                        style={{ backgroundColor: 'transparent' }}
                                        component='a'
                                        target="_blank"
                                        href="https://mui.com/"
                                        rel="noreferrer"
                                    >
                                        <SiMaterialui color={'#2a82fe'}/>
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <ThemeToggle />
                </Grid>
            </Grid>
        </AppBar>
    );
};

export default Header;
