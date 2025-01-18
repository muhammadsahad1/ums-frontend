'use client'

import Landing from "@/components/Landing";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Home() {

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const admin = useSelector((state: RootState) => state.admin);

  useEffect(() => {
    if (admin) {
      router.push('/dashboard')
    } else {
      setLoading(false);
    }
  }, [admin, router]);

  if (loading) {
    return null;
  }

  return (
    <div>
      <Landing />
    </div>
  );
}
