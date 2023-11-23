import { NAVIGATION_EVENT } from "../constants";

export const Navigate = (href: string) => {
    window.history.pushState({}, '', href);
    const navigationEvent = new Event(NAVIGATION_EVENT);
    window.dispatchEvent(navigationEvent);
}