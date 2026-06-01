import React from 'react';
import styles from './ConfirmModal.module.css';

const ConfirmModal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h1>Confirmation : Êtes-vous sûr de vouloir annuler la commande ?</h1>
    <p>Lors de l'annulation d'une commande, nous nous efforçons de traiter votre demande rapidement et efficacement. Voici les conditions et les étapes qui se déroulent :</p>

    <h3>Conditions d'Annulation :</h3>
    <ul>
        <li>L'annulation est possible avant l'expédition de la commande.</li>
        <li>Si la commande a déjà été expédiée, l'annulation ne sera pas possible et vous devrez suivre notre politique de retour.</li>
        <li>Les articles personnalisés ou fabriqués sur mesure ne peuvent pas être annulés une fois la production commencée.</li>
    </ul>

    <h3>Étapes de l'Annulation :</h3>
    <ul>
        <li>Contactez notre service clientèle avec votre numéro de commande pour demander l'annulation.</li>
        <li>Nous vérifierons l'état de votre commande et confirmerons si l'annulation est possible.</li>
        <li>Si l'annulation est approuvée, nous initierons le processus de remboursement.</li>
        <li>Les remboursements seront effectués sur le mode de paiement d'origine dans un délai de 7 à 14 jours ouvrables.</li>
    </ul>

    <p>Pour toute question ou assistance supplémentaire, veuillez contacter notre service clientèle à <a href="mailto:service.client@exemple.com">service.client@exemple.com</a></p>
       <div className={styles.buttons}> <button onClick={onConfirm} className={styles.confirmButton}>Oui, je souhaite annuler ma commande</button>
        <button onClick={onClose} className={styles.cancelButton}>Non, je me rétracte</button></div>
      </div>
    </div>
  );
};

export default ConfirmModal;
