import { LabelInput } from "../../models";

const Label = ({
  label: { text, l_class, htmlFor },
  input: { id, placeholder, type, n_class, name, value, required, pattern, handleChange, handleBlur },
}: LabelInput) => {
  return (
    <div className="mb-5">
      <label
        htmlFor={htmlFor}
        className={`block mb-2 text-sm font-medium text-gray-600 ${l_class}`}
      >
        {text}
      </label>

      <input
        id={id}
        type={type}
        name={name}
        className={`block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none ${n_class}`}
        placeholder={placeholder}
        pattern={pattern}
        value={value}
        required={required}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default Label;
