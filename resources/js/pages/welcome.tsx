import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, map, register } from '@/routes';

export default function Welcome() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-cafecitos flex min-h-screen flex-col items-center justify-center p-6">
                <main className="flex w-full max-w-[335px] flex-col items-center rounded-lg bg-transparent p-8">
                    <div className="mb-12 text-center">
                        <h1 className="mb-2 text-5xl leading-none font-bold tracking-[0.08em] text-[#722f37] uppercase">
                            Cafecitos
                        </h1>
                        <p className="text-[13px] tracking-[0.02em] text-[#a0522d] italic">
                            tu diario de cafés
                        </p>
                    </div>
                    <div className="flex w-full max-w-[250px] flex-col gap-4">
                        <nav className="flex w-full items-center justify-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="w-full rounded-md bg-[#722f37] px-6 py-2.5 text-center text-sm font-medium text-white transition hover:bg-[#5d252d] focus-visible:ring-2 focus-visible:ring-[#722f37] focus-visible:ring-offset-2 focus-visible:outline-none"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="flex-1 rounded-md border border-[#722f37] px-6 py-2.5 text-center text-sm font-medium text-[#722f37] transition hover:bg-[#722f37] hover:text-white focus-visible:ring-2 focus-visible:ring-[#722f37] focus-visible:ring-offset-2 focus-visible:outline-none"
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        href={register()}
                                        className="flex-1 rounded-md bg-[#722f37] px-6 py-2.5 text-center text-sm font-medium text-white transition hover:bg-[#5d252d] focus-visible:ring-2 focus-visible:ring-[#722f37] focus-visible:ring-offset-2 focus-visible:outline-none"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </nav>
                        <Link
                            href={map()}
                            className="w-full rounded-md bg-[#722f37] px-6 py-3 text-center text-sm font-semibold text-white shadow-[0_4px_24px_rgba(44,36,32,0.14)] transition hover:bg-[#5d252d] focus-visible:ring-2 focus-visible:ring-[#722f37] focus-visible:ring-offset-2 focus-visible:outline-none"
                        >
                            Empecemos
                        </Link>
                    </div>
                </main>
            </div>
        </>
    );
}
