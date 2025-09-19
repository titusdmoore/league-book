import LoginForm from "@/components/frontend/LoginForm";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default async function Page() {
	return (
		<section className="w-full h-full flex justify-center items-center">
			<Card className="p-4 dark:bg-zinc-700 dark:border-zinc-600 min-w-1/3">
				<CardTitle>
					<h1 className="dark:text-white">Login</h1>
				</CardTitle>
				<CardContent>
					<LoginForm />
				</CardContent>
			</Card>
		</section>
	);
}
