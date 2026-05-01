import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <nav className="header">
    <div className="header-container">
      <Link to="/" className="logo-link">
        <h1 className="header-title">GitHub Profile Visualizer</h1>
      </Link>
      <ul className="nav-menu">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/repositories" className="nav-link">
            Repositories
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/analysis" className="nav-link">
            Analysis
          </Link>
        </li>
      </ul>
    </div>
  </nav>
)

export default Header
