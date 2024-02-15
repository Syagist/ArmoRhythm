"use client"
import NavBar from "@/components/navBar";

export default function MainLayout({children}: { children: React.ReactNode }) {
    return (

      <><NavBar/>
          {children}</>
    )
}