"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function PageButton({ label }: { label: string }) {
    const pathname = usePathname();
    const toCompareWithPath = "/" + label.toLowerCase();
    const isActive = pathname == toCompareWithPath || pathname == "/" && label == "Home";

    const router = useRouter();
    const handleClick = () => {
        if (label === "Home") {
            router.push("/");
        }
        else {
            router.push(`/${label.toLowerCase()}`);
        }
    };

    return (
        <button onClick={handleClick} className={`hover:text-kat-purple cursor-pointer ${isActive ? "text-kat-purple" : "text-white"}`}>{label}</button>
    );
}