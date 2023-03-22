const searchForm = document.querySelector("#search-form");
const cardList = document.querySelector(".result-list");
const searchInput = document.querySelector("#search-input");
const wordList = document.querySelector('.ulAuto')
const api = "https://api.dictionaryapi.dev/api/v2/entries/en/";



searchInput.addEventListener('keyup', (e) => {
wordList.style.display = 'block'

  wordList.textContent = '';
  getData('GET', `/autocomplete?term=${e.target.value}`, (data) => {


    const sugg = data.filter((word, index) => index < 10)
    sugg.forEach((item) => {
      let wordItem = document.createElement('li')
      wordItem.classList.add('word')
      wordItem.textContent = item

      wordList.appendChild(wordItem)

      wordItem.addEventListener('click', (e) => {
        searchInput.value = e.target.textContent
        wordList.style.display = 'none'
      })
    })
  })
})

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  cardList.innerHTML = "";
  getData("GET", api + searchInput.value, (data) => {
    data.forEach((element) => {
      let card = document.createElement("li");
      card.classList.add("result-card");

      let header = document.createElement("div");
      header.classList.add("header");

      let title = document.createElement("span");
      title.classList.add("title");
      title.textContent = element.word;

      let sound = document.createElement("span");
      sound.classList.add("sound");
      sound.textContent = element.phonetic;

      header.appendChild(title);
      header.appendChild(sound);

      let meaning = document.createElement("div");
      meaning.classList.add("meaning");

      element.meanings.forEach((item) => {
        let partOfSpeech = document.createElement("span");
        partOfSpeech.classList.add("part-of-speech");
        partOfSpeech.textContent = item.partOfSpeech;

        let definitionList = document.createElement("ul");
        definitionList.classList.add("definition-list");

        item.definitions.forEach((def) => {
          let definition = document.createElement("li");
          definition.classList.add("definition");
          definition.textContent = def.definition;

          definitionList.appendChild(definition);
        });

        meaning.appendChild(partOfSpeech);
        meaning.appendChild(definitionList);
      });

      card.appendChild(header);
      card.appendChild(meaning);
      cardList.appendChild(card);
    });
  });
});
