import { useState } from "react";
import styles from "./ContactPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { sendContact } from "@/redux/slices/contact";

const ContactPage = () => {
  const [email, setEmail] = useState("");
  const [objet, setObjet] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { isLoading, success, error } = useSelector((state) => state.contact);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(sendContact({ email, objet, message }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Ce champ est obligatoire";
      isValid = false;
    }

    if (!objet.trim()) {
      newErrors.objet = "Ce champ est obligatoire";
      isValid = false;
    }

    if (!message.trim()) {
      newErrors.message = "Ce champ est obligatoire";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <div className={styles.contact_container}>
      <h1 className={styles.page_title}>Contactez-nous</h1>
      <form className={styles.contact_form} onSubmit={handleSubmit}>
        <div className={styles.form_group}>
          <label htmlFor="email" className={styles.form_label}>
            Entrez votre mail<span className="text-danger">*</span>
          </label>
          <input
            type="email"
            id="email"
            placeholder="Entrer votre mail"
            className={styles.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className="text-danger mx-5 text-error">{errors.email}</span>}
        </div>
        <div className={styles.form_group}>
          <label htmlFor="objet" className={styles.form_label}>
            Entrez l'objet de votre message<span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="objet"
            placeholder="Objet"
            className={styles.objet}
            value={objet}
            onChange={(e) => setObjet(e.target.value)}
          />
          {errors.objet && <span className="text-danger mx-5 text-error">{errors.objet}</span>}
        </div>
        <div className={styles.form_group}>
          <label htmlFor="message" className={styles.form_label}>
            Entrez votre message<span className="text-danger">*</span>
          </label>
          <textarea
            id="message"
            placeholder="Entrer votre message ici"
            className={styles.message}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {errors.message && <span className="text-danger mx-5 text-error">{errors.message}</span>}
        </div>
        <button
          type="submit"
          className={styles.contact_btn}
          disabled={isLoading}
        >
          {isLoading ? "Envoi..." : "Envoyer"}
        </button>
      </form>

      {success && (
        <div className={styles.popup}>
          <p>Votre message a été envoyé avec succès !</p>
        </div>
      )}

      {error && (
        <div className={styles.error}>
          <p>Erreur lors de l'envoi du message: {error}</p>
        </div>
      )}
    </div>
  );
};

export default ContactPage;
