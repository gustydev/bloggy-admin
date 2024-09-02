import { Link } from "react-router-dom"
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

export default function Login() {
    const [loginInput, setLoginInput] = useState({name: '', password: ''})
    const auth = useAuth();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginInput((prevInput) => ({
          ...prevInput,
          [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (loginInput.name !== '' && loginInput.password !== '') {
            auth.userLogin(loginInput)
            return
        }
        alert('invalid input')
    }
    
    return (
        <div className='main'>
        <form action="" method='post' onSubmit={(e) => { handleSubmit(e) }}>
            <h2>log in:</h2>
            <label htmlFor="name">name: </label>
            <input onChange={(e) => {handleInputChange(e)}} required type="text" id='name' name='name' placeholder='your username' />
            <label htmlFor="password">password: </label>
            <input onChange={(e) => {handleInputChange(e)}} required type="password" id='password' name='password' />
            <input type="submit" value="submit" />
        </form>
        {auth.error && <p><strong>{auth.error}</strong>. Please try again.</p>}
        <p>
            don&apos;t have an account? <Link to='/register'>register</Link>
        </p>
        </div>
    )
}