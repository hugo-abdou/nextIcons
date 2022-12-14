import classNames from "../helpers/classNames";

export const CopyClipboard = ({ content, children, className }) => {
    return (
        <button
            className={classNames(
                "px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
                className
            )}
            onClick={() => navigator.clipboard.writeText(content)}>
            {children}
        </button>
    );
};
