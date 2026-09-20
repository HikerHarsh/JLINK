// Background script: Only handles sending links to JDownloader

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'send_to_jd') {
        const link = request.url;
        // JDownloader Local FlashGot Port (No Auth Required)
        const flashGotUrl = 'http://127.0.0.1:9666/flashgot';
        
        fetch(flashGotUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ urls: link, autostart: 0 }) // Always 0 so it goes to LinkGrabber
        })
        .then(res => sendResponse({ success: res.ok, error: res.ok ? null : 'FlashGot error' }))
        .catch(err => sendResponse({ success: false, error: err.message }));
        
        return true; 
    }
});
