import styles from "./../../css/detailsCard.module.css";

function DetailsCard(props) {
  return <div className={styles.detailsCard}>{props.children}</div>;
}

export default DetailsCard;
