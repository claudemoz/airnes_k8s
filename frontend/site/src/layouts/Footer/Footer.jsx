import { LuLinkedin, LuFacebook, LuInstagram } from "react-icons/lu";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      className={`${styles.footerContainer} d-flex justify-content-between align-items-center`}
    >
      <div className="d-flex justify-content-between gap-10">
        <NavLink to="/cgu" className={styles.footerItem}>CGU</NavLink>
        <NavLink to="/mentionsLegales" className={styles.footerItem}>Mentions légales</NavLink>
        <NavLink to="/contact" className={styles.footerItem}>Contact</NavLink>
      </div>
      <div className="d-flex justify-content-between gap-10">
        <Link className={styles.footerItem}>
          <LuLinkedin size={24} />
        </Link>
        <Link className={styles.footerItem}>
          <LuFacebook size={24} />
        </Link>
        <Link className={styles.footerItem}>
          <LuInstagram size={24} />
        </Link>
      </div>
    </footer>
  );
}
