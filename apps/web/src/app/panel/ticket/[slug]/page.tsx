"use client"

import { useParams } from "next/navigation"

export default function Lala() {
    const params = useParams<{ slug: string }>();
    return (
        <>
            {params.slug}
        </>
    )
}