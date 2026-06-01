import styles from "./Cgu.module.css";

const Cgu = () => {
  return (
    <div className={styles.cgu_container}>
      <h1>Conditions Générales d'Utilisation</h1>
      <p>
        Bienvenue sur le site AIRNES. En accédant et en utilisant ce site, vous
        acceptez les présentes Conditions Générales d'Utilisation (CGU).
        Veuillez les lire attentivement.
      </p>

      <h2>1. Introduction</h2>
      <p>
        Les présentes CGU régissent l'utilisation du site web AIRNES. En
        accédant à ce site, vous acceptez ces termes dans leur intégralité. Si
        vous n'acceptez pas ces termes, veuillez ne pas utiliser notre site.
      </p>

      <h2>2. Définitions</h2>
      <p>
        Dans les présentes CGU, les termes suivants ont la signification
        indiquée ci-dessous:
      </p>
      <ul>
        <li>
          <strong>Site :</strong> le site web d'AIRNES accessible à l'adresse{" "}
          <a href="https://airneis.tsiang.fr">https://www.airneis.tsiang.fr</a>.
        </li>
        <li>
          <strong>Utilisateur :</strong> toute personne accédant et naviguant
          sur le site.
        </li>
        <li>
          <strong>Produits :</strong> les meubles et articles proposés à la
          vente sur le site.
        </li>
      </ul>

      <h2>3. Accès au site</h2>
      <p>
        Le site est accessible gratuitement à tout utilisateur disposant d'un
        accès à Internet. Les frais liés à l'accès au site (matériel, logiciels,
        connexion Internet, etc.) sont à la charge de l'utilisateur.
      </p>

      <h2>4. Utilisation du site</h2>
      <p>
        Vous vous engagez à utiliser le site de manière légale et respectueuse.
        Vous ne devez pas :
      </p>
      <ul>
        <li>Utiliser le site pour des activités frauduleuses ou illégales.</li>
        <li>
          Utiliser des méthodes d'automatisation pour accéder au site ou
          extraire des données.
        </li>
        <li>
          Interférer avec le bon fonctionnement du site ou tenter de violer sa
          sécurité.
        </li>
      </ul>

      <h2>5. Commandes et achats</h2>
      <p>
        Les commandes de produits sur le site sont soumises à nos{" "}
        <a href="/conditions-generales-de-vente">
          Conditions Générales de Vente
        </a>
        . En passant commande, vous acceptez ces conditions.
      </p>

      <h2>6. Propriété intellectuelle</h2>
      <p>
        Tous les contenus du site (textes, images, logos, vidéos, etc.) sont la
        propriété exclusive de AIRNES ou de ses partenaires. Toute reproduction
        ou utilisation non autorisée de ces contenus est interdite.
      </p>

      <h2>7. Protection des données</h2>
      <p>
        AIRNES s'engage à protéger les données personnelles des utilisateurs
        conformément à notre{" "}
        <a href="/politique-de-confidentialite">Politique de Confidentialité</a>
        .
      </p>

      <h2>8. Limitation de responsabilité</h2>
      <p>
        AIRNES ne saurait être tenu responsable des dommages directs ou
        indirects résultant de l'utilisation du site ou de l'incapacité à
        l'utiliser.
      </p>

      <h2>9. Modification des CGU</h2>
      <p>
        AIRNES se réserve le droit de modifier les présentes CGU à tout moment.
        Les utilisateurs seront informés de ces modifications par une mise à
        jour sur cette page.
      </p>

      <h2>10. Droit applicable</h2>
      <p>
        Les présentes CGU sont régies par le droit français. En cas de litige,
        les tribunaux français seront seuls compétents.
      </p>

      <h2>11. Contact</h2>
      <p>
        Pour toute question concernant ces CGU, vous pouvez nous contacter à
        l'adresse suivante :{" "}
        <a href="mailto:support@airneis.com">support@airneis.com</a>.
      </p>
    </div>
  );
};

export default Cgu;
