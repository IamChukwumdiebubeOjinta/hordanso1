import { LabelInput } from "../../models";

const Label = ({
  label: { text, l_class, htmlFor },
  input: {
    id,
    placeholder,
    type,
    n_class,
    name,
    value,
    required,
    pattern,
    handleChange,
    handleBlur,
  },
  errMsg,
}: LabelInput) => {
  return (
    <div className="mb-4">
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
        className={`block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none ${
          errMsg && "focus:border-red-400 focus:ring-red-400"
        } ${n_class}`}
        placeholder={placeholder}
        pattern={pattern}
        value={value}
        required={required}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errMsg && errMsg != "" && (
        <span className="text-sm mt-1 font-light mx-1 text-red-500 italic">
          {errMsg}
        </span>
      )}
    </div>
  );
};

export default Label;
