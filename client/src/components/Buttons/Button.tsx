import { CustomButton } from "../../models";

const Button = ({ className, text, image, onclick }: CustomButton) => (
  <button
    className={`w-full p-3 mt-4 flex justify-center gap-2 rounded shadow ${className}`}
    type='submit'
    onClick={onclick}
  >
   {image && <img src={image} alt="image" className="w-6 h-6" />} {text}
  </button>
);

export default Button
