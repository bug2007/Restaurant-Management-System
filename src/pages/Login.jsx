import { GlobalStyles, Box, Slide, Typography, TextField, InputLabel, FormControlLabel, Checkbox, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { useRef, useState } from 'react'
import { loginAdmin } from '../util/http.js';
import Carousel from '../components/Carousel.jsx';
import logoImg from '../assets/chef_green.png'

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

        <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end',
            gap: '16rem'
        }}>
            <Carousel />
            <Box sx={{backgroundColor: 'primary.light', width: '34vw', minHeight: '100vh', py: '4rem', px: '15px'}}>
                <Box sx={{borderRadius: '10px', boxShadow: '0.5px 10px 12px 2px rgba(0, 0, 0, 0.3)', py: '3rem', px: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px'}}>
                    <img src={logoImg} style={{width: '130px'}} />
                    <Typography
                        variant="h4"
                        sx={(theme) => ({
                            fontWeight: 900,
                            letterSpacing: '2px',
                            color: 'transparent',
                            WebkitTextStroke: `2px ${theme.palette.primary.main}`, 
                        })}
                    >
                        BSS RESTAURANT
                    </Typography>
                    <form onSubmit={handleLogin} style={{width: '100%', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '20px'}}>
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
                            // sx={{ mb: 2, display: 'block' }}
                        />
                        <Button type='submit' sx={{width: '100%', padding: '15px 5px', borderRadius: '5px', color: 'white'}} color='primary' variant='contained' disabled={isPending || loginSuccess}>{isPending ? 'Logging in' : 'LOGIN'}</Button>
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
            </Box>
        </Box>
        </>
    )
}