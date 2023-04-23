import styles from "./style.module.scss";

export default function ActionButton({
  className,
  action,
  btnText,
}: {
  className: string;
  action: () => void;
  btnText: string;
}) {
  return (
    <button className={styles[className]} onClick={action}>
      {btnText}
    </button>
  );
}
