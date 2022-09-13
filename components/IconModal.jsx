import SVGClass from "@iconify/json-tools/src/svg";
import { useEffect, useState } from "react";
import Modal from "./Modal";

export default function IconModal({ open, close, icon }) {
    const [svg, setSvg] = useState("");
    const [store, setStore] = useState({
        hFlip: false,
        height: 200,
        rotate: 0,
        vFlip: false,
        width: 200,
        color: "#414249",
    });
    useEffect(() => {
        if (open) {
            const svgIcon = new SVGClass(icon);
            setSvg(svgIcon.getSVG(store));
        }
    }, [icon, store, open]);

    return (
        <Modal open={open} close={close}>
            <div
                className="aspect-square grid place-items-center"
                dangerouslySetInnerHTML={{
                    __html: svg,
                }}></div>
            <div className="px-6 py-4">
                <h1 className="text-xl font-semibold text-gray-800">
                    {icon.name}
                </h1>
                <section className="mt-6 flex gap-4">
                    <div>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <input
                                type="text"
                                name="account-number"
                                id="account-number"
                                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
                                placeholder="000-00-0000"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                {/* <QuestionMarkCircleIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> */}
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                preserveAspectRatio="xMidYMid meet"
                                viewBox="0 0 1200 1200">
                                <path
                                    fill="currentColor"
                                    d="M304.102 295.898L0 600l304.102 304.102v-203.54h591.797v203.539L1200 600L895.898 295.898v203.539H304.102V295.898z"
                                />
                            </svg>
                        </div>
                        <input
                            type="number"
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                            placeholder="Width"
                        />
                    </div>
                </section>
            </div>
        </Modal>
    );
}
