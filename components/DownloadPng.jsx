import classNames from "../helpers/classNames";
import useDownloader from "react-use-downloader";

export const DownloadPng = ({ icon, params, children, className }) => {
    function handelPng() {
        const svg = document.getElementById("svgElement");
        const { x, y, width, height } = svg.viewBox.baseVal;
        const blob = new Blob([svg.outerHTML], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const image = document.createElement("img");
        image.src = url;
        image.addEventListener("load", () => {
            const canvas = document.createElement("canvas");
            canvas.width = params.width;
            canvas.height = params.height;
            const context = canvas.getContext("2d");
            context.drawImage(image, x, y, params.width, params.height);
            const link = document.getElementById("downloadPngLink");
            link.href = canvas.toDataURL();
            link.click();
            URL.revokeObjectURL(url);
        });
    }
    return (
        <>
            <a
                id="downloadPngLink"
                className="hidden"
                download={`${icon.name}.png`}
            ></a>
            <button
                onClick={handelPng}
                className={classNames(
                    "px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
                    className
                )}
            >
                {children}
            </button>
        </>
    );
};
