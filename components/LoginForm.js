import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // handle errors
  const [error, setError] = useState("");

  const router = useRouter();

  let flag = true;
  const showPass = () => {
    if (flag) {
      document.getElementById("password").type = "text";
      document.getElementById("pass-icon").src = "/icons/eye.png";
      flag = false;
    } else {
      document.getElementById("password").type = "password";
      document.getElementById("pass-icon").src = "/icons/eye-slash.png";

      flag = true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      router.push("/inventory");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-secondary">
        <h1 className="text-xl font-bold my-4">Inventory APP</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            className="px-2 py-2"
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
          />
          <div className="flex inline-flex items-center">
            <input
              className="px-2 py-2"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="Password"
            />
            <Image
              src={"/icons/eye-slash.png"}
              alt="eye icon"
              width={24}
              height={24}
              id="pass-icon"
              className="flex ms-1 w-8 cursor-pointer "
              onClick={showPass}
            />
          </div>

          <button className="bg-secondary text-white font-bold cursor-pointer px-6 py-2">
            Login
          </button>
          <span>
            <Link className="font-bold" href={"/register"}>
              Register
            </Link>
          </span>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
