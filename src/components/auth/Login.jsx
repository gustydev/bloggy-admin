import { Link } from "react-router-dom"

export default function Login() {
    return (
        <div className='main'>
        <form action="" method='post'>
            <h2>log in:</h2>
            <label htmlFor="name">name: </label>
            <input type="text" id='name' name='name' placeholder='your username' />
            <label htmlFor="password">password: </label>
            <input type="password" id='password' name='password' />
            <input type="submit" value="submit" />
        </form>
        <p>
            don&apos;t have an account? <Link to='/register'>register</Link>
        </p>
        </div>
    )
}