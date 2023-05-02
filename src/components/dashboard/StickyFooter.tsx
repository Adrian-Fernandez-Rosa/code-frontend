import CssBaseline  from "@mui/material/CssBaseline";
import  Container  from "@mui/material/Container";
import Box from '@mui/material/Box';
import { Copyright } from "./CopyRight";


export const StickyFooter = () => {

    return(

/*
 cssbaseline
 block to be able to separate the default content from what will have
 inside the box the sx is specified.
sx (content layout)
*/
        <Box sx={
            {
                display: 'flex',
                flexDirection: "column"
            }
            }>
            <CssBaseline>
        
            </CssBaseline>

            <Box
                component="footer"
                sx={
                    {
                        py: 3,
                        px: 2,
                        mt: 'auto',
                        backgroundColor: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800] 
                    }
                }
            >
                <Container maxWidth="sm">
                    <Copyright sx= {
                        {
                            pt: 4
                        }}/>
                </Container>

            </Box>

        </Box>
    )
}
