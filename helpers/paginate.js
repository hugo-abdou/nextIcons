export default function paginate(array, perPage = 15, page = 1) {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    const totalPages = Math.ceil(array.length / perPage);
    let links = [];

    for (let i = 1; i < totalPages; i += 7) {
        const chunk = Array.from(Array(totalPages).keys()).slice(i, i + 7);
        if (chunk.includes(parseInt(page))) {
            links = chunk;
        }
    }
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
