import classNames from "../helpers/classNames";
import useDownloader from "react-use-downloader";

export const DownloadSvg = ({ icon, params, children, className }) => {
    const { size, elapsed, percentage, download, cancel, error, isInProgress } =
        useDownloader();
    const paramsString = new URLSearchParams(params).toString();
    return (
        <button
            className={classNames(
                "px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
                className
            )}
            onClick={() =>
                download(
                    `/api/bi/${icon.name}?${paramsString}`,
                    `${icon.name}.svg`
                )
            }
        >
            {children}
        </button>
    );
};
