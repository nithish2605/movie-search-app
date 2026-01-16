    //getting the elements
    let card_wrapper = document.querySelector('.card-wrapper');
    let input_field = document.querySelector('#movie-name');
    let Search_btn = document.querySelector('#search-btn');
    let loader = document.querySelector('#loader');
    let get_user_input = "";
    input_field.value ="";

    //getting the user input
    input_field.addEventListener('input', () => {
        get_user_input = input_field.value.trim();
        console.log(get_user_input);
    });

    input_field.addEventListener('keydown',(e)=>{
        if(e.key === "Enter") Search_btn.click();

    });

    //Fetching from API
    Search_btn.addEventListener('click', async (e) => {
        card_wrapper.innerHTML = "";
        e.preventDefault();

        if (!get_user_input) {
            return alert("please enter movie name first ");
        }

        loader.classList.remove('d-none');
    

        try {
            const response = await fetch(`http://www.omdbapi.com/?s=${get_user_input}&apikey=b25a9959`);
            const data = await response.json();

            if (data.Response === "False") {
                return card_wrapper.innerHTML = `<p class="text-center fw-bold display-5">Movie Not Found </p>`
            }

            data.Search.map(movie => {
                const Poster = movie.Poster!=="N/A"?movie.Poster : "https://via.placeholder.com/300x450?text=No+Image";
                
                card_wrapper.innerHTML += `<div class="col-md-4 col-6">
                    <div class="card shadow">
                        <img src='${Poster}' class="card-img-top poster-img" alt="movie-poster">
                        <div class="card-body">
                            <h5 class="fw-bold">${movie.Title}</h5>
                            <p class="m-0 fw-bold">Rleased Year :- ${movie.Year}</p>
                        </div>
                    </div>
                </div>`;
            });
        }

        catch (error) {
            console.log(error);
        }

        finally {
                loader.classList.add('d-none');
        }
    });





