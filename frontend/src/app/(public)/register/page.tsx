"use client"
import { Input } from "@/components/ui/input";
import { UseRegisterUser } from "@/data/AuthUser/auth-user";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from 'react-hook-form';
import { z } from "zod";

const formRegisterUser = z.object({
  name: z
    .string()
    .min(1, {
      message: "Insira a receita ou despesa!",
    })
    .max(255, {
      message: "Tem que ser menor que 255 letras!",
    }),
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

type FormRegisterUser = z.infer<typeof formRegisterUser>;

export default function Register() {
  const { handleSubmit, register } = useForm<FormRegisterUser>({
    resolver: zodResolver(formRegisterUser),
    defaultValues: {
      name: "",
      username: "",
      password: "",
    },
  });

  const { postRegister, errorMensage } = UseRegisterUser();

  async function handleRegisterUser(data: FormRegisterUser) {
    await postRegister(data);
  }

  return (
    <div className="bg-zinc-200 flex items-center justify-center w-screen h-screen">
      <div className="bg-white flex flex-col items-center w-full h-[45%] md:w-[40%] lg:w-[30%] xl:w-[20%] border-[3px] border-black rounded-2xl shadow-2xl ">
        <div className="text-3xl font-semibold pt-10">
          <p>Register</p>
        </div>
        <form onSubmit={handleSubmit(handleRegisterUser)}>
          <div className="flex flex-col md:flex-row gap-2 items-center pt-9">
            <Input
              className="font-semibold w-full h-7 md:w-auto border-b-2 border-black pl-2 "
              placeholder="Name"
              {...register("name")}
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-2 items-center pt-12">
            <Input
              className="font-semibold w-full h-7 md:w-auto border-b-2 border-black pl-2 "
              placeholder="Username"
              {...register("username")}
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-2 items-center pt-12">
            <Input
              className="font-semibold w-full h-7 md:w-auto border-b-2 border-black pl-2"
              placeholder="Senha"
              {...register("password")}
              autoComplete="off"
            />
          </div>
          <div>
            {errorMensage ? <p className="text-red-600 text-sm mt-2 mb-[-0.5rem]">{errorMensage}</p> : null}
          </div>
          <div className="flex justify-end mt-2">
            <Link href="/" className="text-blue-600 text-sm ">
              Login
            </Link>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="border-2 border-black hover:bg-zinc-100 duration-200 px-6 py-1 rounded-lg mt-6 font-semibold"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
