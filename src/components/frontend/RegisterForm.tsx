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

const registrationFormSchema = z.object({
	firstName: z.string().nonempty("First Name is required."),
	lastName: z.string().nonempty("Last Name is required."),
	email: z.string().email().nonempty("Email is required."),
	// TODO: Password Strength Requirement
	password: z.string().nonempty("You are required to set a password."),
	confirmPassword: z.string().nonempty("You are required to confirm your password."),
});

export default function RegisterForm() {
	const {
		register,
		handleSubmit,
		watch,
		setError,
		clearErrors,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(registrationFormSchema),
	});
	const onSubmit = async (data: any) => {
		clearErrors();
		const res = await fetch('/api/users/register', {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ data })
		});

		if (res.status === 200) {
			window.location.replace('/account/login');
			return;
		}

		const resData = await res.json();
		console.log(resData)
		// Verify Email Unique.

		console.log(data)
	};
	const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
	const [confirmPasswordVisible, setConfirmPasswordVisible] = useState<boolean>(false);
	const toggleInputVisibility = (stateVar: boolean, stateFunc: Dispatch<SetStateAction<boolean>>) => {
		stateFunc(!stateVar);
	};

	return (
		<form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<Label htmlFor="first-name" className="mb-2 dark:text-white">First Name</Label>
					<Input className="dark:border-zinc-500 dark:bg-zinc-600 dark:text-slate-200" {...register("firstName")} tabIndex={0}></Input>
					<ErrorMessage error={errors.firstName} />
				</div>
				<div>
					<Label htmlFor="last-name" className="mb-2 dark:text-white">Last Name</Label>
					<Input className="dark:border-zinc-500 dark:bg-zinc-600 dark:text-slate-200" {...register("lastName")} tabIndex={0}></Input>
					<ErrorMessage error={errors.lastName} />
				</div>
			</div>
			<div>
				<Label htmlFor="email" className="mb-2 dark:text-white">Email Address</Label>
				<Input className="dark:border-zinc-500 dark:bg-zinc-600 dark:text-slate-200" {...register("email")} tabIndex={0}></Input>
				<ErrorMessage error={errors.email} />
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<Label htmlFor="password" className="mb-2 dark:text-white">Password</Label>
					<div className="relative">
						<Input type={!passwordVisible ? "password" : "text"} className="dark:border-zinc-500 dark:bg-zinc-600 dark:text-slate-200" {...register("password")} tabIndex={0} />
						<button type="button" className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer z-[99] *:text-white" onClick={(_) => toggleInputVisibility(passwordVisible, setPasswordVisible)} tabIndex={1}>
							{!passwordVisible ? <Eye size={18} /> : <EyeClosed size={18} />}
						</button>
					</div>
					<ErrorMessage error={errors.password} />
				</div>
				<div>
					<Label htmlFor="confirm-password" className="mb-2 dark:text-white">Confirm Password</Label>
					<div className="relative">
						<Input
							type={!confirmPasswordVisible ? "password" : "text"}
							className="dark:border-zinc-500 dark:bg-zinc-600 dark:text-slate-200"
							aria-invalid={errors.confirmPassword ? "true" : "false"}
							{...register("confirmPassword", {
								onChange: (debounce(((event: ChangeEvent) => {
									console.log(watch('password'), (event.target as HTMLInputElement).value)
									if (watch('password') !== (event.target as HTMLInputElement).value) {
										setError('confirmPassword', { type: 'custom', message: 'Passwords must match.' });
										return;
									}

									clearErrors('confirmPassword');
								}) as Function, 250) as (event: any) => void)
							})}
							tabIndex={0}
						></Input>
						<button type="button" className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer z-[99] *:text-white" onClick={(_) => toggleInputVisibility(confirmPasswordVisible, setConfirmPasswordVisible)} tabIndex={1}>
							{!confirmPasswordVisible ? <Eye size={18} /> : <EyeClosed size={18} />}
						</button>
					</div>
					<ErrorMessage error={errors.confirmPassword} />
				</div>
			</div>
			<Button type="submit">Register</Button>
		</form >
	);
}
