export const FB_PIXEL_ID = process.env.FACEBOOK_PIXEL_ID;

export const pageview = () => {
    window.fbq("track", "PageView");
};

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export interface FbqEventOptions {
    [key: string]: any;
}

export const event = (name: string, options: FbqEventOptions = {}): void => {
    window.fbq("track", name, options);
};