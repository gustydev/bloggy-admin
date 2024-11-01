import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth";

export default function TopBar() {
    const auth = useAuth();
    return (
    <div className="topBar">
        <h1>bloggy (admin)</h1>
        <ul>
                <li>
                    <Link to='/'>home</Link>
                </li>
                |
                <li>
                    <a href="https://bloggy-blog.pages.dev">main blog</a>
                </li>
                {auth.token && auth.user ? (
                <li>
                    | logged in as <strong>{auth.user.name}</strong> (<a href='/' onClick={() => auth.logOut()}>log out</a>)
                </li>
            ) : ''} 
        </ul>
    </div>
    );
    
}