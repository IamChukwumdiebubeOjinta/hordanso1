import React, { FormEvent, useState } from "react";
import {
  FileDownloadIcon,
  Label,
  ThreeDotLoader,
  Wall,
} from "../../components";
import toast from "react-hot-toast";
import openai from "../../vendors/Openai";

const Generate = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [imageFile, setImageFile] = useState<string>("");

  const imageName = `${value.slice(0, 5)}-${Date.now()}.png`;

  const handleChange = (e: FormEvent) => {
    let req = e.target as HTMLInputElement;
    setValue(req?.value);
  };

  const img = document.querySelector("img") as HTMLImageElement;
  lazyLoadImage(img)

  const id = document.getElementById("search");
  // console.log();

  const imageAi = async (): Promise<any> => {
    setImage("");
    setLoading(true);

    if (!value) toast.error("Please enter text");

    try {
      const res: any = await openai.createImage({
        prompt: value,
        n: 1,
        size: "1024x1024",
      });

      if (res && res?.status != 200) toast.error("an error occurred!");

      const imageData = res?.data.data[0];

      const imageUrl: string = imageData?.url;
      const imageBlob = imageUrl.slice(0, 149);
      console.log(imageBlob);
      setImageFile(imageBlob);
      setImage(imageUrl);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownload = (): void => {
    const link: HTMLAnchorElement = document.createElement("a");
    link.href = imageFile;
    link.download = imageName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    link.onerror = function () {
      toast.error("Failed to download image");
    };
  };

  return (
    <div className="pt-6">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            AI Image Generator
          </h1>
        </div>
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 border-t-2 border-black grid text-black">
          <Label
            label={{ htmlFor: "name", text: "Your Search" }}
            input={{
              id: "search",
              type: "text",
              value,
              handleChange: (e) => handleChange(e),
              n_class:
                "bg-slate-100 focus:outline-transparent border-0 focus:ring-transparent",
            }}
          />
          <button
            type="submit"
            className="inline-flex justify-center rounded-md py-2 px-3 text-sm font-semibold text-white shadow-sm bg-[#ad1f29ee]"
            onClick={imageAi}
          >
            {loading ? <ThreeDotLoader /> : <span>Generate</span>}
          </button>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0 flex items-end gap-2 justify-center">
            <div className="relative max-w-[569px] w-full h-[51vh] overflow-hidden rounded-xl border border-dashed border-gray-400">
              {/* Your content */}
              {image ? (
                <img
                  src={image}
                  alt="ai-gen-image"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Wall />
              )}
            </div>
            {/* {image ? (
              <button
                onClick={handleDownload}
                className="inline-flex justify-center rounded-md py-2 px-3 text-sm font-semibold text-white shadow-sm bg-[#ad1f29ee]"
              >
                <FileDownloadIcon />
              </button>
            ) : (
              <></>
            )} */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Generate;

function lazyLoadImage(img: HTMLImageElement) {
  const intersectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        img.src = img.dataset.src || "";
        intersectionObserver.unobserve(img);
      }
    });
  });

  intersectionObserver.observe(img);
}