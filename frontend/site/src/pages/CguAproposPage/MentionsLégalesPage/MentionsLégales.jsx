import React from "react";
import styles from "./MentionsLégales.module.css";

const MentionsLegales = () => {
  return (
    <div className={styles.cgu_container}>
      <h1>Mentions Légales</h1>
      <p>
        Conformément aux dispositions des articles 6-III et 19 de la Loi n°
        2004-575 du 21 juin 2004 pour la Confiance dans l'économie numérique,
        dite L.C.E.N., nous portons à la connaissance des utilisateurs et
        visiteurs du site AIRNES les informations suivantes :
      </p>

      <h2>1. Informations légales</h2>
      <p>
        <strong>Propriétaire du site :</strong> AIRNES
        <br />
        <strong>Siège social :</strong> 123 Rue de l'Ameublement, 75000 Paris,
        France
        <br />
        <strong>Téléphone :</strong> +33 1 23 45 67 89
        <br />
        <strong>Email :</strong> contact@airneis.com
        <br />
        <strong>Numéro SIRET :</strong> 123 456 789 00000
        <br />
        <strong>Directeur de publication :</strong> Jean Dupont
      </p>

      <h2>2. Hébergement</h2>
      <p>
        <strong>Hébergeur :</strong> OVH
        <br />
        <strong>Adresse :</strong> 2 Rue Kellermann, 59100 Roubaix, France
        <br />
        <strong>Téléphone :</strong> +33 9 72 10 10 07
      </p>

      <h2>3. Propriété intellectuelle</h2>
      <p>
        Le site, son contenu et tous les éléments qui le composent (textes,
        images, vidéos, logos, etc.) sont la propriété exclusive de AIRNES, sauf
        indication contraire. Toute reproduction, distribution, modification ou
        utilisation de ces éléments, sans l'autorisation préalable écrite de
        AIRNES, est strictement interdite et pourra être sanctionnée au titre de
        la propriété intellectuelle.
      </p>

      <h2>4. Données personnelles</h2>
      <p>
        AIRNES s'engage à protéger les données personnelles de ses utilisateurs.
        Pour plus d'informations, consultez notre{" "}
        <a href="/politique-de-confidentialite">Politique de Confidentialité</a>
        .
      </p>

      <h2>5. Responsabilité</h2>
      <p>
        Les informations présentes sur le site sont fournies à titre indicatif.
        AIRNES ne saurait être tenu responsable des erreurs ou omissions dans
        les contenus diffusés ou des conséquences pouvant résulter de leur
        utilisation ou interprétation.
      </p>

      <h2>6. Liens hypertextes</h2>
      <p>
        Le site AIRNES peut contenir des liens hypertextes vers d'autres sites.
        AIRNES décline toute responsabilité quant au contenu de ces sites tiers,
        qui restent sous la responsabilité de leurs propriétaires respectifs.
      </p>

      <h2>7. Modification des mentions légales</h2>
      <p>
        AIRNES se réserve le droit de modifier les présentes mentions légales à
        tout moment. Les utilisateurs sont invités à les consulter
        régulièrement.
      </p>

      <h2>8. Droit applicable</h2>
      <p>
        Les présentes mentions légales sont soumises au droit français. En cas
        de litige, les tribunaux français seront seuls compétents.
      </p>

      <h2>9. Contact</h2>
      <p>
        Pour toute question concernant ces mentions légales, vous pouvez nous
        contacter à l'adresse suivante :{" "}
        <a href="mailto:contact@airneis.com">contact@airneis.com</a>.
      </p>
    </div>
  );
};

export default MentionsLegales;
