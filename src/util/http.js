import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export async function loginAdmin({userName, password}) {
    const response = await fetch('https://restaurantapi.bssoln.com/api/Auth/signIn', {
        method: 'POST',
        headers: {
            'accept': '*/*',
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