const fragranceContainer = document.querySelector('#fragrance-container')
const form = document.querySelector('form')

const baseURL = 'http://localhost:4004/api/fragrances'

const fragranceCallback = ({data: fragrances}) => displayFragrances(fragrances)
const errCallback = err => console.log(err.response.data);

// axios requests
const getAllFragrances = () => axios.get(baseURL).then(fragranceCallback).catch(errCallback)
const createFragrance = body => axios.post(baseURL, body).then(fragranceCallback).catch(errCallback)
const updateFragrance = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(fragranceCallback).catch(errCallback)
const deleteFragrance = id => axios.delete(`${baseURL}/${id}`).then(fragranceCallback).catch(errCallback)

// functions
function submitHandler(e) {
    e.preventDefault()

    let fragranceName = document.querySelector('#fragranceName')
    let rating = document.querySelector('input[name="ratings"]:checked')
    let imageURL = document.querySelector('#img')

    let bodyObj = {
        fragranceName: fragranceName.value,
        rating: rating.value,
        imageURL: imageURL.value
    }

    createFragrance(bodyObj)
    fragranceName.value = ''
    rating.checked = false
    imageURL.value = ''
}

function createFragranceCard(fragrance) {
    const fragranceCard = document.createElement('div')
    fragranceCard.classList.add('fragrance-card')

    fragranceCard.innerHTML = `<img alt='fragrance cover' src=${fragrance.imageURL} class="fragrance-cover" />
    <p class="fragrance-title">${fragrance.fragranceName}</p>
    <div class="btns-container">
        <button onclick="updateFragrance(${fragrance.id}, 'minus')">-</button>
        <p class="fragrance-rating">${fragrance.rating} stars</p>
        <button onclick="updateFragrance(${fragrance.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteFragrance(${fragrance.id})">Remove</button>
    `

    fragranceContainer.appendChild(fragranceCard)
}

function displayFragrances(arr) {
    fragranceContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createFragranceCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

getAllFragrances()