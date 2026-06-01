/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./FormLoginPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/slices/auth";

export default function FormLoginPage({ from_path }) {
  const navigate = useNavigate();
  const location = useLocation();
  const initData = {
    email: "",
    password: "",
  };

  const [userData, setUserData] = useState(initData);
  const [errors, setErrors] = useState({});
  const { user, error, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!userData.email.trim()) {
      newErrors.email = "Ce champ est obligatoire";
      isValid = false;
    }

    if (!userData.password.trim()) {
      newErrors.password = "Ce champ est obligatoire";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      dispatch(login(userData));
      setUserData(initData);
    }
  };

  useEffect(() => {
    if (error?.isVerified === false && !user?.Verified) {
      navigate("/active-account", { state: { from: location.pathname } });
    } else if (isAuthenticated) {
      if (from_path) {
        navigate(from_path);
      } else {
        navigate("/");
      }
    }
  }, [isAuthenticated]);

  return (
    <>
      <div className={styles.login_container}>
        <h1 className={styles.form_title}>Connexion</h1>
        <form className={styles.form_container} onSubmit={handleSubmit}>
          <div className={styles.form_group}>
            <label htmlFor="email">
              Email<span className="text-danger">*</span>
            </label>
            <input
              value={userData.email}
              className={styles.form_input}
              type="email"
              name="email"
              placeholder="Votre email..."
              onChange={handleChange}
            />
            {errors.email && (
              <span className="text-danger mx-5 text-error">
                {errors.email}
              </span>
            )}
          </div>
          <div className={styles.form_group}>
            <label htmlFor="password">
              Mot de passe<span className="text-danger">*</span>
            </label>
            <input
              value={userData.password}
              className={styles.form_input}
              type="password"
              name="password"
              placeholder="Votre mot de passe..."
              onChange={handleChange}
            />
            {errors.password && (
              <span className="text-danger mx-5 text-error">
                {errors.password}
              </span>
            )}
          </div>
          {error && <div className="text-danger mx-5 text-error">{error}</div>}
          <div className="d-flex mt-20 px-10">
            <span className={`${styles.formSpan} flex-1`}>
              Pas encore de compte ?{" "}
            </span>
            <span
              className={`${styles.formSpan} text-primary cursor-pointer`}
              onClick={() => navigate("/register")}
            >
              Créer un compte
            </span>
          </div>
          <span
            onClick={() => navigate("/forgot-password")}
            className={`${styles.formSpan} text-primary mt-20 d-flex justify-content-center cursor-pointer`}
          >
            Mot de passe oublié ?
          </span>
          <div className={styles.login_button}>
            <button
              onClick={handleSubmit}
              className={`${styles.button} cursor-pointer`}
            >
              Se connecter
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
