import styles from "./Apropos.module.css";

const About = () => {
  return (
    <div className={styles.about_container}>
      <h1>À propos de AIRNES</h1>
      <p>
        Bienvenue chez AIRNES, votre destination en ligne pour des meubles
        élégants, durables et abordables. Notre mission est de transformer
        chaque maison en un lieu de confort et de style en offrant une gamme de
        meubles qui s’adaptent à tous les goûts et budgets.
      </p>

      <h2>Notre Histoire</h2>
      <p>
        AIRNES a été fondé en 2024 avec une vision simple : rendre le design de
        qualité accessible à tous. Inspirés par les tendances mondiales et
        l'artisanat local, nous avons créé une collection de meubles qui combine
        esthétique, fonctionnalité et durabilité.
      </p>

      <h2>Nos Valeurs</h2>
      <ul>
        <li>
          <strong>Qualité :</strong> Nous sélectionnons avec soin chaque
          matériau et chaque produit pour garantir une durabilité maximale.
        </li>
        <li>
          <strong>Accessibilité :</strong> Nous croyons que tout le monde mérite
          de vivre dans un bel espace, c’est pourquoi nous proposons des prix
          compétitifs sans compromis sur la qualité.
        </li>
        <li>
          <strong>Satisfaction Client :</strong> Votre satisfaction est notre
          priorité. Nous nous engageons à offrir un service client exceptionnel
          à chaque étape de votre achat.
        </li>
      </ul>

      <h2>Notre Équipe</h2>
      <p>
        Notre équipe est composée de passionnés de design d'intérieur, de
        professionnels du service client et d'experts en logistique. Ensemble,
        nous travaillons pour offrir une expérience d'achat unique et
        personnalisée.
      </p>

      <h2>Contactez-Nous</h2>
      <p>
        Nous sommes toujours à votre écoute pour répondre à vos questions ou
        pour vous aider à choisir le meuble parfait pour votre maison. N’hésitez
        pas à nous contacter à l’adresse suivante :{" "}
        <a href="mailto:contact@airneis.com">contact@airneis.com</a>.
      </p>
    </div>
  );
};

export default About;
