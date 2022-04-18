import {AppBar, Avatar, Grid, Typography} from "@mui/material";

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
                            <a
                                target="_blank"
                                href="https://csunacm.org"
                                rel="noreferrer"
                            >
                                <Avatar
                                    src={'acm_logo.png'}
                                />
                            </a>
                        </Grid>
                        <Grid item>
                            <Typography
                                variant="caption"
                                color="textSecondary"
                            >
                                React + Material UI
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                </Grid>
            </Grid>
        </AppBar>
    );
};

export default Header;
