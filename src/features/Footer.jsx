import {Box, Grid, IconButton, Typography} from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
    return (
        <Box pb={1}>
            <Grid
                container
                justifyContent='center'
                alignItems='center'
                direction='column'
            >
                <Grid item>
                    <Typography
                        variant="caption"
                        color="textSecondary"
                        display='inline'
                        style={{userSelect: 'none'}}
                    >
                        MIT License (c) 2022 Alexander Rose
                    </Typography>
                </Grid>
                <Grid item>
                    <IconButton
                        component='a'
                        target="_blank"
                        href="https://github.com/rosealexander/react-mui-workshop"
                        rel="noreferrer"
                    >
                        <GitHubIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </Box>
    )

}

export default Footer
