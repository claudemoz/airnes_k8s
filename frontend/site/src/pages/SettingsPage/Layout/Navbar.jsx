import { Link, useMatch } from 'react-router-dom';
import styles from './Navbar.module.css';
import { FaShoppingCart, FaUser, FaCog, FaQuestionCircle } from 'react-icons/fa';

export default function Navbar(){
 const  matchSettings = useMatch('/settings');
 const  matchProfile = useMatch('/settings/profile');
 const  matchHelp = useMatch('/settings/help');
  return (
    <nav className={styles.leftNavbar}>
      <ul>
        <li>
          <Link to="/settings" className={`${styles.navLink } ${matchSettings ? styles.active: ''}`}>
          <FaCog className={styles.navIcon} /> Paramètres</Link>
        </li>
        <li>
          <Link to="/settings/profile" className={`${styles.navLink } ${matchProfile ? styles.active: ''}`}>
          <FaUser className={styles.navIcon} /> Profile</Link>
        </li>
        <li>
          <Link to="/settings/help" className={`${styles.navLink } ${matchHelp ? styles.active: ''}`}>
          <FaQuestionCircle className={styles.navIcon} /> Help</Link>
        </li>
      </ul>
    </nav>
  );
}