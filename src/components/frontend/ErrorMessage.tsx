import { FieldError } from "react-hook-form";

export default function ErrorMessage({ error }: { error: FieldError | undefined }) {
  return (
    <>
      {error && (<span role='alert' className="text-red-400">{error.message}</span>)}
    </>
  );
}

