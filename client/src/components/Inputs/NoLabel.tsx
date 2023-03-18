import { NoLabelInput } from '../../models'

const NoLabel = ({id, placeholder, type, name, value, n_class}: NoLabelInput) => {
  return (
    <input
        id={id}
        type={type}
        name={name}
        className={`block w-full p-3 rounded border focus:outline-none ${n_class}`}
        placeholder={placeholder}
        value={value}
      />
  )
}

export default NoLabel