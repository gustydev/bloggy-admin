import { Link } from "react-router-dom"
import useAuth from "../../hooks/useAuth";

export default function TopBar() {
    const auth = useAuth();
    console.log(auth)
    return (
    <div className="topBar">
        <h1>bloggy</h1>
        <ul>
            {auth.token && auth.user ? (
                <li>
                    logged in as <strong>{auth.user.name}</strong> (<a href='/' onClick={() => auth.logOut()}>log out</a>)
                </li>
            ) : (
                <>
                <li>
                    <Link to='/'>home</Link>
                </li>
                <li>
                    <a href="">blog</a>
                    {/* this link should lead to the user/client front-end */}
                </li>
                </>
            )}
        </ul>
    </div>
    );
    
}