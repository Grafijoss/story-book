import BACKGROUND_IMAGES from '~utils/staticAssets';

const DEFAULT_TOP_BACKGROUND = {
    backgroundTopPage: {
        default: BACKGROUND_IMAGES.topMobile,
        sm: BACKGROUND_IMAGES.top,
    },
    gradientTopHeight: {
        default: '95vw',
        sm: '30vw',
    },
};

const DEFAULT_BOTTOM_BACKGROUND = {
    backgroundBottomPage: {
        default: BACKGROUND_IMAGES.bottomMobile,
        sm: BACKGROUND_IMAGES.bottom,
    },
    gradientBottomHeight: {
        default: '95vw',
        sm: '30vw',
    },
};

const generateTopBackground = (images, gradient = {}) => ({
    backgroundTopPage: {
        ...DEFAULT_TOP_BACKGROUND.backgroundTopPage,
        ...images,
    },
    gradientTopHeight: {
        ...DEFAULT_TOP_BACKGROUND.gradientTopHeight,
        ...gradient,
    },
});

const generateBottomBackground = (images, gradient = {}) => ({
    backgroundBottomPage: {
        ...DEFAULT_BOTTOM_BACKGROUND.backgroundBottomPage,
        ...images,
    },
    gradientBottomHeight: {
        ...DEFAULT_BOTTOM_BACKGROUND.gradientBottomHeight,
        ...gradient,
    },
});

export {
    DEFAULT_TOP_BACKGROUND,
    DEFAULT_BOTTOM_BACKGROUND,
    generateTopBackground,
    generateBottomBackground,
};
