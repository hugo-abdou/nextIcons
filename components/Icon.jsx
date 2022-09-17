import SVG from "@iconify/json-tools/src/svg";

export default function Icon({ icon, params, className }) {
    if (icon.body) {
        const svgIcon = new SVG(icon);
        return (
            <div
                className={className}
                dangerouslySetInnerHTML={{
                    __html: svgIcon.getSVG(params),
                }}
            ></div>
        );
    }
}
