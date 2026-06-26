import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="border-t transition-colors duration-300" style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    <div className="col-span-2">
                        <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                            PromptVerse
                        </span>
                        <p className="mt-4 text-sm max-w-xs" style={{ color: 'var(--color-text-secondary)' }}>
                            The ultimate marketplace for high-quality AI prompts. Empowering creators and developers with the best AI tools.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold tracking-wider uppercase" style={{ color: 'var(--color-text-muted)' }}>Platform</h3>
                        <ul className="mt-4 space-y-4">
                            <li><Link href="/all-prompts" className="text-base transition hover:underline" style={{ color: 'var(--color-text-secondary)' }}>All Prompts</Link></li>
                            <li><Link href="/all-prompts" className="text-base transition hover:underline" style={{ color: 'var(--color-text-secondary)' }}>Trending</Link></li>
                            <li><Link href="/#top-creators" className="text-base transition hover:underline" style={{ color: 'var(--color-text-secondary)' }}>Top Creators</Link></li>
                            <li><Link href="/pricing" className="text-base transition hover:underline" style={{ color: 'var(--color-text-secondary)' }}>Pricing</Link></li>
                            <li><Link href="/demo-users" className="text-base transition hover:underline" style={{ color: 'var(--color-text-secondary)' }}>Demo Users</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold tracking-wider uppercase" style={{ color: 'var(--color-text-muted)' }}>Legal</h3>
                        <ul className="mt-4 space-y-4">
                            <li><Link href="/privacy" className="text-base transition hover:underline" style={{ color: 'var(--color-text-secondary)' }}>Privacy Policy</Link></li>
                            <li><Link href="/terms" className="text-base transition hover:underline" style={{ color: 'var(--color-text-secondary)' }}>Terms of Service</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold tracking-wider uppercase" style={{ color: 'var(--color-text-muted)' }}>Connect</h3>
                        <div className="mt-4 flex items-center gap-4" style={{ color: 'var(--color-text-secondary)' }}>
                            <Link href="#" aria-label="LinkedIn" className="transition hover:underline">
                                <i className="fa-brands fa-linkedin-in"></i>
                            </Link>
                            <Link href="#" aria-label="Instagram" className="transition hover:underline">
                                <i className="fa-brands fa-instagram"></i>
                            </Link>
                            <Link href="#" aria-label="Facebook" className="transition hover:underline">
                                <i className="fa-brands fa-facebook"></i>
                            </Link>
                            <Link href="#" aria-label="X" className="transition hover:underline">
                                <i className="fa-brands fa-x-twitter"></i>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="mt-8 border-t pt-8 text-center" style={{ borderColor: 'var(--color-border)' }}>
                    <p className="text-base" style={{ color: 'var(--color-text-muted)' }}>&copy; 2024 PromptHub. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
