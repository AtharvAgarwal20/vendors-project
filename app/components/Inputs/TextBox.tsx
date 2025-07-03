import { VendorFormData } from "@/app/utils/types";

type TextBoxProps = {
  name: keyof VendorFormData;
  label: string;
  value: VendorFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};

const TextBox = ({
  name,
  label,
  required = false,
  value,
  onChange,
}: TextBoxProps) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        name={name}
        placeholder={label}
        id={name}
        required={required}
        value={value[`${name}`]}
        onChange={onChange}
      />
    </>
  );
};

export default TextBox;
