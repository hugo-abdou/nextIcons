export default function AppLayout({ children, onSearch }) {
    return (
        <div className="bg-gray-100 min-h-screen pt-16">
            <header className="fixed top-0 w-full z-10">
                <nav className="bg-white border-gray-200 py-2.5 shadow">
                    <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-2 mx-auto">
                        <a href="#" className="flex items-center">
                            <span className="self-center text-xl font-semibold whitespace-nowrap">
                                Landwind
                            </span>
                        </a>
                        <div className="flex items-center lg:order-2">
                            <div className="hidden mt-2 mr-4 sm:inline-block">
                                <span></span>
                            </div>

                            <button
                                data-collapse-toggle="mobile-menu-2"
                                type="button"
                                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
                                aria-controls="mobile-menu-2"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                <svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                <svg
                                    className="hidden w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                        </div>

                        <div className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1">
                            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                                <li>
                                    <a
                                        href="#"
                                        className="block py-2 pl-3 pr-4 text-white bg-purple-700 rounded lg:bg-transparent lg:text-purple-700 lg:p-0 "
                                        aria-current="page"
                                    >
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 "
                                    >
                                        Company
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 "
                                    >
                                        Marketplace
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 "
                                    >
                                        Features
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 "
                                    >
                                        Team
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 "
                                    >
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <input
                            onInput={onSearch}
                            type="search"
                            className="focus:ring-indigo-500  focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md"
                            placeholder="Size"
                        />
                    </div>
                </nav>
            </header>
            {children}
        </div>
    );
}
