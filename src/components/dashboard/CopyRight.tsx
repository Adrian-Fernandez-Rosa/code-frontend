import { Typography } from "@mui/material";
import Link from '@mui/material/Link';

export const Copyright = (props: any) => { //dynamic custom properties
    return (
        <Typography variant="body2" color="text.scondary" align="center" { ...props}>
            { 'CopyRight ©'}
            <Link color="inherit" href="https://github.com/Adrian-Fernandez-Rosa/code-frontend">
            AdrianCodifica Repo
            </Link>
            { new Date().getFullYear()}
        </Typography>
    )
}
