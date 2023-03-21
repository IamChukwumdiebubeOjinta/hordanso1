import { ReactNode } from "react";
export interface Layout {
  children: ReactNode;
}

export type RouterProps = {
  to?: string;
  path?: string;
  redirectPath?: string;
  children?: ReactNode;
  element?: ReactNode;
};
