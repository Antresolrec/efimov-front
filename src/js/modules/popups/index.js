import Popups from "./popupControl";

export default function initPopups() {
    const popups = new Popups();
    window.popups = popups;
}