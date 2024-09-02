import './App.css'
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

function App() {
  return (
    <>
      <div className="topBar">
        <h1>bloggy</h1>
        <ul>
          <li>
            <Link to='/'>home</Link>
          </li>
          <li>
            <a href="/">blog</a>
            {/* this link should lead to the user/client front-end */}
          </li>
        </ul>
      </div>
      <Outlet></Outlet>
    </>
  )
}

export default App
