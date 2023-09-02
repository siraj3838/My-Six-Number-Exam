const getBtnDataCollect = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const btnData = data.data;
    const allBtn = document.getElementById('receive-btn-data-api');
    btnData.forEach((single) => {
        const div = document.createElement('div');
        div.innerHTML = `
        <button onclick= "btnInfoData('${single.category_id}')" class="btn hover:bg-[#FF1F3D] text-[#252525] hover:text-white bg-gray-400">
        ${single.category}
        </button>
        `;
        allBtn.appendChild(div);
    });
}

const btnInfoData = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
    const btnInfo = data.data;

    if (btnInfo.length === 0) {
        const videoContain = document.getElementById('no-video-con');
        videoContain.textContent = '';
        videoContain.classList.remove('hidden');
        const div = document.createElement('div');
        div.innerHTML = `
        <div>
        <div class="flex justify-center">
        <img src="Icon.png" alt="">
        </div>
        <h2 class="text-center text-4xl text-[#171717] font-bold mt-6">Oops!! Sorry, There is no<br>content here</h2>
        </div>
        `;
        videoContain.appendChild(div);
    } else {
        const videoContain = document.getElementById('no-video-con');
        videoContain.classList.add('hidden');

    }

    const videoContain = document.getElementById('video-con');
    videoContain.textContent = '';
    btnInfo.forEach((singleCard) => {
        const image = singleCard?.authors[0];
        const img = image?.profile_picture;
        const profileName = image?.profile_name;
        const div = document.createElement('div');
        let secondNum = singleCard?.others?.posted_date;
        let hour = Math.floor(secondNum / 60);
        let result = hour / 60;
        let result2 = parseInt(result);
        let resultFloat = parseFloat(result2);
        let minute = secondNum % 60;
        div.innerHTML = `
        <div class="rounded-lg h-[340px] relative">
                    <img class="h-56 w-full rounded-xl" src=${singleCard?.thumbnail}>
                    <p class="absolute bg-[#171717] text-white ml-36 lg:ml-[200px] -mt-8"> ${resultFloat ? resultFloat : ''}<span>${resultFloat ? 'hrs' : ''}</span>${minute ? minute : ''}
                    <span>${minute ? 'min ago' : ''}</span></p>
                    <div class="flex justify-start mt-5 gap-3 items-center">
                        <img class="w-10 h-10 border-2 rounded-3xl" src=${img}>
                        <h3 class="text-base text-[#171717]">
                        ${singleCard?.title}
                        </h3>
                    </div>
                    <div class="flex justify-start ml-[52px] gap-4">
                    <span> ${singleCard.authors[0].profile_name}</span>${singleCard.authors[0].verified ?
                    '<img src="image.logo.svg" alt="" id="logo">' : ''}
                    </div>
                    <p class="text-sm text-[#171717B2] ml-[52px] mt-3">${singleCard?.others?.views
            }</p>
                </div>
        `;
        videoContain.appendChild(div);
    });
};

document.getElementById('qus-ans').addEventListener('click', function (){
    window.location.href = 'qusans.html';
});

getBtnDataCollect();
btnInfoData('1000');