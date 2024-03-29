import React, {FormEvent, HTMLInputTypeAttribute} from "react";

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
    handleChange?: (e: FormEvent) => void | ((e: React.ChangeEvent<HTMLTextAreaElement>) => void);
    handleBlur?: (e: FormEvent) => void;
  };
  errMsg?: React.ReactNode;
}

export interface FormValues {
  username: HTMLInputTypeAttribute;
  email: HTMLInputTypeAttribute;
  password: HTMLInputTypeAttribute;
  'confirm-password' : HTMLInputTypeAttribute;
}
