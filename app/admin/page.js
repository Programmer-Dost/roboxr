"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const Page = () => {
  const router = useRouter();
  
  async function AdminAuth() {
    const fetch_api = await fetch("/api/admin/auth/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await fetch_api.json();
    if (data.success) {
      router.push('/admin/dashboard')
    } else {
      router.push('/admin/login')
    }
  }


  useEffect(() => {
    AdminAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Link href={"/admin/login"}>AdminPAge</Link>
  )
}

export default Page