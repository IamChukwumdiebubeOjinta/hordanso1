import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  ForwardRefRenderFunction,
} from "react";
import { Toast } from "../../models";
// import {Toast} from 'flowbite-react'



const Toasts: ForwardRefRenderFunction<any, Toast> = (
  { LeftSvg, RightSvg, className, timeout = 2000 }: Toast,
  ref
) => {
  const [show, setShow] = useState<boolean>(false);
  const [text, setText] = useState<string>('')

  useImperativeHandle(ref, () => ({
    display(msg = '') {
      setShow(true);
      setText(msg)
      setTimeout(() => {
        setShow(false);
      }, timeout);
    },
  }));
  return (
    <>
      <div
        id="toast-success"
        className={`${className} ${
          show ? "translate-y-0" : ""
        } fixed bottom-0 translate-y-14 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800`}
        role="alert"
      >
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 fixed bottom-0 rounded-lg dark:bg-green-800 dark:text-green-200">
          {LeftSvg}
          <span className="sr-only">Check icon</span>
        </div>
        <div className="ml-3 text-sm font-normal">{text}</div>
        <button
          type="button"
          className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          data-dismiss-target="#toast-success"
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          {RightSvg}
        </button>
      </div>
    </>
  );
};

export default forwardRef(Toasts);
