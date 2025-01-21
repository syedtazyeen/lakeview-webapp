import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { BiLoaderAlt, BiPlus, BiX } from "react-icons/bi";
import { Label } from "@/components/ui/label";
import ErrorText from "@/components/common/error-text";
import { IData } from ".";

type Step1FormValues = {
  images: File[];
};

interface Props {
  step: number;
  setStep: (val: number) => void;
  data: IData;
  saveData: (data: Step1FormValues) => void;
}

export default function Step3({ step, setStep, data, saveData }: Props) {
  const [images, setImages] = useState<File[]>(data.images || []);
  const [errors, setErrors] = useState<{ images?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateImages = (files: File[] | null) => {
    if (!files || files.length === 0) {
      setErrors((prev) => ({ ...prev, images: "Images are required" }));
      return false;
    }
    if (files.length < 3) {
      setErrors((prev) => ({
        ...prev,
        images: "At least 3 images are required",
      }));
      return false;
    }
    if (files.length > 7) {
      setErrors((prev) => ({
        ...prev,
        images: "You can upload a maximum of 7 images",
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, images: undefined }));
    return true;
  };

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files);
      setImages((prevImages) => [...prevImages, ...newImages]);
    }
  }

  function onSubmit() {
    validateImages(images);
    setIsLoading(true);
    saveData({ images });
    setStep(step + 1);
    setIsLoading(false);
  }

  return (
    <form
      className="h-full flex flex-col space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <Label>Add images: {images.length}/7</Label>
      <div className="grid grid-cols-2 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative rounded-xl w-full overflow-hidden aspect-video"
          >
            <img
              src={URL.createObjectURL(image)}
              alt={`Uploaded image ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() =>
                setImages((prev) => prev.filter((i) => i !== image))
              }
              className="bg-card rounded-full p-1 absolute z-20 right-0 top-0 m-2 text-muted-foreground hover:bg-muted"
            >
              <BiX />
            </button>
          </div>
        ))}

        {images.length < 7 && (
          <>
            <div
              className="flex flex-col justify-center items-center w-full aspect-video text-muted-foreground border border-muted-foreground border-dashed hover:border-accent rounded-2xl cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <BiPlus className="text-xl" />
              <span className="font-medium text-sm">Add images</span>
            </div>
            <input
              ref={fileInputRef}
              id="images"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </>
        )}
      </div>
      <ErrorText message={errors.images} />

      <div className="flex-1 flex items-end justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => setStep(step - 1)}
        >
          Previous
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <BiLoaderAlt className="animate-spin ease-linear" />
          ) : (
            "Next"
          )}
        </Button>
      </div>
    </form>
  );
}
