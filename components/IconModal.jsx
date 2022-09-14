import { RadioGroup, Switch } from "@headlessui/react";
import SVGClass from "@iconify/json-tools/src/svg";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import classNames from "../helpers/classNames";
import Modal from "./Modal";

const Icon = ({ icon, rotate, className }) => {
    const svgIcon = new SVGClass(icon);
    return (
        <div
            className={className}
            dangerouslySetInnerHTML={{
                __html: svgIcon.getSVG({ width: 20, rotate }),
            }}></div>
    );
};

export default function IconModal({ open, close, icon }) {
    const CopyClipboard = dynamic(
        () => import("./CopyClipbord").then((mod) => mod.CopyClipboard),
        { ssr: false }
    );

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
            <div className="px-6 py-4 divide-y-2">
                <h1 className="text-xl font-semibold text-gray-800 mb-3">
                    {icon.name}
                </h1>
                <section className="py-3 gap-4 flex items-center justify-between text-gray-700">
                    <label className="block text-sm font-medium text-gray-700">
                        Size
                    </label>
                    <div className="relative w-24">
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
                            className="focus:ring-indigo-500  focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                            placeholder="Size"
                            max={300}
                            value={store.height}
                            onInput={({ target }) =>
                                setStore({
                                    ...store,
                                    height: target.value,
                                    width: target.value,
                                })
                            }
                        />
                    </div>
                </section>
                <section className="py-3">
                    <div className="flex-1 flex items-center justify-between text-gray-700">
                        <label className="block text-sm font-medium text-gray-700">
                            Flip Horizontal
                        </label>
                        <Switch
                            checked={store.hFlip}
                            onChange={(value) => {
                                setStore({
                                    ...store,
                                    hFlip: value,
                                });
                            }}
                            className={classNames(
                                store.hFlip ? "bg-indigo-600" : "bg-gray-200",
                                "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            )}>
                            <span
                                aria-hidden="true"
                                className={classNames(
                                    store.hFlip
                                        ? "translate-x-5"
                                        : "translate-x-0",
                                    "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                                )}
                            />
                        </Switch>
                    </div>
                    <div className="flex-1 flex items-center justify-between text-gray-700 mt-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Flip Vertical
                        </label>
                        <Switch
                            checked={store.vFlip}
                            onChange={(value) => {
                                setStore({
                                    ...store,
                                    vFlip: value,
                                });
                            }}
                            className={classNames(
                                store.vFlip ? "bg-indigo-600" : "bg-gray-200",
                                "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            )}>
                            <span
                                aria-hidden="true"
                                className={classNames(
                                    store.vFlip
                                        ? "translate-x-5"
                                        : "translate-x-0",
                                    "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                                )}
                            />
                        </Switch>
                    </div>
                </section>
                <div className="py-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-sm font-medium text-gray-900">
                            Rotate
                        </h2>
                    </div>

                    <RadioGroup
                        value={store.rotate}
                        onChange={(value) =>
                            setStore({
                                ...store,
                                rotate: value,
                            })
                        }
                        className="mt-2">
                        <RadioGroup.Label className="sr-only">
                            Choose a memory option
                        </RadioGroup.Label>
                        <div className="grid grid-cols-4 gap-3">
                            {[0, 1, 2, 3].map((option, i) => (
                                <RadioGroup.Option
                                    key={i}
                                    value={i}
                                    className={({ active, checked }) =>
                                        classNames(
                                            active
                                                ? "ring-2 ring-offset-2 ring-indigo-500"
                                                : "",
                                            checked
                                                ? "bg-indigo-600 border-transparent text-white hover:bg-indigo-700"
                                                : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50",
                                            "border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 cursor-pointer focus:outline-none"
                                        )
                                    }>
                                    <RadioGroup.Label as="div">
                                        {icon && (
                                            <Icon icon={icon} rotate={i} />
                                        )}
                                    </RadioGroup.Label>
                                </RadioGroup.Option>
                            ))}
                        </div>
                    </RadioGroup>
                </div>
            </div>

            <CopyClipboard className="w-full text-center" content={svg}>
                copy Svg
            </CopyClipboard>
        </Modal>
    );
}
