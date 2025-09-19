"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { z } from "zod";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { debounce } from "@/lib/utils";
import ErrorMessage from "@/components/frontend/ErrorMessage";

const loginFormSchema = z.object({
  email: z.string().email().nonempty("Email is required."),
  // TODO: Password Strength Requirement
  password: z.string().nonempty("Password is required."),
});

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginFormSchema),
  });
  const onSubmit = async (data: any) => {
    clearErrors();
  }
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const toggleInputVisibility = (stateVar: boolean, stateFunc: Dispatch<SetStateAction<boolean>>) => {
    stateFunc(!stateVar);
  };

  return (
    <form className="grid gap-6">
      <div>
        <Label htmlFor="email" className="mb-2 dark:text-white">Email Address</Label>
        <Input className="dark:border-zinc-500 dark:bg-zinc-600 dark:text-slate-200" {...register("email")}></Input>
        <ErrorMessage error={errors.email} />
      </div>
      <div>
        <Label htmlFor="password" className="mb-2 dark:text-white">Password</Label>
        <div className="relative">
          <Input type={!passwordVisible ? "password" : "text"} className="dark:border-zinc-500 dark:bg-zinc-600 dark:text-slate-200" {...register("password")} />
          <button className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer z-[99] *:text-white" onClick={(_) => toggleInputVisibility(passwordVisible, setPasswordVisible)}>
            {!passwordVisible ? <Eye size={18} /> : <EyeClosed size={18} />}
          </button>
        </div>
        <ErrorMessage error={errors.password} />
      </div>
      <Button type="submit">Register</Button>
    </form>
  );
}
