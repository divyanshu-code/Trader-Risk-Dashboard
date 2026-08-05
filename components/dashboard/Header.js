export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-400/60 dark:border-gray-800/60 px-6 py-4 shadow-sm">
            <div className="max-w-7xl mx-auto lg:px-8 flex items-center justify-between">
                <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2.5">
                    Trader Risk Dashboard
                </h1>
            </div>
        </header>
    );
}
