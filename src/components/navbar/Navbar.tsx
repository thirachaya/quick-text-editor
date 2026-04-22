import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold text-[#1F6F5F] tracking-tighter">
                    Blew Noxs<span className="text-[#2FA084]">.</span>
                </Link>

                <div className="flex items-center gap-6">
                    <Link
                        href="/"
                        className="text-sm font-medium text-gray-600 hover:text-[#2FA084] transition-colors"
                    >
                        Home
                    </Link>
                    <Link
                        href="/news"
                        className="text-sm font-medium text-gray-600 hover:text-[#2FA084] transition-colors"
                    >
                        Post
                    </Link>

                    <Link
                        href="/editor"
                        className="text-sm font-medium px-4 py-2 bg-[#1F6F5F] text-white rounded-lg hover:bg-[#2FA084] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                    >
                        Write Post ✎
                    </Link>
                </div>
            </div>
        </nav>
    );
}