import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export async function loginAdmin({userName, password}) {
    const response = await fetch('https://bssrms.runasp.net/api/Auth/signIn', {
        method: 'POST',
        headers: {
            'accept': 'text/plain',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userName,
            password
        })
    })

    if (!response.ok) {
        throw new Error('Login failed. Invalid credentials.')
    }

    return response.json();
}

export async function getEmployees({signal}) {
    const token = localStorage.getItem('token');
    
    const response = await fetch('https://bssrms.runasp.net/api/Employee/datatable',{
        method: 'GET',
        headers: {
            'accept': '*/*',
            'Authorization': `Bearer ${token}`
        },
    }, {signal})

    if (!response.ok) {
        throw new Error('Failed to fetch employees.')
    }

    const result = await response.json()
    return result
} 