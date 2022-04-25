import "./button.styles.scss";

const BUTTON_TYPE_CLASSES = {
  google: "google-sign-in",
  inverted: "inverted",
};

/** Our custom button component, black button white text
 *
 * @param {string} buttonType - for default leave empty (undefined), for blue google color - "google", for inverted style - "inverted"
 * @param {Object} children - will be rendered inside button
 * @returns custom button component
 */
const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <button
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
