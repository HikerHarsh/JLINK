// Main entry point for the content script
// Observes the DOM for <video> elements and attaches the widget

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes) {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeName === 'VIDEO') {
                    // createDownloadWidget is defined in widget.js
                    createDownloadWidget(node);
                } else if (node.querySelectorAll) {
                    const videos = node.querySelectorAll('video');
                    videos.forEach(createDownloadWidget);
                }
            });
        }
    });
});

// Start observing the document
observer.observe(document.body, { childList: true, subtree: true });

// Run for any already existing videos
setTimeout(() => {
    const existingVideos = document.querySelectorAll('video');
    existingVideos.forEach(createDownloadWidget);
}, 1000);
