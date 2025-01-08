export const loginUser = async (username: string, password: string) => {
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password
        })
    });

    if (response.ok) {
        const responseData = await response.json();
        
        if (responseData.status == 'success') {
            localStorage.setItem('access', responseData.data.access);
            localStorage.setItem('refresh', responseData.data.refresh);
            localStorage.setItem('user', JSON.stringify(responseData.data.user));
        } else {
            // Managed error
            const error = responseData.message;
            window.location.href = `/login?error=${error}`;
        }
    } else {
        // Unmanaged error
        const errorData = await response.json();
        window.location.href = `/login?error=${errorData.error}`
    }
};

export const registerUser = async (username: string, email: string, password: string) => {
    const response = await fetch('/api/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            email,
            password
        })
    });

    if (response.ok) {
        window.location.href = '/login';
    } else {
        const errorData = await response.json();
        window.location.href = `/register?error=${errorData.error}`;
    }
}

export const getUser = () => {
    // Call this method once to verify the user token exists.
    getAuthToken();

    const userInStorage = localStorage.getItem('user');
    const userData = JSON.parse(
        userInStorage ?? ''
    );

    return userData;
}

export const getAuthToken = () => {
    const token = localStorage.getItem('access');

    if (!token) {
        throw new Error("User is not logged in. There is no token stored.");
    }

    return token;
}

export const logoutUser = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('user');

    window.location.href = '/login';
}
