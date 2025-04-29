import { initAutoWidthSlider } from "./autoWidth";
import { initTickerSlider } from "./ticker";
import { initMobileSlider } from "./mobile";

export default function initSliders() {
    initTickerSlider();
    initAutoWidthSlider();
    initMobileSlider();
}