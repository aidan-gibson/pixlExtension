import type { PlasmoCSConfig } from "plasmo"
import {InfluxDB} from '@influxdata/influxdb-client'
import type { FluxTableMetaData } from '@influxdata/influxdb-client';
import {url, token, org} from './env.mjs'

export const config: PlasmoCSConfig = {
  matches: ["https://mail.google.com/*"],
}

// const trackingPixelSrc = 'https://igafnl.com/track/1703560904723.png?eId=239511392&amp;eId2=1769716410';

const trackingPixelSrc = `https://pixl-server.vercel.app/`;
const trackingPixelWidth = '2';
const trackingPixelHeight = '3';
// const trackingPixel = `<span style="display:none"><img id="boo" src="${trackingPixelSrc}" width="${trackingPixelWidth}" height="${trackingPixelHeight}" alt=""></span>`;
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
      const epoch = Math.floor(Date.now() / 1000);
      const trackingPixel = `<span style="display:none"><img id="boo" src="${trackingPixelSrc}${epoch}.png" width="${trackingPixelWidth}" height="${trackingPixelHeight}" alt=""></span>`;
      div.insertAdjacentHTML('beforeend', trackingPixel);
      // console.log("inserted!!!!!!!!!!!!!!!!!!!");
      // increment storage count

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

// check for existing and log id

// stuff still loads after this, and the query selector is def correct (working on live page)
// window.onload = () => {
//   const imgTag = document.querySelector('img[src*="pixl-server.vercel.app"]');

//   if (imgTag) {
//     console.log(imgTag.outerHTML); // Outputs the entire <img> tag where src contains 'pixl-server.vercel.app'
//   } else {
//     console.log('No <img> tag with src containing "pixl-server.vercel.app" found');
//   }
// };

// if there's already a tracking pixel...
const observer = new MutationObserver((mutationsList, observer) => {
  for(let mutation of mutationsList) {
    if(mutation.addedNodes.length) {
      const imgTag = document.querySelector('img[src*="pixl-server.vercel.app"]');
      if (imgTag) {
        const src = imgTag.getAttribute('src');
        const match = src.match(/pixl-server\.vercel\.app\/(\d+)\.png/);
        if (match) {
          console.log(match[1]); // Outputs '1703760984'
          observer.disconnect();

          const queryApi = new InfluxDB({url, token}).getQueryApi(org)

          const fluxQuery = `from(bucket:"pixl") 
                   |> range(start: -1000y)
                   |> filter(fn: (r) => r._measurement == "pixl") 
                   |> filter(fn: (r) => r._field == "path" and r._value == "${match[1]}")
                   |> sort(columns: ["_time"], desc: true)`

          async function iterateRows() {
            console.log('*** IterateRows ***')
            let results: { [key: string]: string } = {};
            for await (const {values, tableMeta} of queryApi.iterateRows(fluxQuery)) {
              const o = tableMeta.toObject(values)
              results[o._time] = o.IP;
            }
            const sortedKeys = Object.keys(results).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
            sortedKeys.forEach(key => console.log(`${results[key]} at ${key}`));
            console.log('\nIterateRows SUCCESS')
          }
          iterateRows()

          // TODO UI insert
          let UIselect = document.querySelector('div.hj');
          UIselect.insertAdjacentHTML("afterbegin","<p>Tracked</p>");


          return;
        }
      }
    }
  }
});

observer.observe(document, { childList: true, subtree: true });






// There are more ways of how to receive results,
// the essential ones are shown in functions below.
// Execution of a particular function follows
// its definition, comment/uncomment it at will.
// See also rxjs-query.ts and queryWithParams.mjs .

// Execute query and receive table metadata and table row values using async iterator.
// async function iterateRows() {
//   console.log('*** IterateRows ***')
//   for await (const {values, tableMeta} of queryApi.iterateRows(fluxQuery)) {
//     // the following line creates an object for each row
//     const o = tableMeta.toObject(values)
//     console.log(o)
//     // console.log(JSON.stringify(o, null, 2))
//     console.log(
//       `${o.path} ${o.IP} in '${o.realtime}' (${o.time})`
//     )

//     // alternatively, you can get only a specific column value without
//     // the need to create an object for every row
//     // console.log(tableMeta.get(row, '_time'))
//   }
//   console.log('\nIterateRows SUCCESS')
// }
// iterateRows().catch((error) => console.error('IterateRows ERROR', error))

// Execute query and receive table metadata and rows in a result observer.


// Execute query and receive result CSV lines in an observer
// function queryLines() {
//   queryApi.queryLines(fluxQuery, {
//     next: (line: string) => {
//       console.log(line)
//     },
//     error: (error: Error) => {
//       console.error(error)
//       console.log('\nQueryLines ERROR')
//     },
//     complete: () => {
//       console.log('\nQueryLines SUCCESS')
//     },
//   })
// }
// queryLines()

// Execute query and receive result csv lines using async iterable
// async function iterateLines() {
//   for await (const line of queryApi.iterateLines(fluxQuery)) {
//     console.log(line)
//   }
//   console.log('\nIterateLines SUCCESS')
// }
// iterateLines().catch((error) => console.error('\nIterateLines ERROR', error))