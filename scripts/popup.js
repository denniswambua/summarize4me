
'use strict';

function setKey(event) {
  const apiKey = document.getElementById("huggingApiKey").value
  if (apiKey !== "") {
    chrome.storage.local.set({ "huggingfaceKeyApi": apiKey }).then(() => {
      chrome.action.setBadgeText({ text: 'ON' });
      window.close();
    });
  }
}


document.getElementById('updateKey').addEventListener('click', setKey);
