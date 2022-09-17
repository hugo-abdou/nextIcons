import { NextApiRequest, NextApiResponse } from "next";
import { lookupCollections, IconifyMetaDataCollection } from "@iconify/json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    lookupCollections().then((collections: IconifyMetaDataCollection) => {
        res.send(Object.keys(collections));
    });
}
