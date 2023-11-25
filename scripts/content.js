const article = document.querySelector("article");

// `document.querySelector` may return null if the selector doesn't match anything.
if (article) {
  const text = article.textContent;

  chrome.storage.local.get(["huggingfaceKeyApi"]).then((result) => {
    //console.log("Value currently is " + JSON.stringify(result));
    if (result.huggingfaceKeyApi) {
      fetch(
        "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
        {
          headers: { Authorization: "Bearer " + result.huggingfaceKeyApi },
          method: "POST",
          body: JSON.stringify(
            { "inputs": text, "parameters": { "min_length": 100, "max_length": 250 } }
          ),
        }
      )
        .then(response => response.json())
        .then(data => {
          const badge = document.createElement("p");
          // Use the same styling as the publish information in an article's header
          badge.classList.add("color-secondary-text", "type--caption");
          badge.textContent = data[0]["summary_text"];

          // Support for API reference docs
          const heading = article.querySelector("h1");
          // Support for article docs with date
          const date = article.querySelector("time")?.parentNode;

          (date ?? heading).insertAdjacentElement("afterend", badge);

        }
        ).catch(err => {
          console.log(err);
        })
    }
  });
}
