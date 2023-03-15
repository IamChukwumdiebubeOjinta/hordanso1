import * as Yup from "yup";
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { FormValues } from "../../models";
import { ref, set } from "firebase/database";
import {
  Button,
  Label,
  Toasts,
  CheckIcon,
  CloseIcon,
  ErrorIcon,
  WarnIcon,
} from "../../components";
import {
  auth,
  createUserWithEmailAndPassword,
  db,
} from "../../vendors/firebase-config";

const Register = () => {
  const toastRef = useRef()
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const values: FormValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("invalid email address")
      .required("please put in your email"),
    password: Yup.string()
      .min(8, "minimum of 8 character required")
      .required("please put in password"),
  })
// console.log(toastRef?.current && toastRef?.current?.display())
  const formik = useFormik({
    initialValues: values,
    validationSchema,
    onSubmit(values, {resetForm}) {
      setLoading(true)
      let { email, password } = values;
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          localStorage.setItem('h-access-token', user.uid)
          setTimeout(() => {
            // toastRef.current.dis
            // navigate("/");
          }, 2000)
          // set(ref(db, 'users/' + user.uid){})
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          setTimeout(() => {
            
            // navigate("/");
          }, 2000)
          // ..
        });
      resetForm()        
    },
  });
  return (
    <div className="flex items-center justify-center max-w-[500px] sm:mt-28 mt-14">
      <div className="bg-white w-full rounded-lg overflow-hidden shadow-2xl">
        <div className="p-8">
          <form onSubmit={formik?.handleSubmit}>
            <div className="flex gap-2">
              {/* <Label
                label={{ htmlFor: "Fname", text: "First Name" }}
                input={{
                  id: "Fname",
                  type: "text",
                  name: "Fname",
                  value: formik?.values.Fname,
                  handleChange: formik?.handleChange,
                  handleBlur: formik?.handleBlur,
                }}
              />
              <Label
                label={{ htmlFor: "Lname", text: "Last Name" }}
                input={{
                  id: "Lname",
                  type: "text",
                  name: "Lname",
                  value: formik?.values.Lname,
                  handleChange: formik?.handleChange,
                  handleBlur: formik?.handleBlur,
                }}
              /> */}
            </div>
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
            <Button
              className="bg-[#ad1f29ee] text-gray-100"
              text="Create Account"
            />
            <Button
              className="bg-transparent text-gray-500"
              text="Continue with Google"
            />
          </form>
        </div>

        <div className="flex justify-end p-8 text-sm border-t border-gray-300 bg-gray-100">
          <Link to="/login" className="font-medium text-[#ad1f29ee]">
            Login
          </Link>
        </div>
      </div>
      <Toasts ref={toastRef} className="" />
    </div>
  );
};

export default Register;
