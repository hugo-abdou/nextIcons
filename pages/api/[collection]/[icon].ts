import { NextApiRequest, NextApiResponse } from "next";
import { useRouter } from "next/router";
const SVG = require("@iconify/json-tools").SVG;

function generateSVG(icon: object, params?: object) {
    let svg = new SVG(icon);
    return svg.getSVG(params);
}
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const collection = req.collections[req.query.collection];
    const icon = collection?.getIconData(req.query.icon);
    if (!collection || !icon) {
        res.status(404).send({
            message: "not found",
        });
        return;
    }
    // res.set("Content-Disposition", 'attachment; filename="calendar-month.svg"');
    res.type("image/svg+xml; charset=utf-8").send(generateSVG(icon, req.query));
}
