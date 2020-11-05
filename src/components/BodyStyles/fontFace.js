import { css } from 'styled-components';
import { getStaticFolder } from '~utils/environment';

/* istanbul ignore next */
const fontFaceCss = css`
    @font-face {
        font-family: 'Bebas';
        src: url('${getStaticFolder()}/fonts/BEBAS___-webfont.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }

    /* condensed fonts */
    @font-face {
        font-family: 'SSTProCondensed';
        src: url('${getStaticFolder()}/fonts/SSTProCondensed.woff2') format('woff2'),
            url('${getStaticFolder()}/fonts/SSTProCondensed.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }
    @font-face {
        font-family: 'SSTProCondensed';
        src: url('${getStaticFolder()}/fonts/SSTProCondensedBd.woff2') format('woff2'),
            url('${getStaticFolder()}/fonts/SSTProCondensedBd.woff') format('woff');
        font-weight: 600 700;
        font-style: normal;
    }

    /* Ordered from thicker to thiner font weights */
    @font-face {
        font-family: 'SSTPro';
        src: url('${getStaticFolder()}/fonts/SSTProHeavy.woff2') format('woff2'),
            url('${getStaticFolder()}/fonts/SSTProHeavy.woff') format('woff');
        font-weight: 900;
        font-style: normal;
    }
    @font-face {
        font-family: 'SSTPro';
        src: url('${getStaticFolder()}/fonts/SSTProHeavyItalic.woff2') format('woff2'),
            url('${getStaticFolder()}/fonts/SSTProHeavyItalic.woff') format('woff');
        font-weight: 900;
        font-style: italic;
    }
    @font-face {
        font-family: 'SSTPro';
        src: url('${getStaticFolder()}/fonts/SSTProBold.woff2') format('woff2'),
            url('${getStaticFolder()}/fonts/SSTProBold.woff') format('woff');
        font-weight: 600 700;
        font-style: normal;
    }
    @font-face {
        font-family: 'SSTPro';
        src: url('${getStaticFolder()}/fonts/SSTProBoldItalic.woff2') format('woff2'),
            url('${getStaticFolder()}/fonts/SSTProBoldItalic.woff') format('woff');
        font-weight: 600 700;
        font-style: italic;
    }
    @font-face {
        font-family: 'SSTPro';
        src: url('${getStaticFolder()}/fonts/SSTProMedium.woff2') format('woff2'),
            url('${getStaticFolder()}/fonts/SSTProMedium.woff') format('woff');
        font-weight: 500;
        font-style: normal;
    }
    @font-face {
        font-family: 'SSTPro';
        src: url('${getStaticFolder()}/fonts/SSTProMediumItalic.woff2') format('woff2'),
            url('${getStaticFolder()}/fonts/SSTProMediumItalic.woff') format('woff');
        font-weight: 500;
        font-style: italic;
    }
    @font-face {
        font-family: 'SSTPro';
        src: url('${getStaticFolder()}/fonts/SSTProRoman.woff2') format('woff2'),
            url('${getStaticFolder()}/fonts/SSTProRoman.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }
    @font-face {
        font-family: 'SSTPro';
        src: url('${getStaticFolder()}/fonts/SSTProItalic.woff2') format('woff2'),
            url('${getStaticFolder()}/fonts/SSTProItalic.woff') format('woff');
        font-weight: normal;
        font-style: italic;
    }
    @font-face {
        font-family: 'SSTPro';
        src: url('${getStaticFolder()}/fonts/SSTProLight.woff2') format('woff2'),
            url('${getStaticFolder()}/fonts/SSTProLight.woff') format('woff');
        font-weight: 200;
        font-style: normal;
    }
    @font-face {
        font-family: 'SSTPro';
        src: url('${getStaticFolder()}/fonts/SSTProLightItalic.woff2') format('woff2'),
            url('${getStaticFolder()}/fonts/SSTProLightItalic.woff') format('woff');
        font-weight: 200;
        font-style: italic;
    }
    @font-face {
        font-family: 'SSTPro';
        src: url('${getStaticFolder()}/fonts/SSTProUltraLight.woff2') format('woff2'),
            url('${getStaticFolder()}/fonts/SSTProUltraLight.woff') format('woff');
        font-weight: 100;
        font-style: normal;
    }
    @font-face {
        font-family: 'SSTPro';
        src: url('${getStaticFolder()}/fonts/SSTProUltraLightItalic.woff2') format('woff2'),
            url('${getStaticFolder()}/fonts/SSTProUltraLightItalic.woff') format('woff');
        font-weight: 100;
        font-style: italic;
    }
`;

export default fontFaceCss;
