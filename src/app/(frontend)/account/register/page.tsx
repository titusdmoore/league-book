import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function Page() {
	return (
		<section className="w-full h-full flex justify-center items-center">
			<Card className="p-4">
				<CardTitle>
					<h1>Register for an account</h1>
				</CardTitle>
				<CardContent>
					<form className="grid gap-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<Label htmlFor="first-name" className="mb-2">First Name</Label>
								<Input type="text" id="first-name"></Input>
							</div>
							<div>
								<Label htmlFor="last-name" className="mb-2">Last Name</Label>
								<Input type="text" id="last-name"></Input>
							</div>
						</div>
						<div>
							<Label htmlFor="email" className="mb-2">Email Address</Label>
							<Input type="email" id="email"></Input>
						</div>
					</form>
				</CardContent>
			</Card>
		</section>
	);
}
