import { locate } from "@iconify/json";
import { Collection } from "@iconify/json-tools";
export default async function handler(req, res) {
    try {
        const { prifix } = req.query;
        const collection = new Collection();
        await collection.loadFromFileAsync(locate(prifix.toString()));

        const limit = parseInt(req.query.limit) || 15;
        const search = req.query.search;
        const start = parseInt(req.query.start) || 0;

        const icons = Object.keys(collection.items.icons)
            .filter((name) => (search ? name.includes(search) : true))
            .slice(start, start + limit)
            .map((iconName, index) => {
                return {
                    ...collection.getIconData(iconName),
                    name: iconName,
                };
            });
        res.send(icons);
    } catch (error) {
        throw error;
    }
}
