import Link from "next/link";
import { useState } from "react";
import IconModal from "../components/IconModal";
import paginate from "../helpers/paginate";

export default function Home({ icons }) {
    const [selectedIcon, setIcon] = useState({});

    return (
        <section className="max-w-7xl mx-auto">
            <ul
                role="list"
                className="grid p-4 grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 ">
                {icons.data.map((icon, i) => (
                    <li
                        key={i}
                        className={classNames(
                            selectedIcon.name == icon.name
                                ? "ring-2 ring-offset-2"
                                : "focus-within:ring-2 focus-within:ring-offset-2",
                            "group rounded-lg overflow-hidden  bg-white shadow relative"
                        )}>
                        <div className="bg-white/20 absolute inset-0 backdrop-blur-sm  place-items-center hidden group-hover:grid ">
                            <button
                                onClick={() => setIcon(icon)}
                                className="w-14 bg-white p-4 rounded-full border shadow-md active:shadow-inner cursor-pointer">
                                <svg
                                    className="text-gray-700"
                                    xmlns="http://www.w3.org/2000/svg"
                                    preserveAspectRatio="xMidYMid meet"
                                    viewBox="0 0 576 512">
                                    <path
                                        fill="currentColor"
                                        d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144a143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79a47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="grid place-items-center w-full aspect-square ">
                            <svg
                                className="w-14 h-14 fill-current text-gray-700"
                                viewBox={`${icon.top} ${icon.left} ${icon.width} ${icon.height}`}
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                dangerouslySetInnerHTML={{
                                    __html: icon.body,
                                }}></svg>
                        </div>
                        <p className="pb-4 block text-sm text-center font-medium text-gray-900 truncate pointer-events-none">
                            {icon.name}
                        </p>
                    </li>
                ))}
            </ul>
            <Pagination
                active={parseInt(icons.currentPage)}
                links={icons.links}
            />
            <IconModal
                open={!!selectedIcon?.name}
                icon={selectedIcon}
                close={() => setIcon({})}
            />
        </section>
    );
}

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export async function getServerSideProps({ req }) {
    const collection = req.collections["bi"];
    const icons = collection.listIcons();
    const iconsPagination = paginate(
        icons,
        req.query.perPage || 100,
        req.query.page || 1
    );
    return {
        props: {
            icons: {
                ...iconsPagination,
                data: iconsPagination.data.map((name) => {
                    return {
                        ...collection.getIconData(name),
                        name,
                    };
                }),
            },
            revalidate: 1,
        },
    };
}

export function Pagination({ links, active }) {
    return (
        <div className="flex justify-center py-10">
            <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination">
                {active > 1 && (
                    <Link
                        key={active - 1}
                        href={{
                            pathname: "/",
                            query: { page: active - 1 },
                        }}>
                        <a className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                            <span>Previous</span>
                        </a>
                    </Link>
                )}
                {links.map((link) => (
                    <Link
                        key={link}
                        href={{
                            pathname: "/",
                            query: { page: link },
                        }}>
                        <a
                            className={classNames(
                                link == active
                                    ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                                    : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50",
                                "relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                            )}>
                            {link}
                        </a>
                    </Link>
                ))}
                <Link
                    key={active + 1}
                    href={{
                        pathname: "/",
                        query: { page: active + 1 },
                    }}>
                    <a className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span>Next</span>
                    </a>
                </Link>
            </nav>
        </div>
    );
}
