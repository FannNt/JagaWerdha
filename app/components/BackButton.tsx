import Link from "next/link";

interface BackButtonProps {
    href?: string;
    label?: string;
}

export default function BackButton({ href = "/", label = "Kembali" }: BackButtonProps) {
    return (
        <Link
            href={href}
            className="inline-flex items-center gap-3 text-[var(--sage)] hover:text-[var(--dark-olive)] transition-colors duration-700 group"
        >
            <div className="w-10 h-10 rounded-full bg-[var(--cream)] flex items-center justify-center group-hover:bg-[var(--sage-light)] transition-colors">
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </div>
            <span className="font-medium text-lg group-hover:text-xl group-hover:translate-x-0.5 transition-transform">{label}</span>
        </Link>
    );
}
