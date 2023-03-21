import React, { FormEvent, useEffect, useRef, useState } from "react";
import { SendIcon, ThreeDotLoader } from "../../components";
import { auth, fireDb } from "../../vendors/firebase-config";
import { getStorage, ref } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import openai from "../../vendors/Openai";

const storage = getStorage();
const messageRef = ref(storage, "messages");
// const query = messageRef.
console.log(messageRef);

type GetValueProp = {
  onValueFromChild: (value: {}) => void;
  getResponse: (value: string) => void;
};

type ChatInput = {
  text?: React.ReactNode;
};

const ChatBubble = ({ text }: ChatInput) => (
  <div className="p-1 min-h-[32px] bg-red-800 rounded-md place-items-center flex-grow">
    {text}
  </div>
);

const Translate = ({ text }: ChatInput) => {
  // To know the user
  const [user] = useAuthState(auth);
  const [prompts, setPrompts] = useState<{}>({});
  const [container, setContainer] = useState<{ value: any }[]>([]);
  const [responses, setResponses] = useState<string>("");

  const getPrompts = (value: any) => {
    setPrompts(value);
    setContainer([...container, { value }]);
  };

  const getResponse = (value: string) => {
    setResponses(value);
  };

  return (
    <div className="features items-center justify-center">
      <div className="max-w-lg w-full h-[500px] shadow-md rounded-lg relative flex items-center justify-center">
        <div className="w-[90%] h-[90%] border border-slate-400 rounded-lg p-2 flex flex-col">
          <ChatMessage
            user={user}
            container={container}
            responses={responses}
          />
          <ChatField onValueFromChild={getPrompts} getResponse={getResponse} />
        </div>
      </div>
    </div>
  );
};

const ChatField = ({ onValueFromChild, getResponse }: GetValueProp) => {
  const [value, setValue] = useState<string>("");
  const ref = useRef<HTMLInputElement>(null);
  const handleSubmit = async (e: FormEvent): Promise<any> => {
    e.preventDefault();

    if (value == "") return;
    onValueFromChild(value);
    setValue("");

    try {
      const response: any = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Translate from English to French: ${value}`,
        temperature: 0.3,
        max_tokens: 100,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      });

      const translation: string = response.data.choices[0].text.trim();
      getResponse(translation);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="chat-field flex-[0.1] text-black flex justify-between"
      onSubmit={handleSubmit}
    >
      <div className="input flex-[0.84] rounded-md">
        <input
          type="text"
          className="w-full border-0 focus:ring-0 focus-within:outline-0 bg-transparent"
          ref={ref}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className="chat-btn flex-[0.15] rounded-md">
        <button
          type="submit"
          className="w-full h-full flex items-center justify-center text-white"
        >
          <SendIcon />
        </button>
      </div>
    </form>
  );
};

const ChatMessage = ({ user, container, responses }: any) => {
  const [loading, setLoading] = useState<boolean>(true);

  // if(responses) setLoading(false)

  return (
    <div
      className={`chat-box flex-[0.87] text-black flex items-end mb-2 max-w-[450px] w-full`}
    >
      <div className="flex items-center w-full">
        <div className="flex flex-col gap-2 overflow-y-auto relative justify-between w-full">
          <div className="flex items-center gap-1 w-[250px]">
            <img
              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              alt="sc"
              className="rounded-full w-8"
            />
            <ChatBubble text={`Hi, ${user.displayName}`} />
          </div>
          <div className="flex items-center gap-1 w-[250px] self-start min-h-[32px]">
            <img
              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              alt="sc"
              className="rounded-full w-8"
            />
            <ChatBubble text={`What would you want to translate?`} />
          </div>

          {user &&
            container.map(({ value }: any, idx: number) => (
              <div
                className="flex items-center gap-1 w-[250px] flex-row-reverse self-end min-h-[32px]"
                key={idx}
              >
                <img
                  src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  alt="sc"
                  className="rounded-full w-8"
                />
                <ChatBubble text={value} />
              </div>
            ))}
          {/* {container && (
              <div className="flex gap-2">
                {languages.map((item, idx) => (
                  <div className="p-1" key={idx}>
                    {item}
                  </div>
                ))}
              </div>
            )} */}

          <>
            {responses && (
              <div className="flex items-center gap-1 w-[250px] self-start min-h-[32px]">
                <img
                  src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  alt="sc"
                  className="rounded-full w-8"
                />
                <ChatBubble text={responses} />
              </div>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default Translate;
