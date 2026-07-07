import { Box, Typography } from '@mui/material'

export default function ErrorMsg({message}) {
    return (
        <Typography color='error' sx={{fontSize: '18px', fontWeight: 'bold'}}>{message}</Typography>
    )
}