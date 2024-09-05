import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../utils/config";
import { apiRequest } from "../../utils/api";

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
            await apiRequest(`${API_URL}/user/register`, {
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(registerInput)
            })
            
            alert(`user ${registerInput.name} sucessfully registered! proceed to log in`)
            navigate('/login');
        } catch (errors) {
            setErrors(errors)
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