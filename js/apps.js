const loadPhone = async (inputText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data, dataLimit);
}

const displayPhone = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phones-container');
    phoneContainer.textContent = '';

    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none')
    }
    else {
        showAll.classList.add('d-none')
    }

    const errorMassege = document.getElementById('error-massege');

    if (phones.length === 0) {
        errorMassege.classList.remove('d-none')
    }
    else {
        errorMassege.classList.add('d-none')
    }

    phones.forEach(phone => {
        console.log(phone)
        const phonediv = document.createElement('div');
        phonediv.classList.add('col');
        phonediv.innerHTML = `
    <div class="card p-4">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${phone.phone_name}</h5>
                  <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            
                  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneModalDetails"  onclick="loadDetails('${phone.slug}')">
                  Show Details
                        </button>
                </div>
              </div>
    `;

        phoneContainer.appendChild(phonediv);
    });
    ToggleSpiner(false);
}


document.getElementById('btn-field').addEventListener('click', function () {
    processData(10);

})

document.getElementById('input-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processData(10);
    }
})

const ToggleSpiner = isloading => {
    const loadSpiner = document.getElementById('spiner');

    if (isloading) {
        loadSpiner.classList.remove('d-none')
    }
    else {
        loadSpiner.classList.add('d-none')
    }
}

const processData = dataLimit => {
    const inputField = document.getElementById('input-field');
    const inputText = inputField.value;
    ToggleSpiner(true);
    loadPhone(inputText, dataLimit);
}

const showAll = document.getElementById('btn-show').addEventListener('click', function () {
    processData()
})

const loadDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url)
    const data = await res.json()
    displayModal(data.data)
}

const displayModal=phone=>{
    console.log(phone)
    const modalDetails=document.getElementById('phoneModalDetailsLabel');
    modalDetails.innerText=phone.name;
    const phoneDetails=document.getElementById('modal-id');
    phoneDetails.innerHTML=`
         <h6>Release-Date:${phone.releaseDate}</h6>   
         <p>Storage:${phone.mainFeatures ? phone.mainFeatures.storage : 'No Storage Found'}</p>
         <p>Display-Size:${phone.mainFeatures ? phone.mainFeatures.displaySize : 'None'}</p>
    
    `
}


loadPhone('iphone')