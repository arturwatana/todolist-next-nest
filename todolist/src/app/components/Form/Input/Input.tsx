import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  labelName: string;
}

export default function Input({ name, labelName, ...rest }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-bold text-neutral-950 text-center ">
        {labelName}{" "}
      </label>
      <input
        id={name}
        {...rest}
        className="border-2 border-gray-900 rounded-xl  p-1 text-center bg-zinc-400"
      />
    </div>
  );
}
