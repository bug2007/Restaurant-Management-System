import { GlobalStyles, Box, Slide, Typography, TextField, InputLabel, FormControlLabel, Checkbox, Button, CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { useRef, useState } from 'react'
import { loginAdmin } from '../util/http.js';
import Carousel from './Carousel.jsx';
import logoImg from '../assets/chef.png'
import classes from './Login.module.css'
import ErrorMsg from './ErrorMsg.jsx';

export default function Login() {
    const navigate = useNavigate();
    const [loginSuccess, setLoginSuccess] = useState(false)
    const rememberMeRef = useRef();

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: loginAdmin,
        onSuccess: (data, variables) => {  // variables: the arguments passed to mutate()
            localStorage.setItem('token', data.token)
            localStorage.setItem('refreshToken', data.refreshToken)
            localStorage.setItem('fullName', data.user.fullName)
            if (rememberMeRef.current?.checked) {
                localStorage.setItem('savedUsername', variables.userName)
            } else {
                localStorage.removeItem('savedUsername')
            }
            setLoginSuccess(true)
            setTimeout(() => {navigate('/dashboard/employees')}, 2000)
        }
    })

    function handleLogin(event) {
        event.preventDefault()
        const formData = new FormData(event.target)
        const userName = formData.get('userName')
        const password = formData.get('password')
        mutate({userName, password})
    }

    const savedUsername = localStorage.getItem('savedUsername') || '';

    return (
        <>
        <GlobalStyles 
            styles={(theme) => ({ 
                body: { 
                background: theme.palette.primary.light,
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
                minHeight: '100vh',
                // [theme.breakpoints.up('lg')]: {
                //     padding: '0 0 0 10rem',
                // }
                },
                
                '.swiper-pagination-bullet': {
                    width: '18px',
                    height: '3px',
                    backgroundColor: 'black',
                    opacity: '0.3',
                    transition: 'all 0.3s ease',
                    borderRadius: '0',
                },

                '.swiper-pagination-bullet-active': {
                    width: '25px',
                    opacity: '1'
                }
            })} 
        />

        <Box className={classes.carouselLoginBox} sx={{
            minHeight: '100vh',
            display: 'flex',
            // alignItems: 'center',
            // justifyContent: 'end',
            // gap: '16vw'
        }}>
            <Box className={classes.loginForm} sx={{pt: '8rem', pb: '2rem', backgroundColor: '#f4f9db', width: '45%', px: '2rem', display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '5rem'}}>
                <Box sx={{width: '80%', minWidth: '0'}}>
                    <img src={logoImg} style={{width: '120px', marginBottom: '1.5rem'}} />
                    <Typography className={classes.bss}
                        sx={(theme) => ({
                            fontWeight: 800,
                            letterSpacing: '2px',
                            color: 'primary.main',
                            fontSize: '40px',
                            // WebkitTextStroke: `2px ${theme.palette.primary.main}`, 
                            // textAlign: 'center'
                        })}
                    >
                        BSS RESTAURANT
                    </Typography>
                </Box>
                <form onSubmit={handleLogin} style={{display: 'flex', width: '80%', flexDirection: 'column', gap: '20px'}}>
                    <div>
                        <InputLabel htmlFor='userName' sx={{fontWeight: '500', fontSize: '20px', color: 'black', marginBottom: '5px'}}>Username</InputLabel>
                        <TextField 
                            sx={{backgroundColor: 'white', borderRadius: '5px', '& .MuiOutlinedInput-root': {'& fieldset': {borderColor: 'primary.main'}, '&:hover fieldset': {borderColor: 'primary.main', borderWidth: '2px'}}}} defaultValue={savedUsername} fullWidth id='userName' name='userName' type='email' placeholder='Enter your username' required disabled={isPending || loginSuccess} />
                    </div>
                    <div>
                        <InputLabel htmlFor='password' sx={{fontWeight: '500', fontSize: '20px', color: 'black', marginBottom: '5px'}}>Password</InputLabel>
                        <TextField sx={{backgroundColor: 'white', borderRadius: '5px', '& .MuiOutlinedInput-root': {'& fieldset': {borderColor: 'primary.main'}, '&:hover fieldset': {borderColor: 'primary.main', borderWidth: '2px'}}}} fullWidth id='password' name='password' type='password' placeholder='Enter your password' required disabled={isPending || loginSuccess} />
                    </div>
                    <FormControlLabel
                        control={
                            <Checkbox
                                slotProps={{
                                    input: { ref: rememberMeRef }
                                }}
                                defaultChecked={savedUsername ? true : false}
                                name="rememberMe"
                            />
                        }
                        label="Remember me"
                        sx={{width: 'fit-content'}}
                    />
                    <Button type='submit' sx={{padding: '10px 5px', borderRadius: '5px', color: 'white', fontSize: '15px', '&.Mui-disabled': { backgroundColor: '#e3c942', color: 'white'}}} color='primary' variant='contained' disabled={isPending || loginSuccess}>{isPending ? <><CircularProgress size="15px" sx={{color: '#f4f9db', marginRight: '10px'}} enableTrackSlot /> LOGGING IN</> : 'LOGIN'}</Button>
                    {isError && (<ErrorMsg message={error.message} />)}
                    {loginSuccess && (
                        <Typography color="success" sx={{ fontWeight: 'bold', fontSize: '18px' }}>
                            Login successful! Redirecting...
                        </Typography>
                    )}
                </form>
            </Box>
            <Carousel className={classes.carousel} />
        </Box>
        </>
    )
}