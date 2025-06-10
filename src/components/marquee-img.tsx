import { cn } from "@/lib/utils"

const MarqueeImg = ({ img, className }: { img: string, className?: string }) => {
    return (
        <img
            src={img}
            className={cn(
                // You can use other Tailwind CSS filters or utilities here, for example:
                // "blur-sm" for blur effect,
                // "brightness-75" for brightness,
                // "contrast-125" for contrast,
                // "sepia" for sepia tone,
                // "invert" for color inversion,
                // "saturate-200" for saturation,
                // "hue-rotate-60" for hue rotation,
                // Add or replace these as needed:
                "w-44 h-44 object-contain xl:h-48 xl:w-48 mx-12 grayscale xl:mx-16",
                className
            )}
            alt=""
        />
    )
}

export default MarqueeImg
