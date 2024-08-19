import Link from 'next/link'
import { useRouter } from 'next/router';
import { useState } from 'react'

export default function RegisterForm() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");
    // handle errors 
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setError('Complete the fields');
            return;
        }
        try {
            const response = await fetch('api/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, password
                })
            })

            if (response.ok) {
                const form = e.target;
                router.push("/login")
                form.reset();
            } else {
                console.log('Register falied')
            }
        } catch (error) {
            console.log('Error', error)
        }
    }



    return (
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-5 rounded-lg border-t-4 border-secondary">
                <h1 className="text-xl font-bold my-4">Register</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        className="px-2 py-2"
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Full Name"
                    />
                    <input
                        className="px-2 py-2"
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        placeholder="Email"
                    />
                    <input
                        className="px-2 py-2"
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                    />
                    <button className="bg-secondary text-white font-bold cursor-pointer px-6 py-2">
                        Register
                    </button>

                    {error && (
                        <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                            {error}
                        </div>
                    )}

                    <Link className="text-sm m-auto" href={"/login"}>
                        Already have an account <span className="underline">Login</span>
                    </Link>
                </form>
            </div>
        </div>
    )
}
