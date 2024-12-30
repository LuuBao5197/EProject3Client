import { useState } from "react";

const InputField = ({ type, placeholder, icon, value, onChange }) => {
  // State to toggle password visibility
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  return (
    <div className="input-wrapper">
      <input
        type={isPasswordShown ? 'text' : type}
        placeholder={placeholder}
        className="input-field"
        value={value} // Bind the value to the parent component's state
        onChange={onChange} // Handle changes in the input field
        required
      />
      <i className="material-symbols-rounded">{icon}</i>
      {type === 'password' && (
        <i 
          onClick={() => setIsPasswordShown(prevState => !prevState)} 
          className="material-symbols-rounded eye-icon"
        >
          {isPasswordShown ? 'hide' : 'show'}
        </i>
      )}
    </div>
  )
}

export default InputField;
