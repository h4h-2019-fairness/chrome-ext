// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Returns a handler which will open a new window when activated.
 */
    
function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
};

function getClickHandler() {
        
    
          const get = async (url) => {
            const response = await fetch(url);
            const content = await response.blob();
            const sha256 = CryptoJS.algo.SHA256.create();
            return new Promise((res, rej) => {
                let r = new FileReader()
                r.readAsBinaryString(content);
                r.addEventListener('loadend', (e) => {
                    sha256.update(CryptoJS.enc.Latin1.parse(e.target.result));
                    const hash = sha256.finalize();
                    res(''+hash);
                });
            });
        };
console.log("1")
    return function(info, tab) {
    get(info.srcUrl).then((hash) => {
        var url = 'https://h4h19-store.ahouts.com/content/' + hash;
        fetch(url).then((response) => {
            response.blob().then((content) => {
                let r = new FileReader()
                r.readAsText(content);
                r.addEventListener('loadend', (e) => {
                    var obj = JSON.parse(e.target.result);
                    if(isEmpty(obj)){
                        alert("Hash Not Found");
                    }
                    else{
                        var output = '';
                        for (var property in obj) {
                            output += obj[property].id + ': ' + obj[property].fullname +'; ';
                        }
                        alert(output);
                    }
                });
            });
        })
            
    });
  };
};

/**
 * Create a context menu which will only show up for images.
 */
chrome.contextMenus.create({
  "title" : "Verify Image",
  "type" : "normal",
  "contexts" : ["image"],
  "onclick" : getClickHandler()
});