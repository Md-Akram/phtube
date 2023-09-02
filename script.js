const tabs = document.getElementById('tabs')
const cards = document.getElementById('cards')
const errorContainer = document.getElementById('error-container')
let dataArr
let idOfCategory

const fetchTabs = () => {
    fetch('https://openapi.programming-hero.com/api/videos/categories')
        .then(res => res.json())
        .then(data => data.data.map((obj) =>
            tabs.innerHTML += `
        <button class="tab btn rounded m-1" id='${obj.category_id}' onclick="fetchData(${obj.category_id})">${obj.category}</button>
        `
        ))
}

const fetchData = (id) => {
    fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
        .then(res => res.json())
        .then((data) => {
            dataArr = data.data
            showData(dataArr)
        }
        )
    idOfCategory = id
}

const showData = (arr) => {
    cards.innerHTML = ''
    errorContainer.innerHTML = ''
    if (arr.length) {
        arr.map((obj) => {
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
                    <div><span class="views font-normal" >${obj.others.views}</span><span> views</span></div>
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
    changeBtnColor(idOfCategory)
}

const sortByView = () => {
    dataArr.sort((a, b) => {
        const viewsOfA = parseViews(a.others.views)
        const viewsOfB = parseViews(b.others.views)
        return viewsOfB - viewsOfA
    })
    showData(dataArr)
}

const parseViews = (str) => {
    let num = parseFloat(str.replace('k', '')) * 1000
    return num
}

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

const changeBtnColor = (id) => {
    document.querySelectorAll('.tab').forEach(element => {
        element.classList.remove('text-white', 'bg-red-500')
    });
    document.getElementById(id).classList.add('text-white', 'bg-red-500')
}

fetchTabs()
fetchData(1000)
