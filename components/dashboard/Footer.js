export default function Footer() {
    return (
        <footer className="bg-white/50 dark:bg-gray-900/50 border-t border-gray-200/60 dark:border-gray-800/60 px-6 py-6 mt-auto">
            <div className="max-w-7xl mx-auto text-center md:text-left px-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-[13px] font-medium tracking-wide text-gray-500 dark:text-gray-400">
                    © 2026 Trader Risk Dashboard. All rights reserved.
                </p>
                <div className="flex items-center gap-4 text-[13px] font-medium text-gray-400 dark:text-gray-500">
                    <span className="cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors">Privacy</span>
                    <span className="cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors">Terms</span>
                </div>
            </div>
        </footer>
    );
}
