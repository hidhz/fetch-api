// Fungsi mengambil data
function getData(urls){
    return fetch(urls)
    .then(response => {
        if(!response.ok) {
            throw new Error(response.statusText)
        }
        return response.json()
    })
    .then(response => response)
    .catch(error => console.log(error))
}
// Tampilkan Ui jika tombol diklik
const tombol = document.getElementById('tombol');
tombol.addEventListener('click', async function(){
    try {
        const inputKeyword = document.getElementById('inputKeyword')
        const MOVIES_URL = `https://api.themoviedb.org/3/search/movie?api_key=fe139a476a1f5db5f804627004eeabc1&query=${inputKeyword.value}`
        const movies = await getData(MOVIES_URL);
        tampilkanUi(movies.results)
    } catch (err) {
        console.log(err)
    }
});
document.addEventListener('click', async function(e){
    if(e.target.classList.contains('tretes')) {
        try {
            const dataId = e.target.dataset.idtmdb
            const MOVIE_DETAIL_URLS = `https://api.themoviedb.org/3/movie/${dataId}?api_key=fe139a476a1f5db5f804627004eeabc1&language=en-US`
            const datas = await getData(MOVIE_DETAIL_URLS)
            detailMovie(datas)
        } catch (e) {
            console.log(e)
        }
    }
});
// elements utama movie
function tampilkanUi(movies){
    let elements = "";
    movies.map(e => {
     elements += `<div class="col">
            <div class="card" style="width: 11rem;">
                <img src="https://image.tmdb.org/t/p/original/${e.backdrop_path}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title text-truncate">${e.title}</h5>
                    <p class="card-text">
                        ${e.release_date}
                        ${e.popularity}x ditonton
                    </p>
                    <button class="btn btn-primary tretes" data-bs-toggle="modal" data-bs-target="#klikModal" data-idtmdb="${e.id}">
                        view
                    </button>
                </div>
            </div>
        </div>`
    })
    document.getElementById('root').innerHTML = elements
}
// elements Movie detail 
function detailMovie(e){
    let elements = `
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">${e.title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
                <div class="container d-flex">
                    <div>
                        <img width="150" src="https://image.tmdb.org/t/p/original/${e.poster_path}" alt="...">
                    </div>
                    <div class="">
                        <h1 class="text-break">original title : ${e.original_title}</h1>
                         <ul>
                             <li class="text-break">website : ${e.homepage}</li>
                             <li>release : ${e.release_date}</li>
                             <li>popularity : ${e.popularity}</li>
                         </ul>
                    </div>
                </div>
            ${e.overview}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
    `
    document.querySelector('.modal-dialog')
    .innerHTML = elements
}