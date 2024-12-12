import React, { useState, useContext } from "react";
import Classes from "./signup.module.css";
import Layout from "../../components/layout/layout";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../utilities/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { DataContext } from "../../components/DataProvider/Data";
import { Type } from "../../utilities/action.type";
import { ClipLoader } from "react-spinners";

function Auth() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const [loading, setloading] = useState({
    signIn: false,
    signup: false,
  });
  console.log(email, password);

  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate(); // Fixed: Call the hook
  const navstatedata = useLocation();
  console.log(navstatedata)




  const authhandler = async (e) => {
    e.preventDefault();
    console.log(e.target.name);
    if (e.target.name === "signin") {
      // Fixed: Strict comparison and correct button name
      setloading({ ...loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          console.log(user);
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setloading({ ...loading, signIn: false });
          navigate(navstatedata?.state?.redirect || "/");
        })
        .catch((error) => {
          seterror(error.message);
          setloading({ ...loading, signIn: false });
        });
    } else {
      setloading({ ...loading, signup: true }); // Move this line before the API call
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          console.log(user);
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setloading({ ...loading, signup: false });
          navigate(navstatedata?.state?.redirect || "/");
        })
        .catch((error) => {
          seterror(error.message);
          setloading({ ...loading, signup: false });
        });
    }
  };

  return (
    <section className={Classes.login}>
      <Link to={"/"}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>

      <div className={Classes.login_container}>
        <h1>Sign-In</h1>
        {
          navstatedata?.state?.msg && (
            <small
              style={{
                padding: "5px",
                textAlign: "center",
                color: "red",
                fontWeight: "bold",
              }}
            >
              {navstatedata?.state?.msg}
            </small>
          )
        }

        <form action="">
          <div>
            <label htmlFor="email">E-mail</label>
            <input
              value={email}
              onChange={(e) => setemail(e.target.value)}
              type="email"
              id="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <button
            name="signin"
            type="submit"
            onClick={authhandler}
            className={Classes.login_signButton}
          >
            {loading.signIn ? <ClipLoader size={15} /> : "Sign-In"}
          </button>
        </form>
        <p>
          By signing up, you agree to our Terms and Conditions and Privacy
          Policy. You confirm that the information you’ve provided is accurate.
          You must be at least 18 years old to register.
        </p>
        <button
          name="signup"
          type="submit"
          onClick={authhandler}
          className={Classes.login_register}
        >
          {loading.signup ? <ClipLoader size={15} /> : "Create Account"}
        </button>

        {error && (
          <small
            style={{
              paddingTop: "5px",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {error}
          </small>
        )}
      </div>
    </section>
  );
}
export default Auth;
