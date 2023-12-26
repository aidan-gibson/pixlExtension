import type { PlasmoCSConfig } from "plasmo"
 
export const config: PlasmoCSConfig = {
  matches: ["https://mail.google.com/*"],
}
// TODO what if compose is already opened? that is possible.
// TODO what about replies
// document.body.addEventListener('click', function(e) {
//   const target = e.target as HTMLElement;
//   if (target.getAttribute('role') === 'button' && target.getAttribute('gh') === 'cm') {
//     alert('hi');
//     // where im tryna insert html 
//     // div with aria-label="Message Body"
//     // <div dir="ltr">Body<img id="snvTrackImg" src="https://robbieh.com/track/1703560937422.png?eId=239511392&amp;eId2=1769716410" width="1" height="1" alt=""></div>
//     // Find the div with aria-label="Message Body"
//     let div = document.querySelector('div[aria-label="Message Body"]');
//     // let div = document.querySelector('div[dir="ltr"]'); 
//     // TODO make sure there aren't mult matches to this

//     // if (div) {
//     //   // Replace it with the new HTML
//     //   div.innerHTML = '<div dir="ltr"><br><img id="snvTrackImg" src="https://igafnl.com/track/1703560904723.png?eId=239511392&amp;eId2=1769716410" width="1" height="1" alt=""></div>';
//     // }
//     // if (div && div.parentElement) {
//     //   // Append new HTML to the parent of the found div
//     //   div.parentElement.insertAdjacentHTML('beforeend', '<div dir="ltr"><br><img id="snvTrackImg" src="https://igafnl.com/track/1703560904723.png?eId=239511392&amp;eId2=1769716410" width="1" height="1" alt=""></div>');
//     // }
    
//     // in div dir="ltr" add <img id="snvTrackImg" src="https://igafnl.com/track/1703560904723.png?eId=239511392&amp;eId2=1769716410" width="1" height="1" alt=""> within
//     if (div) {
//       // Add the img element to the div
//       alert('div found');
//       div.insertAdjacentHTML('beforeend', '<img id="snvTrackImg" src="https://igafnl.com/track/1703560904723.png?eId=239511392&amp;eId2=1769716410" width="1" height="1" alt="">');
//     }
//   }
// }
function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}
//TODO make sure only inserts ONCE
// yeet comments
// turn url and querySelector paths into variables at top
// make sure insertAdjacentHTML is the correct fnc to b using here
// document.body.addEventListener('click', function(e) {
//   const target = e.target as HTMLElement;
//   if (target.getAttribute('role') === 'button' && target.getAttribute('gh') === 'cm') {
//     alert('hi');
    
//     let div = document.querySelector('div[aria-label="Message Body"]');
//     if (div) {
//       alert('div found');
//       div.insertAdjacentHTML('beforeend', '<img id="snvTrackImg" src="https://igafnl.com/track/1703560904723.png?eId=239511392&amp;eId2=1769716410" width="1" height="1" alt="">');
//     }

//   }
// });
document.body.addEventListener('click', function(e) {
  const target = e.target as HTMLElement;
  if (target.getAttribute('role') === 'button' && target.getAttribute('gh') === 'cm') {
    alert('hi');

    // Create a MutationObserver instance
    let observer = new MutationObserver((mutations) => {
      // Try to find the div
      let div = document.querySelector('div[aria-label="Message Body"]');
      
      if (div) {
        // If the div is found, stop observing
        observer.disconnect();

        alert('div found');
        div.insertAdjacentHTML('beforeend', '<img id="snvTrackImg" src="https://igafnl.com/track/1703560904723.png?eId=239511392&amp;eId2=1769716410" width="1" height="1" alt="">');
      }
    });

    // Start observing the document with the configured parameters
    observer.observe(document, { childList: true, subtree: true });
  }
});