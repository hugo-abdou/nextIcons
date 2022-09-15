import { NextApiRequest, NextApiResponse } from "next";
import {
    lookupCollections,
    IconifyMetaDataCollection,
    locate,
    loadCollection,
} from "@iconify/json";
import { IconifyJSON } from "@iconify/types";
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    loadCollection(locate(req.query.prifix)).then((collection: IconifyJSON) => {
        res.send(collection.info);
    });
}
