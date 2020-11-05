import { css } from 'styled-components';
import { isNumber, isObject, identity } from './core';

const toCSSURL = url => (!url ? 'none' : `url("${url.replace(/(\(|\))/g, (_, g1) => escape(g1))}")`);
const toPixel = value => (isNumber(value) ? `${value}px` : value);
const toPercentage = value => (isNumber(value) ? `${100 * value}%` : value);

const propToCSSURL = prop => props => toCSSURL(props[prop]);
const mediaMinWidth = size => `@media only screen and (min-width: ${toPixel(size)})`;
const getMediaMinWidth = size => (
    ({ theme = {} }) => mediaMinWidth((theme.breakpoints && theme.breakpoints[size]) || size)
);

const getResponsiveStyle = (key, cssStyle = key, propMapper = identity) => (
    (props) => {
        const {
            [key]: prop,
        } = props;

        if (isObject(prop)) {
            return Object.entries(prop).reduce((acc, [mq, val]) => {
                if (mq === 'default') {
                    acc[cssStyle] = propMapper(val);
                } else {
                    acc[getMediaMinWidth(mq)(props)] = {
                        [cssStyle]: propMapper(val),
                    };
                }

                return acc;
            }, {});
        }

        return {
            [cssStyle]: propMapper(prop),
        };
    }
);

const getMinHeightContentBox = () => css`
    min-height: calc(100vh - 113px); /* header and footer height */

    ${getMediaMinWidth('sm')} {
        min-height: calc(100vh - 237px);
    }
`;

const cssUnitsRegex = /^([+-]?[0-9]*\.?(?:[0-9]+)?)(px|em|rem|ex|%|in|cm|mm|pt|pc)?$/;

export {
    cssUnitsRegex,
    getMediaMinWidth,
    getResponsiveStyle,
    mediaMinWidth,
    propToCSSURL,
    toCSSURL,
    toPixel,
    toPercentage,
    getMinHeightContentBox,
};
