import { useNavigate } from "react-router-dom";
import styles from "./style.module.scss";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <a onClick={() => navigate("/main")}>main</a>
      <a onClick={() => navigate("/views")}>views</a>
      <div>
        language
        <select>
          <option>English</option>
          <option>Polski</option>
        </select>
      </div>
    </header>
  );
}
