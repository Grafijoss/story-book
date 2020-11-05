import { createGlobalStyle } from 'styled-components';
import { mapThemeKeysToCssVars } from './utils';
import fontFace from './fontFace';

const BodyStyles = createGlobalStyle`
    ${fontFace}

    html,
    body {
        height: 100%;
        width: 100%;
        max-width: 100vw;
        -webkit-overflow-scrolling: touch;
    }

    body {
        margin: 0;
        padding: 0;
        font-family: ${({ theme }) => theme.fontFamily.default};
        font-size: var(--font-sizes-normal);
        color: var(--colors-text);
        ${({ transparentBackground }) => (transparentBackground ? '' : 'background-color: var(--colors-background);')}
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    #__next {
        background-color: var(--colors-background);
        display: flex;
        flex-direction: column;
        min-height: 100%;
        /* DO NOT SET OVERFLOW-X: HIDDEN HERE */
        /* This messes up the stickiness of the navigation */
    }

    * {
        box-sizing: border-box;
    }

    :root {
    ${mapThemeKeysToCssVars([
        'colors',
        'zIndex',
        'lineHeight',
        'fontSizes',
        'spacing',
    ])}
    }
`;

export default BodyStyles;
