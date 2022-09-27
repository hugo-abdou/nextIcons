import { useState } from "react";
import debounce from "lodash/debounce";
import Icon from "../../components/Icon";
import IconModal from "../../components/IconModal";
import classNames from "../../helpers/classNames";
import Error from "../404";
import axios from "axios";
import { useEffect } from "react";
import AppLayout from "../../components/AppLayout";
export default function Home({ errorCode, collection }) {
    const [selectedIcon, setIcon] = useState({});
    const [icons, setIcons] = useState([]);

    useEffect(() => {
        setIcons(collection?.icons);
    }, [collection]);

    async function loadMore() {
        try {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/${collection.prefix}?limit=100&offset=${icons.length}`
            );
            setIcons([...icons, ...res.data.icons]);
        } catch (error) {
            console.error(error);
        }
    }
    const onSearch = debounce(async (event) => {
        try {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/${collection.prefix}?limit=100&search=${event.target.value}`
            );
            setIcons(res.data.icons);
        } catch (error) {
            console.error(error);
        }
    });

    if (errorCode) {
        return <Error statusCode={errorCode} />;
    } else {
        if (collection) {
            return (
                <AppLayout onSearch={onSearch}>
                    <section className="max-w-7xl mx-auto">
                        <ul
                            role="list"
                            className="grid p-4 grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 "
                        >
                            {icons?.map((icon, i) => (
                                <li
                                    key={i}
                                    className={classNames(
                                        selectedIcon.name == icon.name
                                            ? "ring-2 ring-offset-2"
                                            : "focus-within:ring-2 focus-within:ring-offset-2",
                                        "group rounded-lg overflow-hidden  bg-white shadow relative"
                                    )}
                                >
                                    <div className="bg-white/20 absolute inset-0 backdrop-blur-sm  place-items-center hidden group-hover:grid ">
                                        <button
                                            onClick={() => setIcon(icon)}
                                            className="w-14 bg-white p-4 rounded-full border shadow-md active:shadow-inner cursor-pointer"
                                        >
                                            <svg
                                                className="text-gray-700"
                                                xmlns="http://www.w3.org/2000/svg"
                                                preserveAspectRatio="xMidYMid meet"
                                                viewBox="0 0 576 512"
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144a143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79a47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="grid place-items-center w-full aspect-square ">
                                        <Icon
                                            icon={icon}
                                            params={{ width: 60 }}
                                            className="text-gray-700"
                                        />
                                    </div>
                                    <p className="pb-4 block text-sm text-center font-medium text-gray-900 truncate pointer-events-none">
                                        {icon.name}
                                    </p>
                                </li>
                            ))}
                        </ul>
                        {icons?.length < collection.info.total && (
                            <div className="text-center my-2">
                                <button
                                    onClick={loadMore}
                                    type="button"
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Load More
                                </button>
                            </div>
                        )}

                        <IconModal
                            open={!!selectedIcon?.name}
                            icon={selectedIcon}
                            close={() => setIcon({})}
                        />
                    </section>
                </AppLayout>
            );
        }
    }
}

export function getStaticPaths() {
    return {
        paths: [{ params: { prefix: "bi" } }],
        fallback: true,
    };
}

export async function getStaticProps({ params }) {
    try {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/${params.prefix}?limit=100`
        );

        return { props: { collection: res.data } };
    } catch (error) {
        return {
            props: { errorCode: 404 },
        };
    }
}
