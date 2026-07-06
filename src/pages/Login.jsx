import { GlobalStyles, Box, Slide, Typography, TextField, InputLabel, FormControlLabel, Checkbox, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { useRef, useState } from 'react'
import { loginAdmin } from '../util/http.js';
import Carousel from '../components/Carousel.jsx';
import logoImg from '../assets/chef.png'

export default function Login() {
    const navigate = useNavigate();
    const [loginSuccess, setLoginSuccess] = useState(false)
    const rememberMeRef = useRef();

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: loginAdmin,
        onSuccess: (data, variables) => {
            localStorage.setItem('token', data.token)
            localStorage.setItem('refreshToken', data.refreshToken)
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
                background: `linear-gradient(to right, ${theme.palette.primary.light}, #dbc764)`,
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

        <Box className='carousel-login-box' sx={{
            minHeight: '100vh',
            display: 'flex',
            // alignItems: 'center',
            // justifyContent: 'end',
            // gap: '16vw'
        }}>
            <Box className='login-form' sx={{pt: '8rem', backgroundColor: 'red', width: '40%', px: '2rem', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'start', gap: '5rem'}}>
                <Box sx={{textAlign: 'center', backgroundColor: 'blue'}}>
                    <img src={logoImg} style={{width: '120px', marginBottom: '2rem', backgroundColor: 'red'}} />
                    <Typography
                        variant="h4"
                        sx={(theme) => ({
                            fontWeight: 900,
                            letterSpacing: '2px',
                            color: 'transparent',
                            WebkitTextStroke: `2px ${theme.palette.primary.main}`, 
                            // textAlign: 'center'
                        })}
                    >
                        BSS RESTAURANT
                    </Typography>
                </Box>
                <form onSubmit={handleLogin} style={{display: 'flex', maxWidth: '90%', width:'100%', flexDirection: 'column', gap: '20px', backgroundColor: 'blue'}}>
                    <div>
                        <InputLabel htmlFor='userName' sx={{fontWeight: '500', fontSize: '20px'}}>Username</InputLabel>
                        <TextField 
                            sx={{backgroundColor: 'white', borderRadius: '10px'}} defaultValue={savedUsername} fullWidth id='userName' name='userName' type='email' placeholder='Enter your username' required disabled={isPending || loginSuccess} />
                    </div>
                    <div>
                        <InputLabel htmlFor='password' sx={{fontWeight: '500', fontSize: '20px'}}>Password</InputLabel>
                        <TextField sx={{backgroundColor: 'white', borderRadius: '10px'}} fullWidth id='password' name='password' type='password' placeholder='Enter your password' required disabled={isPending || loginSuccess} />
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
                    />
                    <Button type='submit' sx={{padding: '10px 5px', borderRadius: '5px', color: 'white'}} color='primary' variant='contained' disabled={isPending || loginSuccess}>{isPending ? 'Logging in' : 'LOGIN'}</Button>
                    {isError && (
                        <Typography color="error" variant="body2">
                            {error.message}
                        </Typography>
                    )}
                    {loginSuccess && (
                        <Typography color="success.main" variant="body2" sx={{ fontWeight: 'bold' }}>
                            Login successful! Redirecting...
                        </Typography>
                    )}
                </form>
            </Box>
            <Carousel />
        </Box>
        </>
    )
}