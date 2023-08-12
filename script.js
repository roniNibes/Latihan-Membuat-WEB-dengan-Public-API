// with Fetch

const searchBtn = document.querySelector("#search-button"),
  searchInputVal = document.querySelector("#search-input");

searchBtn.addEventListener("click", function () {
  fetch(`http://www.omdbapi.com/?apikey=5354abbf&s=${searchInputVal.value}`)
    .then((response) => response.json())
    .then((response) => {
      const movies = response.Search;
      const movieList = document.querySelector("#movie-list");
      let cardsMovie = "";

      movies.map((movie) => {
        cardsMovie += showCards(movie);
      });
      movieList.innerHTML = cardsMovie;

      // ? ketika see details diklik

      const modal = document.querySelectorAll(".see-detail");
      console.info(modal);
      modal.forEach((btn) => {
        btn.addEventListener("click", function () {
          // console.info(this);
          const imdbid = this.dataset.id;
          // console.info(imdbid);
          fetch("http://www.omdbapi.com/?apikey=5354abbf&i=" + imdbid)
            .then((response) => response.json())
            .then((m) => {
              const movieDetail = showMovieDetail(m);
              const modalBody = document.querySelector(".modal-body");
              modalBody.innerHTML = movieDetail;
            });
        });
      });
    });
});

function showCards(movie) {
  return `
  <div class='col-md-4 my-5'>
      <div class="card" >
        <img src="${movie.Poster}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${movie.Title}</h5>
          <h6 class="card-subtitle mb-2 text-body-secondary">${movie.Year}</h6>
          <a href="#" data-bs-toggle="modal" class="card-link text-decoration-none see-detail"
          data-bs-target="#exampleModal" data-id="${movie.imdbID}" >See Details</a></div>
      </div>
      </div>
  `;
}

function showMovieDetail(movie) {
  return `
  <div class='container-fluid'>
      <div class='row'>
        <div class='col-md-4'>
            <img src='${movie.Poster}' class='img-fluid'>
        </div>
      <div class='col-md-8'>
        <ul class="list-group">
            <li class="list-group-item"><h3>${movie.Title}</h3></li>
            <li class="list-group-item">${movie.Released}</li>
            <li class="list-group-item">${movie.Genre}</li>
            <li class="list-group-item">${movie.Plot}</li>
        </ul>
      </div>
      </div>
    </div>
  `;
}

// function searchAndResultMovie() {
//   $("#movie-list").html("");
//   $.ajax({
//     url: "http://www.omdbapi.com",
//     type: "GET",
//     dataType: "json",
//     data: {
//       apikey: "5354abbf",
//       s: $("#search-input").val(),
//     },
//     success: function (result) {
//       //   console.info(result)

//       if (result.Response === "True") {
//         const movies = result.Search;
//         console.info(movies);
//         movies.map((data, i) => {
//           $("#movie-list").append(`
//             <div class='col-md-4'>
//             <div class="card " >
//               <img src="${data.Poster}" class="card-img-top" alt="...">
//               <div class="card-body">
//                 <h5 class="card-title">${data.Title}</h5>
//                 <h6 class="card-subtitle mb-2 text-body-secondary">${data.Year}</h6>
//                 <a href="#" data-bs-toggle="modal" class="card-link text-decoration-none see-detail"
//                 data-bs-target="#exampleModal" data-id="${data.imdbID}" >See Details</a></div>
//             </div>
//             </div>`);

//           $("#search-input").val("");
//         });
//       } else {
//         $("#movie-list").html(`<h1 class='text-center'>${result.Error}</h1>`);
//       }
//     },
//   });
// }

// $("#search-button").on("click", function () {
//   searchAndResultMovie();
// });

// $("#search-input").on("keyup", function (e) {
//   if (e.keyCode === 13) {
//     searchAndResultMovie();
//   }
// });

// $("#movie-list").on("click", ".see-detail", function () {
//   //   console.info($(this).data("id"));
//   $.ajax({
//     url: "http://www.omdbapi.com",
//     dataType: "json",
//     type: "GET",
//     data: {
//       apikey: "5354abbf",
//       i: $(this).data("id"),
//     },
//     success: function (movie) {
//       if (movie.Response === "True") {
//         $(".modal-body").html(`

//     <div class='container-fluid'>
//     <div class='row'>
//     <div class='col-md-4'>
//         <img src='${movie.Poster}' class='img-fluid'>
//     </div>
//     <div class='col-md-8'>
//         <ul class="list-group">
//             <li class="list-group-item"><h3>${movie.Title}</h3></li>
//             <li class="list-group-item">${movie.Released}</li>

//             <li class="list-group-item">${movie.Genre}</li>

//             <li class="list-group-item">${movie.Plot}</li>

//         </ul>
//     </div>
//     </div>
//     </div>
//     </div>
//                 `);
//       }
//     },
//   });
// });
