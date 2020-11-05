import {
    toCssVars,
    mapThemeKeysToCssVars,
} from '../utils';

describe('BodyStyles helper utils', () => {
    let theme = null;
    let exprectedColorsMap = null;
    let exprectedFullMap = null;

    beforeAll(() => {
        theme = {
            breakpoints: {
                xs: 420,
                sm: 700,
                md: 1024,
                lg: 1600,
                xl: 1920,
            },
            colors: {
                red: '#FF0000',
                yellow: '#FFFF00',
                green: '#00FF00',
                purple: '#FF00FF',
                cyan: '#00FFFF',
                blue: '#0000FF',
                white: '#FFFFFF',
                black: '#000000',
            },
            zIndex: {
                header: 1000,
                modal: 2000,
            },
            fontSizes: {
                h1: '2rem',
                h2: '1.75rem',
                h3: '1.375rem',
                h4: '1.125rem',
                h5: '1.0625rem',
                normal: '0.9375rem',
                small: '0.8125rem',

                md: {
                    h1: '2.625rem',
                    h2: '2.25rem',
                    h3: '1.75rem',
                    h4: '1.375rem',
                    h5: '1.125rem',
                    normal: '1rem',
                    small: '0.875rem',
                },
            },
            spacing: {
                grid: '0.5rem',
                md: {
                    grid: '1rem',
                },
            },
        };

        exprectedColorsMap = {
            '--colors-red': '#FF0000',
            '--colors-yellow': '#FFFF00',
            '--colors-green': '#00FF00',
            '--colors-purple': '#FF00FF',
            '--colors-cyan': '#00FFFF',
            '--colors-blue': '#0000FF',
            '--colors-white': '#FFFFFF',
            '--colors-black': '#000000',
        };

        exprectedFullMap = {
            ...exprectedColorsMap,
            '--zIndex-header': '1000',
            '--zIndex-modal': '2000',
            '--fontSizes-h1': '2rem',
            '--fontSizes-h2': '1.75rem',
            '--fontSizes-h3': '1.375rem',
            '--fontSizes-h4': '1.125rem',
            '--fontSizes-h5': '1.0625rem',
            '--fontSizes-normal': '0.9375rem',
            '--fontSizes-small': '0.8125rem',
            '--spacing-grid': '0.5rem',

            '@media only screen and (min-width: 1024px)': {
                '--fontSizes-h1': '2.625rem',
                '--fontSizes-h2': '2.25rem',
                '--fontSizes-h3': '1.75rem',
                '--fontSizes-h4': '1.375rem',
                '--fontSizes-h5': '1.125rem',
                '--fontSizes-normal': '1rem',
                '--fontSizes-small': '0.875rem',
                '--spacing-grid': '1rem',
            },
        };
    });
    test('toCssVars', () => {
        expect(toCssVars('colors', theme.colors, theme)).toEqual(exprectedColorsMap);
    });

    test('mapThemeKeysToCssVars maps the object', () => {
        const mapper = mapThemeKeysToCssVars(['colors', 'zIndex', 'fontSizes', 'spacing', 'noExistingKey']);
        const props = {
            theme,
        };

        expect(mapper).toBeInstanceOf(Function);
        expect(mapper(props)).toEqual(exprectedFullMap);
    });
});
