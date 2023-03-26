import * as Yup from "yup";
import React, { useState } from "react";
import Spinner from "../../assets/three-dots.svg";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Logo from "../../assets/googleLogo.png";
import { FormValues } from "../../models";
import { ref, set } from "firebase/database";
import { Button, Label, CheckIcon, WarnIcon } from "../../components";
import {
  auth,
  createUserWithEmailAndPassword,
  db,
  provider,
  signInWithPopup,
} from "../../vendors/firebase-config";
import { GoogleAuthProvider } from "firebase/auth";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const values: FormValues = {
    username: "",
    email: "",
    password: "",
    "confirm-password": "",
  };

  if ((values && values?.email == "") || values?.password == "") {
    toast.error("please fill all fields", {
      id: "fields",
      icon: <WarnIcon />,
      duration: 2000,
      className: "errMsg",
    });
  }

  // using validation schema using yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("invalid email address")
      .required("please put in your email"),
    password: Yup.string()
      .min(8, "minimum of 8 character required")
      .required("please put in password"),
    "confirm-password": Yup.string()
      .oneOf([Yup.ref("password")], "password doesn't match")
      .required("please confirm your password"),
  });

  // Form validation using formik
  const formik = useFormik({
    initialValues: values,
    validationSchema,
    onSubmit(values, { resetForm }) {
      setLoading(true);
      let { username, email, password } = values;

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          localStorage.setItem("h-access-token", user.uid);
          set(ref(db, "users/" + user.uid), {
            username: username,
            email: email,
          });
          setLoading(false);
          toast.success("User Created Successfully!", {
            icon: <CheckIcon />,
          });
          setTimeout(() => {
            navigate("/", { replace: true });
          }, 2000);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          setLoading(false);
          toast.error("User with email already exists!", {
            icon: <WarnIcon />,
            duration: 2000,
          });
          // ..
        });
      resetForm();
    },
  });

  // Signing in with Google
  const GoogleSignUp = (): void => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        console.log(token);
        if (token) localStorage.setItem("h-token", token);
        // The signed-in user info.
        const user = result?.user;
        console.log(user.displayName);
        if (user) {
          let { displayName, email, uid } = user;
          let hInfo = { ...{ displayName, email, uid } };
          localStorage.setItem("h-object", JSON.stringify(hInfo));
          navigate("/", { replace: true });
          setLoading(false);
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);

        if (credential) {
          setLoading(false);
          toast.error("credentials are already used", {
            id: "credentials",
            icon: <WarnIcon />,
            duration: 2000,
          });
        }
        if (email) {
          setLoading(false);
          toast.error("email are already used", {
            id: "email",
            icon: <WarnIcon />,
            duration: 2000,
          });
        }

        setLoading(false);
        toast.error(errorMessage, {
          id: "error",
          icon: <WarnIcon />,
          duration: 2000,
        });
      });
  };

  return (
    <div className="flex items-center justify-center max-w-[500px] sm:mt-28 mt-14">
      <div className="bg-white w-full rounded-lg overflow-hidden shadow-2xl">
        <div className="p-8">
          <form onSubmit={formik?.handleSubmit}>
            <Label
              label={{ htmlFor: "username", text: "Username" }}
              input={{
                id: "username",
                type: "text",
                name: "username",
                value: formik?.values.username,
                handleChange: formik?.handleChange,
                handleBlur: formik?.handleBlur,
              }}
            />
            <Label
              label={{ htmlFor: "email", text: "Email" }}
              input={{
                id: "email",
                type: "email",
                name: "email",
                value: formik?.values.email,
                handleChange: formik?.handleChange,
                handleBlur: formik?.handleBlur,
              }}
              errMsg={
                formik && formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : null
              }
            />
            <Label
              label={{ htmlFor: "password", text: "Password" }}
              input={{
                id: "password",
                type: "password",
                name: "password",
                value: formik?.values.password,
                handleChange: formik?.handleChange,
                handleBlur: formik?.handleBlur,
              }}
              errMsg={
                formik && formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : null
              }
            />
            <Label
              label={{ htmlFor: "confirm-password", text: "Confirm Password" }}
              input={{
                id: "confirm-password",
                type: "password",
                name: "confirm-password",
                value: formik?.values["confirm-password"],
                handleChange: formik?.handleChange,
                handleBlur: formik?.handleBlur,
              }}
              errMsg={
                formik &&
                formik.touched["confirm-password"] &&
                formik.errors["confirm-password"]
                  ? formik.errors["confirm-password"]
                  : null
              }
            />
            <Button
              className="bg-[#ad1f29ee] text-gray-100"
              text={loading ? <Spinner /> : "Create Account"}
            />
          </form>
          <Button
            className="bg-transparent text-gray-500"
            image={Logo}
            text="Continue with Google"
            onclick={GoogleSignUp}
          />
        </div>

        <div className="flex justify-end p-8 text-sm border-t border-gray-300 bg-gray-100">
          <Link to="/login" className="font-medium text-[#ad1f29ee]">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
