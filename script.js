const tabs = document.getElementById('tabs')
const cards = document.getElementById('cards')
const errorContainer = document.getElementById('error-container')


const fetchTabs = () => {
    fetch('https://openapi.programming-hero.com/api/videos/categories')
        .then(res => res.json())
        .then(data => data.data.map((obj) =>
            tabs.innerHTML += `
        <button class="btn rounded m-2" onclick="fetchData(${obj.category_id})">${obj.category}</button>
        `
        ))
}

const fetchData = (id) => {
    fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
        .then(res => res.json())
        .then((data) => {
            cards.innerHTML = ''
            errorContainer.innerHTML = ''
            if (data.status) {
                data.data.map((obj) => {
                    const calculateTime = (sec) => {
                        const postedTimestamp = sec;
                        const postedDate = new Date(postedTimestamp * 1000);

                        const currentDate = new Date();
                        const timeDifference = new Date(currentDate - postedDate);

                        const hr = timeDifference.getHours();
                        const min = timeDifference.getMinutes();
                        const seconds = timeDifference.getSeconds();
                        return `${hr}hrs ${min}mins ${seconds}secs ago`
                    }

                    cards.innerHTML += `
            <div class="card card-compact w-90 md:w-full bg-base-100 shadow-xl ">
            <figure class="h-1/2 relative">
                <img class="w-full h-full" src='${obj.thumbnail}'
                    alt="${obj.title}" />
                <div class="uploaded-at absolute bottom-4 right-4 bg-slate-800  rounded ">
                    ${obj.others.posted_date ? `<small class="text-white p-2">${calculateTime(obj.others.posted_date)
                            }</small>` : ''}
                </div>
            </figure>
            <div class="card-body flex flex-row items-start justify-start gap-4">
                <div class="left">
                    <div class="author-img">
                        <img class="w-10 h-10 rounded-full"
                            src='${obj.authors[0].profile_picture}'
                            alt="">
                    </div>
                </div>

                <div class="right">
                    <h2 class="card-title text-black">${obj.title}</h2>
                    <p class="author-name font-normal ">${obj.authors[0].profile_name} ${obj.authors[0].verified ? `<span class="mx-1"><i class="fa-solid fa-circle-check text-blue-700"></i></span>` : ''}</p>
                    <p class="views font-normal" >${obj.others.views}</p>
                </div>



            </div>
        </div>
            `
                })
            } else {
                errorContainer.innerHTML = `
                <img src="./Icon.png" class="w-90 h-90">
        <h1 class="text-4xl font-bold text-black">Ooops!!Sorry, There is no content here</h1>
                `
            }
        })
}

const sortByView = () => {
    const allCards = document.querySelectorAll('.card')
    allCards.forEach(card => {
        const views = card.querySelector('.views').innerText
        console.log(views, typeof views);
    })
}

fetchTabs()
fetchData(1000)

// ${obj.others.posted_date ? <small class="text-white p-2">${obj.others.posted_date}</small> : ''}