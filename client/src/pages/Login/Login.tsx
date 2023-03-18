import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { Button, CheckIcon, Label, WarnIcon } from "../../components";
import { FormValues } from "../../models";
import Logo from "../../assets/googleLogo.png";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { ref, set } from "firebase/database";
import {
  auth,
  signInWithEmailAndPassword,
  signInWithPopup,
  db,
  provider,
} from "../../vendors/firebase-config";
import { GoogleAuthProvider } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const values = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues: values,
    validationSchema: Yup.object({
      email: Yup.string()
        .email("invalid email address")
        .required("please put in your email"),
      password: Yup.string().required("please put in password"),
    }),
    onSubmit(values, { resetForm }) {
      console.log(values);
      setLoading(true);
      let { email, password } = values;

      signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          const user = res.user;
          localStorage.setItem("h-access-token", user.uid);
          set(ref(db, "users/" + user.uid), {
            email: email,
          });
          setLoading(false);
          toast.success("User Created Successfully!", {
            icon: <CheckIcon />,
          });
          setTimeout(() => {
            navigate("/", { replace: true });
          }, 2000);
        })
        .catch((err) => {
          const errorCode = err.code;
          const errorMessage = err.message;
          console.log(errorCode, errorMessage);
          setLoading(false);
          toast.error("User with email already exists!", {
            icon: <WarnIcon />,
            duration: 2000,
          });
        });
      resetForm();
    },
  });

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
    <div className="flex items-center justify-center w-full sm:mt-28 mt-14">
      <div className="bg-white w-full rounded-lg overflow-hidden shadow-2xl">
        <div className="p-8">
          <form>
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
            />
            <Button className="bg-[#ad1f29ee] text-white" text="Login" />
          </form>
          <Button
            className="text-gray-500"
            text="Continue with Google"
            image={Logo}
            onclick={GoogleSignUp}
          />
        </div>

        <div className="flex justify-between p-8 text-sm border-t border-gray-300 bg-gray-100">
          <Link to="/register" className="font-medium text-[#ad1f29ee]">
            Create account
          </Link>

          <Link to="#" className="text-gray-600">
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
