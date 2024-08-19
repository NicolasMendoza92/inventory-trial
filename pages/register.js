import RegisterForm from '@/components/RegisterForm'
import { useSession } from 'next-auth/react';
import React from 'react'

export default function Register() {
  const { data: session } = useSession();
  return (
    <div>
        <RegisterForm />
        <div className="flex justify-center m-auto shadow-md p-3 bg-zince-300/10 flex items-center gap-2">
          <h1>Only the admin can create users</h1>
        </div>
    </div>
  )
}