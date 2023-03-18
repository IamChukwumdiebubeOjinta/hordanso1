import React, { FormEvent } from "react";

export interface CustomButton {
  className: string;
  text: React.ReactNode;
  image?: string;
  onclick?: (e: FormEvent) => void;
}
