import axios from "axios";
import { debounce } from "lodash";
import Link from "next/link";
import { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import Icon from "../components/Icon";

const Category = ({ category }) => {
    return (
        <li className="w-full p-2 md:w-1/2 lg:w-1/3 xl:w-1/4">
            <Link href={`/category/${category.prefix}`}>
                <a className="flex flex-col items-center border bg-white p-8 transition-colors duration-300 transform cursor-pointer group hover:bg-blue-600 rounded-xl h-full">
                    <h1 className="mt-4 text-2xl font-semibold text-gray-700 capitalize  group-hover:text-white">
                        {category.info?.name}
                    </h1>
                    <span
                        className="mt-2 text-gray-500 capitalize group-hover:text-gray-300 text-sm hover:underline cursor-alias"
                        href=""
                    >
                        Author : {category.info?.author.name}
                    </span>
                    <p className="mt-2 text-gray-500 capitalize  group-hover:text-gray-300 text-sm">
                        Icons : {category.info?.total}
                    </p>
                    <div className="flex mt-3 gap-2">
                        {category.icons.map((icon) => (
                            <Icon
                                params={{
                                    width: 30,
                                    height: 30,
                                }}
                                icon={icon}
                                key={icon.name}
                            />
                        ))}
                    </div>
                </a>
            </Link>
        </li>
    );
};
export default function Home({ collections }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(collections);
    }, [collections]);
    const onSearch = debounce(async (event) => {});
    return (
        <AppLayout onSearch={onSearch}>
            <section className="max-w-7xl mx-auto">
                <ul className="flex p-4 flex-wrap">
                    {data.map((collection, index) => {
                        if (collection.icons.length) {
                            return (
                                <Category key={index} category={collection} />
                            );
                        }
                    })}
                </ul>
            </section>
        </AppLayout>
    );
}
export async function getStaticProps() {
    try {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}?limit=3`
        );

        return {
            props: { collections: res.data },
        };
    } catch (error) {
        throw error;
    }
}
