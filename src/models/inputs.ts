import React from "react";

export interface NoLabelInput {
  id: string;
  type: string;
  placeholder: string;
  value: string;
  name: string;
  required?: boolean;
  n_class?: string;
}

export interface LabelInput {
  label: {
    htmlFor: string;
    l_class?: string;
    text: string;
  };
  input: {
    id: string;
    type: string;
    name?: string;
    placeholder?: string;
    pattern?: string;
    value?: string;
    required?: boolean;
    n_class?: string;
    handleChange?: () => void;
    handleBlur?: () => void;
  };
}

export interface RegisterValues {
  Fname: string;
  Lname: string;
  email: string;
  password: string;
}

export interface FormValues {
  target: {
    name: string;
    value: React.ReactNode;
  };
}
