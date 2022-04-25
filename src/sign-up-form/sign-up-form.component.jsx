import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormField = () => {
    setFormFields(defaultFormFields);
  };

  /**event handler for form */
  const handleSubmit = async (event) => {
    event.preventDefault();
    //pass math
    if (password !== confirmPassword) {
      alert(`Passwords don not match`);
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      // console.log(response);

      await createUserDocumentFromAuth(user, { displayName });
      resetFormField();
    } catch (error) {
      if (error.code === `auth/email-already-in-use`) {
        alert("cannot create user, email already in use");
      }
      console.error(`user creation encountered an error ${error}`);
    }
  };

  // const {user} = createAuthUserWithEmailAndPassword(email,password);
  // const { user } = await signInWithGooglePopup(); //in all response we really need now only user
  // const userDocRef = await createUserDocumentFromAuth(user);

  const handleChange = (event) => {
    const { name, value } = event.target;
    // Ми створюємо в об'єкті пару ключ: значення двічі,
    // перший раз {...objName} просто повторює наш об'єкт, а другий перезаписує будь яку вже існуюче поле
    // на кшталт {name: 'Alex', name: 'Joe'}
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label>Displaye Name</label>
        <input
          required
          type="text"
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />
        <label>Email</label>
        <input required type="email" onChange={handleChange} name="email" value={email} />
        <label>Password</label>
        <input
          required
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
        />
        <label>Confirm Password</label>
        <input
          required
          type="password"
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <button type="submit">Sign Up</button>
      </form>
    </section>
  );
};

export default SignUpForm;
