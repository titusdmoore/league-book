import RegisterForm from "@/components/frontend/RegisterForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import * as z from "zod";

const registrationForm = z.object({
	firstName: z.string(),
	lastName: z.string(),
	email: z.string().email(),
	password: z.string(),
	confirmPassword: z.string(),
});

export default async function Page() {
	return (
		<section className="w-full h-full flex justify-center items-center">
			<Card className="p-4 dark:bg-zinc-700 dark:border-zinc-600">
				<CardTitle>
					<h1 className="dark:text-white">Register for an account</h1>
				</CardTitle>
				<CardContent>
					<RegisterForm />
				</CardContent>
			</Card>
		</section>
	);
}
