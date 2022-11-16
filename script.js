"use strict";
//variables
const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('search-icon');
const resultBlocks = document.querySelectorAll('.result-block');

//const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;

//FetchResults function to retrieve data from wikipedia api and display results
const fetchResults = () => {
    let searchQuery = searchInput.value.trim();

    fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`)
        .then(response => response.json())
        .then(response => {
            document.querySelector('.results-grid').innertHTML = "";
            console.log(response)
            if (response.query.searchinfo.totalhits === 0) {
                alert("No results found,please try again ...");
            } else {
                for (let i = 0; i < resultBlocks.length; i++) {
                    resultBlocks[i].insertAdjacentHTML('beforeend', ` <div class="result">
                            <a href="https://en.wikipedia.org/?curid=${response.query.search[i].pageid}" target="_blank"><div class="title">${response.query.search[i].title}</div></a>
                            <div class="content">${response.query.search[i].snippet}</div>
                            <a href="https://en.wikipedia.org/?curid=${response.query.search[i].pageid}" target="_blank">https://en.wikipedia.org/?curid=${response.query.search[i].pageid}</a>
                           </div>`)
                }
            }
        }

        )
        .catch(error => alert(error.message));

}


//Event listener to call fetchResults function
searchBtn.addEventListener('click', () => {
    event.preventDefault();
    for (let i = 0; i < resultBlocks.length; i++) {
        resultBlocks[i].innerHTML = ' ';
    }
    fetchResults();
    searchInput.value = "";


})