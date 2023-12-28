import type { PlasmoCSConfig } from "plasmo"
 
export const config: PlasmoCSConfig = {
  matches: ["https://mail.google.com/*"],
}
const trackingPixelSrc = 'https://igafnl.com/track/1703560904723.png?eId=239511392&amp;eId2=1769716410';
const trackingPixelWidth = '2';
const trackingPixelHeight = '3';
const trackingPixel = `<span style="display:none"><img id="boo" src="${trackingPixelSrc}" width="${trackingPixelWidth}" height="${trackingPixelHeight}" alt=""></span>`;
// const trackingPixel = '<img id="snvTrackImg" src="https://igafnl.com/track/1703560904723.png?eId=239511392&amp;eId2=1769716410" width="1" height="1" alt="">';
document.body.addEventListener('click', function(e) {
  // On every click
  const target = e.target as HTMLElement;
    if (target.innerHTML == 'Send' && e.isTrusted) {
    // console.log("Found send button!!!!!!!!!!!!!");

    // Stop propagation of the event (clicking Send)
    e.stopImmediatePropagation();

    // Insert the HTML
    let div = document.querySelector('div[aria-label="Message Body"]');
    if (div) {
      div.insertAdjacentHTML('beforeend', trackingPixel);
      console.log("inserted!!!!!!!!!!!!!!!!!!!");
    }
    // target.click(); doesn't work to click (send) at this point

  // If it was not, don't dispatch it again
  // Create a new MouseEvent and dispatch it on the button
  let clickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: false,
    view: window
  });
  target.dispatchEvent(clickEvent);
}
}, true); // Set the third argument to true to register the event listener in the capturing phase