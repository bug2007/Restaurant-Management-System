import { Box, Slide, Typography, TextField, InputLabel, FormControlLabel, Checkbox, Button, CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import loginImg1 from '../assets/login_illustration.png'
import { useRef, useState } from 'react'
import { loginAdmin } from '../util/http.js';
import classes from './Login.module.css'
import ErrorMsg from '../components/ErrorMsg.jsx';

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
        <Box className={classes.carouselLoginBox} sx={{
            width: '100vw',
            minHeight: '100vh',
            display: 'flex',
        }}>
            <Box 
                className={classes.loginForm} 
                sx={{
                    pt: '8rem', pb: '2rem', 
                    backgroundColor: '#ffffff', 
                    width: '45%', 
                    px: '2rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    flexDirection: 'column', 
                    gap: '5rem'}}>
                <form 
                    onSubmit={handleLogin} 
                    style={{
                        display: 'flex', 
                        width: '80%', 
                        flexDirection: 'column', 
                        gap: '25px',
                        marginTop: '4rem'}}>
                    <Typography sx={{fontSize: '32px', marginBottom: '4rem'}}>BSS Restaurant</Typography>
                    <div>
                        <InputLabel 
                            htmlFor='userName' 
                            sx={{
                                fontWeight: '500', 
                                fontSize: '20px', 
                                color: 'black', 
                                marginBottom: '5px'}}>
                            Username
                        </InputLabel>
                        <TextField 
                            sx={{
                                backgroundColor: 'white', 
                                borderRadius: '5px', 
                                '& .MuiOutlinedInput-root': { borderColor: 'white', '&:hover fieldset': {borderColor: '#696767'}}}} 
                                defaultValue={savedUsername} 
                                fullWidth 
                                id='userName' 
                                name='userName' 
                                type='email' 
                                placeholder='Enter your username' 
                                required disabled={isPending || loginSuccess} />
                    </div>
                    <div>
                        <InputLabel 
                        htmlFor='password' 
                        sx={{
                            fontWeight: '500', 
                            fontSize: '20px', 
                            color: 'black', 
                            marginBottom: '5px'}}>
                            Password
                        </InputLabel>
                        <TextField 
                        sx={{
                            backgroundColor: 'white', 
                            borderRadius: '5px', 
                            '& .MuiOutlinedInput-root': {'& fieldset': {borderColor: 'primary.main'}, '&:hover fieldset': {borderColor: 'primary.main', borderWidth: '2px'}}}} 
                            fullWidth 
                            id='password' 
                            name='password' 
                            type='password' 
                            placeholder='Enter your password' 
                            required disabled={isPending || loginSuccess} />
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
                    <Button type='submit' 
                        sx={{
                            padding: '10px 5px', 
                            borderRadius: '5px', 
                            color: 'white', 
                            fontSize: '15px', 
                            '&.Mui-disabled': { backgroundColor: '#e3c942', color: 'white'}}} 
                            color='primary' 
                            variant='contained' 
                            disabled={isPending || loginSuccess}>{isPending ? <><CircularProgress size="15px" sx={{color: '#f4f9db', marginRight: '10px'}} enableTrackSlot /> LOGGING IN</> : 'LOGIN'}</Button>
                    {isError && (<ErrorMsg message={error.message} />)}
                    {loginSuccess && (
                        <Typography 
                            color="success" 
                            sx={{ 
                                fontWeight: 'bold', 
                                fontSize: '18px' }}>
                            Login successful! Redirecting...
                        </Typography>
                    )}
                </form>
            </Box>
            <Box 
                sx={{
                    width: '55%',
                    background: `url(${loginImg1}) center / cover no-repeat`
            }}></Box>
        </Box>
        </>
    )
}