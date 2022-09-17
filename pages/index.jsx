// import { locate, lookupCollections } from "@iconify/json";
import SVG from "@iconify/json-tools/src/svg";
import Link from "next/link";

const Icon = ({ icon }) => {
    const svgIcon = new SVG(icon);
    return (
        <div
            dangerouslySetInnerHTML={{
                __html: svgIcon.getSVG({
                    height: 20,
                }),
            }}
        ></div>
    );
};

const Category = ({ category, prifix }) => {
    return (
        <li className="w-full p-2 md:w-1/2 lg:w-1/3 xl:w-1/4">
            <Link href={`/category/${prifix}`}>
                <a className="flex flex-col items-center border bg-white p-8 transition-colors duration-300 transform cursor-pointer group hover:bg-blue-600 rounded-xl h-full">
                    <h1 className="mt-4 text-2xl font-semibold text-gray-700 capitalize  group-hover:text-white">
                        {category.name}
                    </h1>
                    <span
                        className="mt-2 text-gray-500 capitalize group-hover:text-gray-300 text-sm hover:underline cursor-alias"
                        href=""
                    >
                        Author : {category.author.name}
                    </span>
                    <p className="mt-2 text-gray-500 capitalize  group-hover:text-gray-300 text-sm">
                        Icons : {category.total}
                    </p>
                    <div className="flex  mt-3 gap-2"></div>
                </a>
            </Link>
        </li>
    );
};
export default function Home({ icons }) {
    return (
        <section className="max-w-7xl mx-auto">
            <ul className="flex p-4 flex-wrap">
                {Object.keys(icons).map((name) => {
                    return (
                        <Category
                            key={name}
                            category={icons[name]}
                            prifix={name}
                        />
                    );
                })}
            </ul>
        </section>
    );
}
export async function getServerSideProps({ query }) {
    const lookupCollections = require("@iconify/json").lookupCollections;
    try {
        const icons = await lookupCollections();
        // const icons = {};
        // const collection = new Collection();
        // for (const key in icons) {
        //     if (Object.hasOwnProperty.call(icons, key)) {
        //         await collection.loadFromFileAsync(locate(key));
        //         icons[key].samples = icons[key].samples.map((name) => {
        //             return collection.getIconData(name);
        //         });
        //     }
        // }
        return {
            props: { icons: icons },
        };
    } catch (error) {
        throw error;
    }
}
