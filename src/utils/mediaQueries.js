import watchMedia from "svelte-media";

const mediaqueries = {
    tablet: "(max-width: 769px)",
    /*large: "(min-width: 850px)",
    short: "(max-height: 399px)",
    landscape: "(orientation: landscape) and (max-height: 499px)",
    tiny: "(orientation: portrait) and (max-height: 599px)",
    dark: "(prefers-color-scheme: dark)",
    noanimations: "(prefers-reduced-motion: reduce)"*/
};

export const media = watchMedia(mediaqueries);