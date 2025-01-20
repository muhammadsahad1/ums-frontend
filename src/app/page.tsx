'use client'

import Landing from "@/components/Landing";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Home() {

  const router = useRouter();
  const admin = useSelector((state: RootState) => state.admin);

  useEffect(() => {
    if (admin._id) {
      router.push('/dashboard')
    }
  }, [admin, router]);


  return <Landing />;
}
