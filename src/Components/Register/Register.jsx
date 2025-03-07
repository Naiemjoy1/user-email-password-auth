import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import auth from "../Firebase/Fire.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accepted = e.target.terms.checked;
    console.log(name, email, password, accepted);

    // reset error
    setRegisterError("");
    setSuccess("");

    if (password.length < 6) {
      setRegisterError("password should be at least 6 characters or longer");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterError(
        "Your password should have at least on upper case characters."
      );
      return;
    } else if (!accepted) {
      setRegisterError("Please accept our terms and conditions!");
      return;
    }

    // create user
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess("user created successfully.");
        // update profile
        updateProfile(result.user, {
          displayName: name,
          photoURL: "https://example.com/jane-q-user/profile.jpg",
        })
          .then(() => console.log("Profile Updated"))
          .catch();
        // send verification email
        sendEmailVerification(result.user).then(() => {
          alert("Please check your email and verify your account");
        });
      })
      .catch((error) => {
        console.log(error);
        setRegisterError(error.message);
      });
  };
  return (
    <div className="border p-10">
      <div className=" mx-auto md:w-1/2">
        <h2>Register here</h2>
        <form onSubmit={handleRegister}>
          <input
            className=" border w-full mt-4 py-2 px-4"
            type="text"
            placeholder="Your Name"
            name="name"
            id=""
            required
          />
          <input
            className=" border mb-4 w-full mt-4 py-2 px-4"
            type="email"
            placeholder="Email Address"
            name="email"
            id=""
            required
          />
          <br />
          <div className=" relative">
            <input
              className=" border w-full py-2 px-4"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              id=""
              required
            />
            <span
              className=" absolute top-3 right-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
            </span>
          </div>
          <br />
          <div>
            <input type="checkbox" name="terms" id="terms" />
            <label className=" ml-2 mb-4" htmlFor="terms">
              Accept our <a href="">Terms and Conditions</a>
            </label>
          </div>
          <br />
          <input
            className=" btn btn-secondary w-full"
            type="submit"
            name="register"
            id=""
          />
        </form>
        {registerError && <p className=" text-red-700">{registerError}</p>}
        {success && <p className=" text-green-600">{success}</p>}
        <p>
          Already have an account? Please <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
