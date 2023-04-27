import styles from "./style.module.scss";

export default function Checkbox({
  checkedPredicate,
  onChange,
  className,
}: {
  checkedPredicate: boolean;
  onChange: () => void;
  className: string;
}) {
  return (
    <input
      type="checkbox"
      checked={checkedPredicate}
      onChange={onChange}
      className={styles[className]}
    ></input>
  );
}
