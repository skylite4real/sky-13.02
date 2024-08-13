// Function to handle video selection and display
function displayShort(input) {
    const file = input.files[0];
    if (file) {
        const videoHolder = document.getElementById('ShortBox');
        const videoCloseIcon = document.querySelector('.short-video-close-icon');

        // Create Video.js player
        const videoElement = document.createElement('video');
        videoElement.id = 'shortVideoPlayer';
        videoElement.className = 'video-js vjs-default-skin';
        videoElement.controls = true;
        videoElement.preload = 'auto';

        // Set the video source
        const source = document.createElement('source');
        source.src = URL.createObjectURL(file);
        source.type = file.type;
        videoElement.appendChild(source);

        // Remove any existing video and append the new one
        videoHolder.innerHTML = '';
        videoHolder.appendChild(videoElement);

        // Initialize Video.js on the created video element
        videojs(videoElement, {
            aspectRatio: '9:16',  // Set the aspect ratio to 9:16
            fluid: false,  // Prevent the player from resizing
            fill: true     // Make sure the video fills the container
        }, function() {
            console.log('Video.js player initialized');
        });

        // Show the close icon
        videoCloseIcon.style.display = 'block';
        videoHolder.appendChild(videoCloseIcon);

        // Store the file for preview use
        videoHolder.dataset.fileSrc = source.src;
        videoHolder.dataset.fileType = source.type;
    }
}

// Function to preview the selected video
function previewShortVideo() {
    const videoHolder = document.getElementById('ShortBox');
    const previewHolder = document.getElementById('shortPreview');
    const closePreviewButton = document.getElementById('closePreviewButtonShort');
    const videoCloseIcon = document.querySelector('.short-video-close-icon');
    const fileSrc = videoHolder.dataset.fileSrc;
    const fileType = videoHolder.dataset.fileType;

    if (fileSrc && fileType) {
        // Create a new video element for the preview
        const previewVideo = document.createElement('video');
        previewVideo.id = 'shortVideoPlayerPreview';
        previewVideo.className = 'video-js vjs-default-skin';
        previewVideo.controls = true;
        previewVideo.preload = 'auto';

        // Set the video source
        const previewSource = document.createElement('source');
        previewSource.src = fileSrc;
        previewSource.type = fileType;
        previewVideo.appendChild(previewSource);

        // Remove any existing preview video and append the new one
        previewHolder.innerHTML = '';
        previewHolder.appendChild(previewVideo);

        // Initialize Video.js on the created preview video element
        videojs(previewVideo, {
            aspectRatio: '9:16',  // Set the aspect ratio to 9:16
            fluid: false,  // Prevent the player from resizing
            fill: true     // Make sure the video fills the container
        }, function() {
            console.log('Preview Video.js player initialized');
        });

        // Show the preview box
        document.getElementById('previewBoxShort').style.display = 'block';
        closePreviewButton.style.display = 'block';
        videoCloseIcon.style.display = 'none';  // Hide the close icon when preview is open
    } else {
        alert('Please select a video first.');
    }
}

// Function to close the video preview
function closePreviewShort() {
    document.getElementById('previewBoxShort').style.display = 'none';
    document.getElementById('shortPreview').innerHTML = '';
    document.getElementById('closePreviewButtonShort').style.display = 'none'; // Hide the close preview button
    document.querySelector('.short-video-close-icon').style.display = 'block'; // Show the close icon again
}

// Function to clear the selected video
function clearShortVideo() {
    const videoHolder = document.getElementById('ShortBox');
    const videoCloseIcon = document.querySelector('.short-video-close-icon');

    // Clear the video content and hide the close icon
    videoHolder.innerHTML = '';

    // Re-append the "Choose Short Video" button and input element
    videoHolder.innerHTML = `
        <input type="file" id="shortFile" accept="video/*" style="display: none;" onchange="displayShort(this)">
        <div class="choose-short-video-button" onclick="document.getElementById('shortFile').click();">
            <i class="fa-solid fa-clapperboard shorts-upload-icon"></i>
            <span class="shot-video-blue-text">Choose Short Video</span>
        </div>
    `;

    // Hide the close icon again
    videoCloseIcon.style.display = 'none';
    
    // Re-append the close icon in case user selects another video
    videoHolder.appendChild(videoCloseIcon);

    // Clear the stored data attributes
    delete videoHolder.dataset.fileSrc;
    delete videoHolder.dataset.fileType;
}
