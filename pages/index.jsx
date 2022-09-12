export default function Home({ icons }) {
    return (
        <div className="flex flex-wrap gap-2 justify-evenly">
            {icons.data.map((icon, i) => {
                return (
                    <div
                        key={i}
                        className="w-1/12 aspect-square grid place-items-center border">
                        {
                            <svg
                                className="w-14 h-14 fill-current text-white"
                                viewBox={`${icon.top} ${icon.left} ${icon.width} ${icon.height}`}
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                dangerouslySetInnerHTML={{
                                    __html: icon.body,
                                }}></svg>
                        }
                    </div>
                );
            })}
        </div>
    );
}
function paginate(array, perPage = 15, page = 1) {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    const totalPages = Math.ceil(array.length / perPage);
    const links = Array.from(Array(totalPages).keys()).slice(page, page + 6);
    const result = {
        data: array.slice((page - 1) * perPage, page * perPage),
        currentPage: page,
        from: (page - 1) * perPage + 1,
        to: page * perPage,
        perPage,
        totalPages,
        links,
        nextPageUrl: links[0] || null,
        prevPageUrl: links[links.length - 1] || null,
    };
    return result;
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
                    return collection.getIconData(name);
                }),
            },
            revalidate: 1,
        },
    };
}
