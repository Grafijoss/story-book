import { mediaMinWidth } from '~utils/styles';

import { isObject, isEmptyObject } from '~utils/core';

const toCssVars = (prefix, obj, breakpoints = {}) => (
    Object.entries(obj).reduce((cssVars, [key, val]) => {
        if (key in breakpoints) {
            return {
                ...cssVars,
                [`${mediaMinWidth(breakpoints[key])}`]: {
                    ...toCssVars(prefix, val, breakpoints),
                },
            };
        }

        if (isObject(val) && !isEmptyObject(val)) {
            return {
                ...cssVars,
                ...toCssVars(`${prefix}-${key}`, val, breakpoints),
            };
        }

        return {
            ...cssVars,
            [`--${prefix}-${key}`]: `${val}`,
        };
    }, {})
);

const mapThemeKeysToCssVars = themeKeys => (
    ({ theme }) => (
        themeKeys.reduce((acc, key) => {
            if (!theme[key]) return acc;

            const breakpoints = theme && theme.breakpoints;
            const cssVars = toCssVars(key, theme[key], breakpoints);

            // merge media query objects
            Object.values(breakpoints).forEach((breakpoint) => {
                const mediaQuery = mediaMinWidth(breakpoint);

                if (cssVars[mediaQuery]) {
                    acc[mediaQuery] = { ...acc[mediaQuery], ...cssVars[mediaQuery] };
                    delete cssVars[mediaQuery]; // remove media query object
                }
            });

            // merge css vars not wrapped on media queries
            return { ...acc, ...cssVars };
        }, {})
    )
);

export {
    toCssVars,
    mapThemeKeysToCssVars,
};
