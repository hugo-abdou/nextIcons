import { NextApiRequest, NextApiResponse } from "next";
const SVG = require("@iconify/json-tools").SVG;

function generateSVG(icon: object, params?: object) {
    let svg = new SVG(icon);
    return svg.getSVG(params);
}
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default function handler(req: any, res: any) {
    // res.status(200).send(req.collections["bi"]);
    const collection = req.collections["bi"];
    const icon = collection.getIconData("calendar-month");
    res.set("Content-Disposition", 'attachment; filename="calendar-month.svg"');
    res.type("image/svg+xml; charset=utf-8").send(generateSVG(icon));
}
