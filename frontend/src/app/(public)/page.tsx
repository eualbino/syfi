"use client";
import { Input } from "@/components/ui/input";
import { UseRegisterUser } from "@/data/AuthUser/auth-user";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formLoginUser = z.object({
  username: z
    .string()
    .min(1, {
      message: "Insira a receita ou despesa!",
    })
    .max(20, {
      message: "Tem que ser menor que 20 letras!",
    }),
  password: z
    .string()
    .min(1, {
      message: "Insira a receita ou despesa!",
    })
    .max(255, {
      message: "Tem que ser menor que 255 letras!",
    }),
});

type FormLoginUser = z.infer<typeof formLoginUser>;

export default function Login() {
  const { handleSubmit, register } = useForm<FormLoginUser>({
    resolver: zodResolver(formLoginUser),
  });

  const { signin, errorMensage } = UseRegisterUser();

  async function handleLoginUser(data: FormLoginUser) {
    await signin(data);
  }

  return (
    <div className="bg-zinc-200 flex items-center justify-center w-screen h-screen">
      <div className="bg-white flex flex-col items-center h-auto border-[3px] border-black rounded-2xl shadow-2xl min-w-[18vw] px-8">
        <div className="text-3xl font-semibold pt-10">
          <p>Login</p>
        </div>
        <form onSubmit={handleSubmit(handleLoginUser)}>
          <div className="md:flex-row gap-2 items-center pt-14">
            <Input
              className="font-semibold w-full h-7 md:w-auto border-b-2 border-black pl-2 "
              placeholder="Username ou Email"
              {...register("username")}
              autoComplete="off"
            />
          </div>
          <div className="md:flex-row gap-2 items-center pt-12">
            <Input
              className="font-semibold w-full h-7 md:w-auto border-b-2 border-black pl-2"
              placeholder="Senha"
              {...register("password")}
              autoComplete="off"
            />
          </div>
          <div>
            {errorMensage ? (
              <p className="text-red-600 text-sm mt-2 mb-[-0.5rem]">
                {errorMensage}
              </p>
            ) : null}
          </div>
          <div className="flex justify-end mt-2">
            <Link href="/register" className="text-blue-600 text-sm ">
              Create account
            </Link>
          </div>
          <div className="flex justify-center mb-8">
            <button
              type="submit"
              className="border-2 border-black hover:bg-zinc-100 duration-200 px-6 py-1 rounded-lg mt-8 font-semibold"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
