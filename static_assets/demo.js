jPlayerPlaylist.prototype.addMedia = function(media) {
  this.playlist.push(media);
  this.displayPlayList();
};


function musicPlaye(dataset) {
    
    var info={

        // timeOpened:new Date(),
        // timezone:(new Date()).getTimezoneOffset()/60,
    
        pageon(){return window.location.pathname},
        referrer(){return document.referrer},
        previousSites(){return history.length},
    
        browserName(){return navigator.appName},
        browserEngine(){return navigator.product},
        browserVersion1a(){return navigator.appVersion},
        browserVersion1b(){return navigator.userAgent},
        browserLanguage(){return navigator.language},
        browserOnline(){return navigator.onLine},
        browserPlatform(){return navigator.platform},
        javaEnabled(){return navigator.javaEnabled()},
        dataCookiesEnabled(){return navigator.cookieEnabled},
        // dataCookies1(){return document.cookie},
        // dataCookies2(){return decodeURIComponent(document.cookie.split(";"))},
        //1 dataStorage(){return window.localStorage},
    
        sizeScreenW(){return screen.width},
        sizeScreenH(){return screen.height},
        sizeDocW(){return document.width},
        sizeDocH(){return document.height},
        sizeInW(){return innerWidth},
        sizeInH(){return innerHeight},
        sizeAvailW(){return screen.availWidth},
        sizeAvailH(){return screen.availHeight},
        scrColorDepth(){return screen.colorDepth},
        scrPixelDepth(){return screen.pixelDepth},
    
    
        // latitude(){return position.coords.latitude},
        // longitude(){return position.coords.longitude},
        // accuracy(){return position.coords.accuracy},
        // altitude(){return position.coords.altitude},
        // altitudeAccuracy(){return position.coords.altitudeAccuracy},
        // heading(){return position.coords.heading},
        // speed(){return position.coords.speed},
        // timestamp(){return position.timestamp},


    };
    
    
    
    const data = new FormData();
    data.append('id', dataset.id);
    data.append('title', dataset.title);
    data.append('music', dataset.music);
    data.append('artist', dataset.artist);
    data.append('time', new Date());
    data.append('page', window.location.href);
    data.append('info', info);
    
    
    for (var k in info) {
        if (info.hasOwnProperty(k)) {
        //   user[k] = data[k];
           
           

            if (typeof info[k] === "function") {
                data.append(k, info[k].call(info));
            }else{
                data.append(k, info[k]);
            }


        }
    }
    
    
    fetch('https://fiveta.ir/api/musicPlayNow', {method: 'POST', body: data}).then(response => {
         //console.log(response)
        if (!response.ok){
            throw new Error('Network response was not ok.');
        }
    }).catch(err => console.log(err));
}

function onError(message, url, lineNumber){
        const data = new FormData();
        data.append('message', message);
        data.append('url', url);
        data.append('ln', lineNumber);
        fetch('https://fiveta.ir/api/PlayedWrong', {method: 'POST', body: data}).then(response => {
         //console.log(response)
        if (!response.ok){
            throw new Error('Network response was not ok.');
        }
    }).catch(err => console.log(err));
}

function IsMusicInPlaylist(musicLink){
    for(i = 0 ; i < myPlaylist.playlist.length ; i++){
        if(myPlaylist.playlist[i]['mp3'] == musicLink){
            //console.log(i)
            return i
        }
    }
    return false;
}
function checkCanUseIDB(){
    // In the following line, you should include the prefixes of implementations you want to test.
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    // DON'T use "var indexedDB = ..." if you're not in a function.
    // Moreover, you may need references to some window.IDB* objects:
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"}; // This line should only be needed if it is needed to support the object's constants for older browsers
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
    // (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)
    if (!window.indexedDB) {
        console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
    }
}


function updateMediaSessionFromDataset(dataset) {
    if (!('mediaSession' in navigator)) return;

    navigator.mediaSession.metadata = new MediaMetadata({
        title: dataset.title,
        artist: dataset.artist || 'Unknown Artist',
        album: 'FiveTa',
        artwork: [
            {
                src: dataset.photo,
                sizes: '512x512',
                type: 'image/jpeg'
            }
        ]
    });
}



function playmusic(e){
    // //console.log(e.target);
    // //alert(e.target.dataset.music );
    // checkCanUseIDB()
    
    // // Let us open our database
    // var db;
    // var request = indexedDB.open("MyTestDatabase",12);
    // request.onerror = function(event) {
    //   // Generic error handler for all errors targeted at this database's
    //   // requests!
    //   console.error("Database error: " + event.target.errorCode);
    // };

    // // This event is only implemented in recent browsers   
    // request.onupgradeneeded = function(event) {
    //     var db = event.target.result;
        
    //       // Create an objectStore to hold information about our customers. We're
    //       // going to use "ssn" as our key path because it's guaranteed to be
    //       // unique - or at least that's what I was told during the kickoff meeting.
    //     //   var objectStore = db.createObjectStore("customers", { keyPath: "ssn" });
        
    //     //   // Create an index to search customers by name. We may have duplicates
    //     //   // so we can't use a unique index.
    //     //   objectStore.createIndex("name", "name", { unique: false });
        
    //     //   // Create an index to search customers by email. We want to ensure that
    //     //   // no two customers have the same email, so use a unique index.
    //     //   objectStore.createIndex("email", "email", { unique: true });
        
        
    //     // data.append('id', dataset.id);
    //     // data.append('title', dataset.title);
    //     // data.append('music', dataset.music);
    //     // data.append('artist', dataset.artist);
    //     //music
    //     // var objectStore = db.createObjectStore("musics", { keyPath: "id" });
        
        
    //       // Use transaction oncomplete to make sure the objectStore creation is 
    //       // finished before adding data into it.
    //     //   objectStore.transaction.oncomplete = function(event) {
    //     //     // Store values in the newly created objectStore.
    //     //     // var customerObjectStore = db.transaction("customers", "readwrite").objectStore("customers");
    //     //     // customerData.forEach(function(customer) {
    //     //     //   customerObjectStore.add(customer);
    //     //     // });
    //     //   };
    // };
    
    
    // request.onsuccess = function(event) {
    //   db = event.target.result
    //   var transaction = db.transaction(["customers"], "readwrite").objectStore("customers");
    //     const cd  = JSON.parse(JSON.stringify(e.target.dataset));
    //         transaction.add(cd);
    // };
    
    
    indexOfMusic = IsMusicInPlaylist(e.target.dataset.music)
    if(indexOfMusic !== false){
        myPlaylist.play(indexOfMusic);
        document.title = 'FiveTa    ' +  e.target.dataset.title;
    }else{
        myPlaylist.add({
            title: e.target.dataset.title,
            artist: e.target.artist,
            mp3: e.target.dataset.music,
            // oga:"http://www.jplayer.org/audio/ogg/Miaow-01-Tempered-song.ogg",
            poster: e.target.dataset.photo,
        });
        myPlaylist.play(myPlaylist.playlist.length - 1);
        document.title = 'FiveTa | ' +  e.target.dataset.title;
        
        //1 window.localStorage.removeItem('jp_playlist');
        //1 window.localStorage.setItem('jp_playlist', JSON.stringify(myPlaylist));
    }
    updateMediaSessionFromDataset(e.target.dataset);
    setTimeout(function() { musicPlaye(e.target.dataset); }, 987);
    
    
}




window.onerror = function(message, url, lineNumber) {  
  //save error and send to server for example.
  onError(message, url, lineNumber);
  return true;
};  




var myPlaylist;
$(document).on('ready | pjax:end', function()  {
  console.log("start init player");
  let playable = document.getElementsByClassName("play-now");
  for (let i = 0; i < playable.length; i++) {
    //console.log(playable[i]);
    playable[i].onclick = playmusic;
// playable[i].onclick = function (e) {
//   //console.log(e.target);
//   //alert(e.target.dataset.music );
//   myPlaylist.add({
//     title: e.target.dataset.title,
//     artist: e.target.artist,
//     mp3: e.target.dataset.music,
//     // oga:"http://www.jplayer.org/audio/ogg/Miaow-01-Tempered-song.ogg",
//     poster: e.target.dataset.photo,
//   });
//   myPlaylist.play(myPlaylist.playlist.length - 1);

//   localStorage.removeItem('jp_playlist');
//   localStorage.setItem('jp_playlist', JSON.stringify(myPlaylist));

// };
  }

  //jQuery(document).on('click', '#play_now', function(e){alert();});
//   var oldPlayList;
//1   var oldpls = window.localStorage.getItem('jp_playlist');
oldpls = null
//   console.log(oldpls)
  if (oldpls !== null) {
    old = JSON.parse(oldpls)
    myPlaylist =  new jPlayerPlaylist(
        {
            jPlayer: "#jplayer_N",
            cssSelectorAncestor: "#jp_container_N"
        },
        old["playlist"],
        {
            playlistOptions : old["options"]["playlistOptions"],
            swfPath: "js/jPlayer",
            supplied: "mp3",
            smoothPlayBar: true,
            keyEnabled: true,
            audioFullScreen: false
            
        }
    );
    // console.log(old["options"]["playlistOptions"])
    
  }
  {
    if(! myPlaylist) {
    myPlaylist = new jPlayerPlaylist({
      jPlayer: "#jplayer_N",
      cssSelectorAncestor: "#jp_container_N"
    }, [
      // {
      //   title:"Bubble",
      //   artist:"Miaow",
      //   ///mp3: "http://dl.pop-music.ir/music/1397/Azar/Xaniar%20Khosravi%20-%20Rafti%20Ke%20Chi%20Beshe%20(128).mp3xx",
      //   // oga: "http://flatfull.com/themes/assets/musics/Miaow-07-Bubble.ogg",
      //   poster: "images/m0.jpg"
      // }
    ], {
      playlistOptions: {
        enableRemoveControls: true,
        autoPlay: true
      },
      swfPath: "js/jPlayer",
    //   supplied: "webmv, ogv, m4v, oga, mp3",
      supplied: "mp3",
      smoothPlayBar: true,
      keyEnabled: true,
      audioFullScreen: false
    });
  }
  $(document).on($.jPlayer.event.pause, myPlaylist.cssSelector.jPlayer,  function(){
    $('.musicbar').removeClass('animate');
    $('.jp-play-me').removeClass('active');
    $('.jp-play-me').parent('li').removeClass('active');
  });

  $(document).on($.jPlayer.event.play, myPlaylist.cssSelector.jPlayer,  function(){
    $('.musicbar').addClass('animate');
  });

  $(document).on('click', '.jp-play-me', function(e){
    e && e.preventDefault();
    var $this = $(e.target);
    if (!$this.is('a')) $this = $this.closest('a');

    $('.jp-play-me').not($this).removeClass('active');
    $('.jp-play-me').parent('li').not($this.parent('li')).removeClass('active');

    $this.toggleClass('active');
    $this.parent('li').toggleClass('active');
    if( !$this.hasClass('active') ){
      myPlaylist.pause();
    }else{
      var i = Math.floor(Math.random() * (1 + 7 - 1));
      myPlaylist.play(i);
    }
    
  });

}

  // video

//   $("#jplayer_1").jPlayer({
//     ready: function () {
//       $(this).jPlayer("setMedia", {
//         title: "Big Buck Bunny",
//         m4v: "http://flatfull.com/themes/assets/video/big_buck_bunny_trailer.m4v",
//         ogv: "http://flatfull.com/themes/assets/video/big_buck_bunny_trailer.ogv",
//         webmv: "http://flatfull.com/themes/assets/video/big_buck_bunny_trailer.webm",
//         poster: "images/m41.jpg"
//       });
//     },
//     swfPath: "js",
//     supplied: "webmv, ogv, m4v",
//     size: {
//       width: "100%",
//       height: "auto",
//       cssClass: "jp-video-360p"
//     },
//     globalVolume: true,
//     smoothPlayBar: true,
//     keyEnabled: true
//   });

});
