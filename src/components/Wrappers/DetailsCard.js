import styles from "./../../css/detailsCard.module.css";

function DetailsCard({ children }) {
  return <div className={styles.detailsCard}>{children}</div>;
}

export default DetailsCard;
