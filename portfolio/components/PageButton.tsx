"use client";

import { usePathname } from "next/navigation";

export default function PageButton({ label }: { label: string }) {
    const pathname = usePathname();
    const toCompareWithPath = "/" + label.toLowerCase();
    const isActive = pathname == toCompareWithPath || pathname == "/" && label == "Home";

    return (
        <button className={`hover:text-kat-purple cursor-pointer ${isActive ? "text-kat-purple" : "text-white"}`}>{label}</button>
    );
}