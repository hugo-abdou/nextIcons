export default function Home({ test }) {
    return <div>{test}</div>;
}

export async function getServerSideProps() {
    const { SVG, Collection } = require("@iconify/json-tools");
    const { lookupCollections } = require("@iconify/json");
    const { dirname } = require("path");

    // const collection = new Collection();
    // const iconDir = dirname(require.resolve("@iconify/json/package.json"));
    // collection.loadIconifyCollection("mdi", iconDir);
    // collection.
    // collection.listIcons(true);

    lookupCollections().then((res) => {
        console.log(Object.keys(res));
    });

    return {
        props: {},
    };
}
