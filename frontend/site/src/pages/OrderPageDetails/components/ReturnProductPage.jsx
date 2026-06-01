import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './ReturnProductPage.module.css'; // Importer le fichier CSS pour le style
import { RiCustomerService2Fill } from "react-icons/ri";
import { GoPackageDependencies } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import { LuPackageSearch } from "react-icons/lu";
import { RiRefund2Line } from "react-icons/ri";
import {toast} from 'sonner'

export default function ReturnProductsPage() {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();

  useEffect(() => {
    if (state && state.selectedItems) { // Vérifiez que state et state.selectedItems sont définis
      const { updatedOrderItems, selectedItems, selectedProductDetails, orderId } = state;
      console.log(updatedOrderItems); // Assurez-vous que cela affiche les données attendues
      console.log(selectedItems);
      console.log(selectedProductDetails);
      console.log("orderId",orderId)
    }
  }, [state]);

  const handleConfirmReturn = async () => {
    try {
      const { updatedOrderItems, orderId } = state;
      const response = await fetch(`http://localhost:9000/api/v1/order/update-order-item/${orderId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({updatedOrderItems }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update order ');
      }
      toast.success("Procédure de retour validé");
      navigate(-1)

      // Redirect back to the order details page after successful return
      //history.push(`/orders/${order._id}`);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const handleCancelReturn = () => {

    navigate(-1)
    //onCancelReturn();
    //history.push(`/orders/${order._id}`);
  };

  return (
    <div className={styles['return-products-container']}>
      <h1>Conditions de Retour</h1>

      {/* Section pour les étapes de retour */}
      <div className={styles['steps-container']}>
        <div className={styles['step-item']}>
        <div className={styles['service_icon']}><RiCustomerService2Fill  className={`${styles['icon']} fa-2x`}/></div>
          <p>Contactez notre service client par téléphone ou sur l'application</p>
        </div>
        <div className={styles['step-item']}>
          <div className={styles['package_icon']}><GoPackageDependencies className={`${styles['icon']} fa-2x`}/></div>
          <p>Renvoyez le colis à l'adresse du siège </p>
        </div>
        <div className={styles['step-item']}>
        <div className={styles['inspection_icon']}><LuPackageSearch className={`${styles['icon']} fa-2x`}/></div>
          <p>Inspection de l'état du colis par nos équipes </p>
        </div>
        <div className={styles['step-item']}>
        <div className={styles['cash_icon']}><RiRefund2Line className={`${styles['icon']} fa-2x`}/></div>
          <p>Si l'avis d'inspection est favorable : Remboursement dans les septs jours</p>
        </div>
      </div>

      <div className={styles['return-conditions']}>
        <div className={styles['return-section']}>
          <h4>1. Retours Acceptés :</h4>
          <ul>
            <li>Les retours sont acceptés dans un délai de 30 jours à compter de la date de livraison pour les articles non personnalisés et non endommagés.</li>
            <li>Les articles doivent être dans leur emballage d'origine et être dans un état neuf pour être éligibles au retour.</li>
            <li>Les retours pour les articles personnalisés ou assemblés sur mesure peuvent être soumis à des restrictions supplémentaires.</li>
          </ul>
        </div>

        <div className={styles['return-section']}>
          <h4>2. Processus de Retour :</h4>
          <ul>
            <li>Contactez notre service clientèle pour obtenir une autorisation de retour avant de renvoyer tout article.</li>
            <li>Les articles doivent être retournés avec tous les accessoires d'origine, manuels et documents inclus.</li>
            <li>Les frais de retour peuvent être à la charge du client sauf en cas de défaut ou d'erreur de notre part.</li>
          </ul>
        </div>

        <div className={styles['return-section']}>
          <h4>3. Exclusions de Retour :</h4>
          <ul>
            <li>Les articles utilisés, endommagés ou modifiés après la livraison ne sont pas éligibles au retour.</li>
            <li>Les articles non retournés dans leur emballage d'origine ou qui ont été assemblés ou installés peuvent ne pas être acceptés.</li>
          </ul>
        </div>

        <div className={styles['return-section']}>
          <h4>4. Remboursements :</h4>
          <ul>
            <li>Les remboursements seront émis une fois que les articles retournés auront été inspectés et approuvés.</li>
            <li>Les remboursements seront traités via le mode de paiement d'origine dans un délai de 7 à 14 jours ouvrables après l'approbation du retour.</li>
          </ul>
        </div>

        <div className={styles['return-section']}>
          <h4>5. Échanges :</h4>
          <ul>
            <li>Les échanges ne sont pas disponibles pour tous les articles ; veuillez contacter notre service clientèle pour vérifier la disponibilité des échanges.</li>
            <li>Des frais de transport supplémentaires peuvent s'appliquer pour les échanges en fonction du produit et de la destination.</li>
          </ul>
        </div>

        <div className={styles['return-section']}>
          <h4>6. Articles Défectueux ou Endommagés :</h4>
          <ul>
            <li>Veuillez signaler tout article défectueux ou endommagé dès réception.</li>
            <li>Nous remplacerons ou réparerons les articles défectueux selon notre politique de garantie après évaluation.</li>
          </ul>
        </div>

        <div className={styles['return-section']}>
          <h4>7. Politique de Garantie :</h4>
          <ul>
            <li>Les articles sont couverts par une garantie limitée contre les défauts de fabrication selon les conditions spécifiques indiquées sur chaque produit.</li>
            <li>Les réparations ou remplacements seront effectués à notre discrétion après l'inspection et la confirmation du défaut.</li>
          </ul>
        </div>
      </div>

      <div className={styles['image_returned_section']}>
        <div className={styles['return-section']}>
          <h4>Les articles renvoyés sont les suivants :</h4>
        </div>
        <div className={styles['images-grid']}>
          {state && state.selectedProductDetails && state.selectedProductDetails.map(item => (
            <div key={item._id} className={styles['grid-item']}>
              <img src={item.images[0].url} alt={item.name} />
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles['button-container']}>
        <button onClick={handleConfirmReturn}>Confirmer le retour</button>
        <button onClick={handleCancelReturn}>Annuler</button>
      </div>
    </div>
  );
}
