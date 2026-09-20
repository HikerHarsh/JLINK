// Function to trigger download in JDownloader via Background Script
function sendToJD(url) {
    const toast = document.createElement('div');
    toast.innerText = `Sending page to JDownloader...`;
    toast.style.cssText = "position:fixed; bottom:20px; right:20px; background:#f39c12; color:#fff; padding:10px 15px; border-radius:4px; z-index:999999999; font-family: sans-serif;";
    document.body.appendChild(toast);

    chrome.runtime.sendMessage({ action: 'send_to_jd', url: url }, (response) => {
        if (response && response.success) {
            toast.innerText = 'Success! Sent to LinkGrabber.';
            toast.style.background = '#2ecc71';
        } else {
            toast.innerText = 'Error: Make sure JDownloader 2 is running.';
            toast.style.background = '#e74c3c';
        }
        setTimeout(() => toast.remove(), 4000);
    });
}

// Function to create and append the simple download widget
function createDownloadWidget(video) {
    if (video.dataset.jdWidgetAdded === 'true') return;

    const rect = video.getBoundingClientRect();
    
    // 1. Ignore hidden or extremely small videos (ads, tracking pixels)
    if (rect.width === 0 || rect.height === 0) return;
    if (rect.width < 200) return; 

    // 2. Specific fix for YouTube: Ignore homepage thumbnail previews
    if (window.location.hostname.includes('youtube.com')) {
        // Only show widget if the user is actually watching a video or a short
        if (!window.location.pathname.startsWith('/watch') && !window.location.pathname.startsWith('/shorts')) {
            return;
        }
        // Ignore the hover-to-play preview players on the right sidebar or search results
        if (video.closest && video.closest('#inline-preview-player')) {
            return;
        }
    }

    video.dataset.jdWidgetAdded = 'true';

    const container = document.createElement('div');
    container.className = 'jd-widget-container';

    // Header Only
    const header = document.createElement('div');
    header.className = 'jd-widget-header';

    const dragHandle = document.createElement('div');
    dragHandle.className = 'jd-drag-handle';
    dragHandle.title = 'Drag me';
    dragHandle.innerHTML = '&#10021;'; 

    const downloadBtn = document.createElement('button');
    downloadBtn.className = 'jd-download-btn';
    downloadBtn.innerHTML = `
        <svg style="width:16px;height:16px;vertical-align:middle;margin-right:4px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg> Send to JDownloader
    `;
    
    // Smart Link Collector on Click
    downloadBtn.addEventListener('click', (e) => {
        e.preventDefault(); 
        e.stopPropagation();
        
        const urlsToSend = new Set();
        
        urlsToSend.add(window.location.href);
        
        const vSrc = video.src || video.querySelector('source')?.src;
        if (vSrc && !vSrc.startsWith('blob:')) {
            urlsToSend.add(vSrc);
        }
        
        const finalUrls = Array.from(urlsToSend).join('\n');
        sendToJD(finalUrls);
    });

    const closeBtn = document.createElement('button');
    closeBtn.className = 'jd-close-btn';
    closeBtn.innerHTML = '&times;';
    closeBtn.title = 'Close';
    closeBtn.addEventListener('click', (e) => {
        e.preventDefault(); e.stopPropagation();
        container.remove(); 
        video.dataset.jdWidgetAdded = 'false'; 
    });

    header.appendChild(dragHandle);
    header.appendChild(downloadBtn);
    header.appendChild(closeBtn);

    container.appendChild(header);
    
    if (document.body) {
        document.body.appendChild(container);
    } else {
        document.documentElement.appendChild(container);
    }

    // Initial positioning
    container.style.top = (window.scrollY + (rect.top > 0 ? rect.top : 10) + 15) + 'px';
    container.style.left = (window.scrollX + (rect.left > 0 ? rect.left : 10) + 15) + 'px';

    makeDraggable(container, dragHandle);
}
