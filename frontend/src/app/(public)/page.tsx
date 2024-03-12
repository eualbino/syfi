import { Input } from "@/components/ui/input";

export default function Login() {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="flex flex-col items-center w-full h-[40%] md:w-[40%] lg:w-[30%] xl:w-[20%] border-[3px] border-black rounded-2xl shadow-2xl ">
        <div className="text-3xl font-semibold pt-10">
          <p>Login</p>
        </div>
        <form>
          <div className="flex flex-col md:flex-row gap-2 items-center pt-12">
            <Input
              className="border-black border-2 font-semibold w-full h-10 md:w-auto"
              placeholder="Username ou Email"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-2 items-center pt-10">
            <Input
              className="border-black border-2 font-semibold w-full h-10 md:w-auto"
              placeholder="Senha"
            />
          </div>
          <div className="flex justify-center">
            <button type="submit" className="border-2 border-black hover:bg-zinc-200 duration-200 px-6 py-1 rounded-lg mt-8">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
