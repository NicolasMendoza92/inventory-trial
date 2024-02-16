import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function UserInfo() {
  const { data: session } = useSession();

  const router = useRouter();

  async function logout() {
    await router.push('/login');
    await signOut();
  }

  function goToLogin(){
    router.push('/login')
  }

  return (
    <>
      {!session &&
        <div className="flex justify-center">
          <div className="shadow-md p-3 bg-zince-300/10 flex items-center gap-2 m-3">
            <h1>User not logged in</h1>
            <button className="bg-green-600 rounded-lg text-white font-bold px-6 py-2" onClick={goToLogin}> Login </button>
          </div>
        </div>
      }
      {session &&
        <div className="flex gird justify-end">
          <div className="shadow-md p-3 bg-zince-300/10 flex items-center gap-2 m-3">
            <div>
              Hola <span className="font-bold">{session?.user?.name}</span>
            </div>
            <button
              onClick={logout}
              className="bg-red-600 rounded-lg text-white font-bold px-6 py-2 shadow-sm hover:bg-red-500"
            >
              Log Out
            </button>
          </div>
        </div>
      }
    </>
  );
}
