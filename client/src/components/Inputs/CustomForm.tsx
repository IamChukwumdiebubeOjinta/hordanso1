import React from "react";
import { Formik, FormikConfig, FormikValues } from "formik";

interface MyFormProps extends FormikConfig<FormikValues> {
  children: React.ReactNode;
}

const CustomForm = ({ children, ...formikProps }: MyFormProps) => {
  return <Formik {...formikProps}>{children}</Formik>;
};

export default CustomForm;
