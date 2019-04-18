const content = document.querySelector('.content');
const getVideoButton = document.querySelector('.getVideo');

const corsProxy = "https://cors-anywhere.herokuapp.com/"
const myChannelID = "UCJOmKtoLNXDjvH0VtmUx-qQ";
const myPlaylistID = "PLYBGjbcfSwVvc8sOlqsQmPJfuP1ObsCCb";

const apiKey = "AIzaSyD6t02LPUQ-firSnSNFw14HvgQ9YKjuc30";

const videosURL = `${corsProxy}https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=${myChannelID}&maxResults=50&key=${apiKey}`;
const playlistURL = `${corsProxy}https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${myChannelID}&key=${apiKey}`;
const playlistItemsURL = `${corsProxy}https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=${myPlaylistID}&key=${apiKey}`

getVideoButton.addEventListener('click', getRandomVideo)

function getRandomVideo() {
  content.innerHTML = "<p>Choosing a music video for you!</p>";
  fetch(playlistItemsURL)
    .then(response => response.json())
    .then(data => {
      let videosList = data.items;
      let videosListLength = videosList.length;
      let randomNumber = Math.floor(Math.random() * videosList.length + 1);
      let randomVideo = videosList[randomNumber]
      let randomVideoId = randomVideo.snippet.resourceId.videoId;
      content.innerHTML =
      `<iframe
      
        class="randomVideoIFrame"

        src="https://www.youtube.com/embed/${randomVideoId}"
        frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
      </iframe>`;
    })
}
