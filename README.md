`nvm use 'lts/*'`
Now using node v20.10.0 (npm v10.2.3)

`echo 'v20.10.0' > .nvmrc`

Using Plasmo framework
`npm create plasmo`

`npm run dev` dev server (live-reloading and HMR)
`npm run build` production build


- match `https://mail.google.com/*`
- add eventlistener mouse click
  - if u click on `target.getAttribute('role') === 'button' && target.getAttribute('gh') === 'cm'`...
- insert html

new logic
stop prop of Send button





* if u click a button within <div class="dC">
  * actually wait, the arrow thing is a button. okay so explicitly, if u hit THE send button or THE schedule send button
stop prop
* insert 
  * let div = document.querySelector('div[aria-label="Message Body"]');
  * div.insertAdjacentHTML('beforeend', '<img id="snvTrackImg" src="https://igafnl.com/track/1703560904723.png?eId=239511392&amp;eId2=1769716410" width="1" height="1" alt="">');
* continue prop


# todo
* don't load urself! don't want it to count as "read" / "accessed" if it's just me opening the email
what about replies
what if u hit Send but u don't have To field filled out, or if u don't have a subject and/or body?
what if it doesn't send due to network error? 
* cmd + enter to send is also a thing...okay i should REALLY be hooking into the send script, like what runs when that button is pressed, instead of current method
* test apple mail and other providers that allegedly block pixels
* does providing ip address to ppl violate some data laws?
* mailtrack does base64 content encoding, maybe should do that too?

# tests
* send multiple messages in one go
* compose is already open
* replies
* reply to someone while a compose is open
* not just send button but also Schedule Send and confidential send
* set up automated testing ? maybe w github actions? maybe a playwright sitch?
* windows and linux
* diff languages?


* now using inboxsdk, developed by streak, used by snov.io
  * https://inboxsdk.github.io/inboxsdk-docs/ docs are for chrome-mv2, which remotely loads script
  * https://www.npmjs.com/package/@inboxsdk/core chrome-mv3
    * https://groups.google.com/g/inboxsdk/c/MAT_zImFu5I/m/N_7nDojRAgAJ?pli=1
    * https://github.com/InboxSDK/hello-world
  * https://github.com/InboxSDK/InboxSDK
    * https://inboxsdk.github.io/inboxsdk-docs/compose/
      * button to enable/disable tracking
      * insertHTMLIntoBodyAtCursor(html)
      * **presending** fires when the user presses send. you can modify the message. this event may be emitted multiple times for one message.
  * chrome mv3 compat only
    * actually no, not gonna use this bc not compat w non-chrome. and kinda bulky, i don't need.

* targets
  * plasmo officially supported
    * firefox-mv2 (manifest version 2)
    * chrome-mv3
    * firefox-mv3 (experimental)
  * plasmo "should" work
    * edge-mv3
    * brave-mv3
    * opera-mv3
  * safari requires workaround 
    * https://github.com/PlasmoHQ/plasmo/issues/233
    * target safari-mv3 and use below tool to convert
    * https://developer.apple.com/documentation/safariservices/safari_web_extensions/converting_a_web_extension_for_safari


