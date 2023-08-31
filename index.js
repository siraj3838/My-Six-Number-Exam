const getBtnDataCollect = async () =>{
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const btnData = data.data
    const allBtn = document.getElementById('receive-btn-data-api');
    btnData.forEach((single) =>{
        const div = document.createElement('div');
        div.innerHTML = `
        <button onclick= "btnInfoData('${single.category_id}')" class="btn bg-[#FF1F3D] text-[#252525] hover:text-white hover:bg-gray-400">
        ${single.category}
        </button>
        `;
        allBtn.appendChild(div)
    })
}

const btnInfoData = async (id) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
    const btnInfo = data.data
    console.log(data)
    
    const videoContain = document.getElementById('video-con');
    videoContain.textContent = '';
    btnInfo.forEach((singleCard) =>{
        console.log(singleCard)
        const image = singleCard?.authors[0];
        const img = image?.profile_picture;
        const profileName = image?.profile_name;
        const div = document.createElement('div');

        
        div.innerHTML = `
        <div class="rounded-lg h-[340px]">
                    <img class="h-56 w-full rounded-xl" src=${singleCard?.thumbnail}>
                    <div class="flex justify-start mt-5 gap-3 items-center">
                        <img class="w-10 h-10 border-2 rounded-3xl" src=${img}>
                        <h3 class="text-base text-[#171717]">
                        ${singleCard?.title}
                        </h3>
                    </div>
                    <div class="flex gap-3 ml-12">
                        <p class="text-sm text-[#171717B2] my-3">
                        ${profileName}
                        </p>
                        <img class="" src="icon/icon.svg" alt="">
                    </div>
                    <p class="text-sm text-[#171717B2] ml-12">${singleCard?.others?.views
                    }</p>
                </div>
        `;
        videoContain.appendChild(div);
    })
}
getBtnDataCollect();
btnInfoData('1000')