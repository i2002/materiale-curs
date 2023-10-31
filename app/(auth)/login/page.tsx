import LoginForm from "@/components/auth/LoginForm";

interface Params {
  searchParams: {
    callbackUrl: string;
    errorState: string;
  }
}

export default function LoginPage({ searchParams }: Params) {
  return (
    <LoginForm
      callbackUrl={searchParams.callbackUrl}
      error={searchParams.errorState}
    />
  );
};
