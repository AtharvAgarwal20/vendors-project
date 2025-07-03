import { VendorFormData } from "@/app/utils/types";
import styles from "./inputs.module.scss";

type TextBoxProps = {
  name: keyof VendorFormData;
  label: string;
  value: VendorFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
};

const TextBox = ({
  name,
  label,
  required = false,
  value,
  onChange,
  error,
}: TextBoxProps) => {
  return (
    <div className={styles.textBox}>
      <label htmlFor={name} style={{ marginBottom: "0.25rem" }}>
        {label}
      </label>
      <input
        type="text"
        name={name}
        placeholder={label}
        id={name}
        required={required}
        value={value[`${name}`]}
        onChange={onChange}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default TextBox;
