import { NextApiRequest, NextApiResponse } from "next";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("api");
    res.status(200).send(req.collections["bi"]);
}
