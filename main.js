/**
 * EXPLORE PEHCEVO - FULL CLEAN JS (FINAL STABLE VERSION)
 */

// =====================
// 1. GASTRO / SMESTUVANJE MODAL
// =====================
window.openModal = function (btn) {
    const modal = document.getElementById('aModal');
    const container = modal?.querySelector('.modal-container');
    if (!modal || !container) return;

    container.classList.remove('activity-mode');

    const d = btn.dataset;

    if (document.getElementById('mCat'))
        document.getElementById('mCat').innerText = "";

    if (document.getElementById('mTitle'))
        document.getElementById('mTitle').innerText = d.title || "";

    if (document.getElementById('mTel'))
        document.getElementById('mTel').innerText = d.tel || "";

    if (document.getElementById('mLoc'))
        document.getElementById('mLoc').innerText = d.loc || "";

    const infoGrid = document.getElementById('dynamic-info');
    if (infoGrid) {
        infoGrid.innerHTML = '';

        const specs = [
            { val: d.cuisine, icon: 'fa-utensils', label: 'Кујна' },
            { val: d.work, icon: 'fa-clock', label: 'Работно време' },
            { val: d.terace, icon: 'fa-sun', label: 'Тераса' },
            { val: d.card, icon: 'fa-credit-card', label: 'Плаќање' },
            { val: d.cap, icon: 'fa-users', label: 'Капацитет' },
            { val: d.park, icon: 'fa-parking', label: 'Паркинг' },
            { val: d.in, icon: 'fa-sign-in-alt', label: 'Пријава' },
            { val: d.out, icon: 'fa-sign-out-alt', label: 'Одјава' }
        ];

        specs.forEach(spec => {
            if (spec.val) {
                infoGrid.innerHTML += `
                    <div class="info-item">
                        <i class="fas ${spec.icon}"></i>
                        <span>${spec.label}</span>
                        <strong>${spec.val}</strong>
                    </div>`;
            }
        });
    }

    const mImg = document.getElementById('mImg');
    const mThumbs = document.getElementById('mThumbs');

    if (d.imgs && mImg) {
        const imgs = d.imgs.split(',');
        mImg.src = imgs[0].trim();

        if (mThumbs) {
            mThumbs.innerHTML = '';

            imgs.forEach((src, idx) => {
                src = src.trim();
                if (!src) return;

                const img = document.createElement('img');
                img.src = src;
                if (idx === 0) img.className = 'active';

                img.onclick = () => {
                    mImg.src = src;
                    mThumbs.querySelectorAll('img').forEach(i => i.classList.remove('active'));
                    img.classList.add('active');
                };

                mThumbs.appendChild(img);
            });
        }
    }

    const resBtn = document.getElementById('resBtn');
    if (resBtn) {
        resBtn.onclick = () => {
            if (d.tel) window.location.href = "tel:" + d.tel;
        };
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
};


// =====================
// 2. ACTIVITIES MODAL
// =====================
window.openActivityModal = function (btn) {
    const modal = document.getElementById('aModal');
    const container = modal?.querySelector('.modal-container');
    if (!modal || !container) return;

    const d = btn.dataset;

    container.classList.add('activity-mode');

    if (document.getElementById('mTitle'))
        document.getElementById('mTitle').innerText = d.title || "";

    const mImg = document.getElementById('mImg');
    if (mImg && d.imgs)
        mImg.src = d.imgs.split(',')[0].trim();

    let descBox = document.getElementById('mDesc');

    if (!descBox) {
        descBox = document.createElement('div');
        descBox.id = 'mDesc';
        descBox.className = 'activity-description';
        modal.querySelector('.modal-right')
            .insertBefore(descBox, document.getElementById('dynamic-info'));
    }

    descBox.innerText = d.desc || "";
    descBox.style.display = "block";

    const infoGrid = document.getElementById('dynamic-info');
    if (infoGrid) {
        infoGrid.innerHTML = `
            <div class="info-item">
                <i class="fas fa-map-marker-alt"></i>
                <span>Локација</span>
                <strong>${d.loc || "/"}</strong>
            </div>
            <div class="info-item">
                <i class="fas fa-tachometer-alt"></i>
                <span>Тежина</span>
                <strong>${d.weight || "/"}</strong>
            </div>
            <div class="info-item">
                <i class="fas fa-calendar-alt"></i>
                <span>Период</span>
                <strong>${d.time || "/"}</strong>
            </div>
            <div class="info-item">
                <i class="fas fa-hiking"></i>
                <span>Опрема</span>
                <strong>${d.gear || "/"}</strong>
            </div>
        `;
    }

    const thumbs = document.getElementById('mThumbs');
    if (thumbs) thumbs.innerHTML = '';

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
};


// =====================
// 3. CLOSE MODAL
// =====================
window.closeModal = function () {
    const modal = document.getElementById('aModal');
    const container = modal?.querySelector('.modal-container');

    if (modal) modal.classList.remove('active');
    if (container) container.classList.remove('activity-mode');

    const descBox = document.getElementById('mDesc');
    if (descBox) descBox.style.display = 'none';

    document.body.style.overflow = 'auto';
};


// =====================
// 4. BURGER MENU
// =====================
document.addEventListener("DOMContentLoaded", () => {
    const burger = document.querySelector(".burger");
    const menu = document.getElementById("navMenu");

    if (burger && menu) {
        burger.onclick = () => {
            burger.classList.toggle("active");
            menu.classList.toggle("active");
        };
    }

    window.onclick = (e) => {
        const modal = document.getElementById('aModal');
        if (e.target === modal) closeModal();
    };
});


// =====================
// 5. SERVICE MODAL (FIXED + NUMBERS RESTORED)
// =====================
const serviceData = {
    'pharmacy': {
        title: 'Локални Аптеки',
        icon: 'img/pharmacy.svg',
        locations: [
            { name: 'Аптека Арника', img: 'img/arnika.jpeg', hours: '08:00 - 21:00', tel: '+389 33 441 676' },
            { name: 'Аптека Зегин', img: 'img/zegin.png', hours: '08:00 - 21:00', tel: '+389 33 413 700' }
        ]
    },
    'market': {
        title: 'Градски Маркети',
        icon: 'img/shopping-cart.svg',
        locations: [
            { name: 'Кит-Го Маркет', img: 'img/kitgo.jpeg', hours: '07:30 - 21:30', tel: '+389 33 555 111' },
            { name: 'Ивел Стојан', img: 'img/ivelstojan.jpeg', hours: '07:00 - 22:00', tel: '+389 33 222 333' }
        ]
    },
    'car': {
        title: 'Авто Сервиси',
        icon: 'img/maintenance.svg',
        locations: [
            { name: 'Автосервис Премиум', img: 'img/ivo.jpg', hours: '08:00 - 17:00', tel: '+389 78 222 431' },
            { name: 'Вулканизер Методи', img: 'img/service2.jpg', hours: '09:00 - 18:00', tel: '+389 71 888 999' }
        ]
    },
    'barber': {
        title: 'Салони',
        icon: 'img/hairdressing-scissors.svg',
        locations: [
            { name: 'BarberShop Gold', img: 'img/gold.jpg', hours: '10:00 - 21:00', tel: '+389 77 677 348' }
        ]
    },
    'atm': {
        title: 'Банкомати',
        icon: 'img/atm.svg',
        locations: [
            { name: 'Стопанска Банка', img: 'img/stopanska.jpeg', hours: '24/7', tel: '+389 33 111 222' },
            { name: 'Комерцијална Банка', img: 'img/atm2.jpg', hours: '24/7', tel: '+389 33 333 444' }
        ]
    },
    'post': {
        title: 'Пошта',
        icon: 'img/envelop.svg',
        locations: [
            { name: 'Македонска Пошта', img: 'img/posta.jpeg', hours: '08:00 - 16:00', tel: '+389 33 441 120' },
            { name: 'Карго Експрес', img: 'img/stajo.jpeg', hours: '09:00 - 17:00', tel: '+389 77 123 456' }
        ]
    }
};

window.openServiceModal = function (type) {
    const data = serviceData[type];
    if (!data) return;

    document.getElementById('modal-category-title').innerHTML = data.title;
    document.getElementById('modal-header-icon').src = data.icon;

    const container = document.getElementById('location-cards-container');
    container.innerHTML = '';

    data.locations.forEach(loc => {
        container.innerHTML += `
            <div class="location-entry-card">
                <div class="loc-img">
                    <img src="${loc.img}">
                </div>
                <div class="loc-content">
                    <h4>${loc.name}</h4>
                    <p><i class="fas fa-clock"></i> Работно време: <strong>${loc.hours}</strong></p>
                    ${loc.tel ? `<p><i class="fas fa-phone"></i> Контакт: <strong>${loc.tel}</strong></p>` : ''}
                </div>
            </div>
        `;
    });

    document.getElementById('service-modal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
};

window.closeServiceModal = function () {
    document.getElementById('service-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
};


// =====================
// 6. TOP LOCATIONS MODAL
// =====================
const topLocationsData = {
    "ravna-reka": {
        type: "Пешачење",
        title: "Равна Река",
        desc: "Прекрасна природна локација...",
        img: "img/ravnareka3.jpg",
        location: "Пехчево",
        diff: "Лесна",
        time: "Пролет - Есен",
        gear: "Патики"
    },
    "vrv-kadiica": {
        type: "Планинарење",
        title: "Врв Кадиица",
        desc: "Еден од најпознатите врвови...",
        img: "img/kadiica.webp",
        location: "Малешевија",
        diff: "Средна",
        time: "Мај - Октомври",
        gear: "Опрема"
    },
    "pehcevski-vodopadi": {
        type: "Природа",
        title: "Водопади",
        desc: "Најпосетена атракција...",
        img: "img/vodopad2.jpeg",
        location: "Пехчево",
        diff: "Лесна",
        time: "Цела година",
        gear: "Обувки"
    }
};

window.openActivity = function (id) {
    const data = topLocationsData[id];
    if (!data) return;

    const modal = document.getElementById("activityModal");
    const container = modal.querySelector(".modal-container");

    container.classList.add("activity-mode");

    document.getElementById("act-img").src = data.img;
    document.getElementById("act-type").textContent = data.type;
    document.getElementById("act-title").textContent = data.title;
    document.getElementById("act-desc").textContent = data.desc;
    document.getElementById("act-location").textContent = data.location;
    document.getElementById("act-diff").textContent = data.diff;
    document.getElementById("act-time").textContent = data.time;
    document.getElementById("act-gear").textContent = data.gear;

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
};

window.closeActivityModal = function () {
    const modal = document.getElementById("activityModal");
    const container = modal.querySelector(".modal-container");

    modal.classList.remove("active");
    container.classList.remove("activity-mode");

    document.body.style.overflow = "auto";
};