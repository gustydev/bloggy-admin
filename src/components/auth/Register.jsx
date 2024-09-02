import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [registerInput, setRegisterInput] = useState({
        name: '', 
        password: '',
        secret: ''
    })
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRegisterInput((prevInput) => ({
          ...prevInput,
          [name]: value,
        }));
    };

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await fetch(`https://cors-anywhere.herokuapp.com/https://bloggy.adaptable.app/api/v1/user/register`, {
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(registerInput)
            })
            
            const json = await response.json();       

            if (!response.ok) {
                console.log(response, json)
                setErrors(json.errors.messages || 'An error has occured. Please try again.')
                throw new Error(`Error in user register (status ${response.status})`)
            } else {
                alert(`user ${registerInput.name} sucessfully registered! proceed to log in`)
                navigate('/login');
            }
            
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
        <form action="" method='post' onSubmit={(e) => { handleSubmit(e) }}>
            <h2>register:</h2>
            <label htmlFor="name">name*: </label>
            <input onChange={(e) => {handleInputChange(e)}} required type="text" name='name' id='name'/>
            <label htmlFor="password">password*: </label>
            <input onChange={(e) => {handleInputChange(e)}} required type="password" id='password' name='password'/>
            <label htmlFor="secret">secret word*:</label>
            <input onChange={(e) => {handleInputChange(e)}} required type="text" id='secret' name='secret'/>
            <input type="submit" value="submit" />
        </form>
        {errors && (
            <div className="errors">
            <p><strong>{errors.length > 1 ? 'errors:' : 'error:'}</strong></p>
            <ul>
            {errors.map((e, index) => (
                <li key={index}>{e}</li>
            ))}
            </ul>
            </div>
        )}
        </>
    )
}