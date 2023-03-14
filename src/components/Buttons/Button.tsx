import { CustomButton } from "../../models";

export const Button = ({ className, text }: CustomButton) => (
  <button
    className={`w-full p-3 mt-4 text-white rounded shadow ${className}`}
    type='submit'
  >
    {text}
  </button>
);
