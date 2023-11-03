import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function UserInfo() {
  const { data: session } = useSession();

  const router = useRouter();

  async function logout() {
    await router.push('/login');
    await signOut();
  }

  return (
    <>
      {!session &&
        <div className="flex jusify-center">
          <div className="shadow-lg p-3 bg-zince-300/10 flex items-center gap-2 m-3">
            <div>Usuario no logeado</div>
            <Link href={'/login'}> Login </Link>
          </div>
        </div>
      }
      {session &&
        <div className="flex gird justify-start">
          <div className="shadow-lg p-3 bg-zince-300/10 flex items-center gap-2 m-3">
            <div>
              Hola <span className="font-bold">{session?.user?.name}</span>
            </div>
            <button
              onClick={logout}
              className="bg-red-600 rounded-lg text-white font-bold px-6 py-2"
            >
              Log Out
            </button>
          </div>
        </div>
      }
    </>
  );
}