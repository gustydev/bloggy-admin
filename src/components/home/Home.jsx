import Login from '../auth/Login';

export default function Home() {
    let isLoggedIn = false;
    // Just for demonstartion (change later with actual authentication logic)

    return (
        <>
        {isLoggedIn ? "main page component" : <Login></Login>}
        </>
    )
}