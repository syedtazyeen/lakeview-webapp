import React from "react";
import { IData } from ".";

interface Props {
  step: number;
  setStep: (val: number) => void;
  data: IData;
  saveData: (data: string[]) => void;
}

export default function Step3({ step, setStep, data, saveData }: Props) {
  return <></>;
}
