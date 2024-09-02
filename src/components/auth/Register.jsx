export default function Register() {
    return (
        <form action="" method='post'>
            <h2>register</h2>
            <label htmlFor="name">name*: </label>
            <input required  type="text" name='name' id='name'/>
            <label htmlFor="password">password*: </label>
            <input required  type="password" id='password' name='password'/>
            <label htmlFor="secret">secret word*:</label>
            <input required  type="text" id='secret' name='secret'/>
            <input type="submit" value="submit" />
        </form>
    )
}