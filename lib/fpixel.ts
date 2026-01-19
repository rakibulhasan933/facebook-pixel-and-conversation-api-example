export const FB_PIXEL_ID = process.env.FACEBOOK_PIXEL_ID;

export const pageview = ({ page }: { page: string }) => {
    window.fbq("track", `${page}View`);
    console.log({ page })
};

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export interface FbqEventOptions {
    [key: string]: any;
}

export const event = (name: string, options: FbqEventOptions = {}): void => {
    window.fbq("track", name, options);
};