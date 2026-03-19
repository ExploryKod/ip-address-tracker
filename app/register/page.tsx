import { Section } from "@components/sections/Section";
import { RegisterForm } from "@components/molecules/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="flex min-h-[calc(100vh-var(--header-height))] w-full flex-col">
      <Section
        fluid
        classNames="flex-1 flex flex-col justify-center items-center bg-pattern px-5 py-10"
      >
        <article className="max-w-md w-full flex flex-col justify-center items-center gap-6">
          <h1 className="text-3xl font-bold text-center text-white">
            Create your account
          </h1>
          <RegisterForm />
        </article>
      </Section>
    </main>
  );
}
