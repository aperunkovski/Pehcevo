/**
 * EXPLORE PEHCEVO - Full Clean JS
 */

// --- 1. МОДАЛ ЗА ГАСТРОНОМИЈА И СМЕСТУВАЊЕ ---
window.openModal = function(btn) {
    const modal = document.getElementById('aModal');
    const container = modal ? modal.querySelector('.modal-container') : null;
    if (!modal || !container) return;

    container.classList.remove('activity-mode'); 
    const d = btn.dataset;

    // Пополнување основни податоци
    if (document.getElementById('mCat'))   document.getElementById('mCat').innerText = ""; 
    if (document.getElementById('mTitle')) document.getElementById('mTitle').innerText = d.title || "";
    if (document.getElementById('mTel'))   document.getElementById('mTel').innerText = d.tel || "";
    if (document.getElementById('mLoc'))   document.getElementById('mLoc').innerText = d.loc || "";

    // Инфо картички (Гастрономија / Сместување)
    const infoGrid = document.getElementById('dynamic-info');
    if (infoGrid) {
        infoGrid.innerHTML = ''; 
        const specs = [
            { val: d.cuisine, icon: 'fa-utensils', label: 'Кујна' },
            { val: d.work,    icon: 'fa-clock',    label: 'Работно време' },
            { val: d.terace,  icon: 'fa-sun',      label: 'Тераса' },
            { val: d.card,    icon: 'fa-credit-card', label: 'Плаќање' },
            { val: d.cap,     icon: 'fa-users',    label: 'Капацитет' },
            { val: d.park,    icon: 'fa-parking',  label: 'Паркинг' },
            { val: d.in,      icon: 'fa-sign-in-alt', label: 'Пријава' },
            { val: d.out,     icon: 'fa-sign-out-alt', label: 'Одјава' }
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

    // --- ГАЛЕРИЈА: Главна слика и Мали сликички (Фикс за црното место) ---
    const mImg = document.getElementById('mImg');
    const mThumbs = document.getElementById('mThumbs');

    if (d.imgs && mImg) {
        const imgs = d.imgs.split(','); // Ги делиме сликите по запирка
        mImg.src = imgs[0].trim();      // Првата оди како главна

        if (mThumbs) {
            mThumbs.innerHTML = ''; // Го чистиме гридот за да нема стари слики
            imgs.forEach((src, idx) => {
                if(src.trim() !== "") {
                    const thumb = document.createElement('img');
                    thumb.src = src.trim();
                    if (idx === 0) thumb.className = 'active';
                    
                    // Клик на мала слика ја менува главната
                    thumb.onclick = () => {
                        mImg.src = src.trim();
                        mThumbs.querySelectorAll('img').forEach(t => t.classList.remove('active'));
                        thumb.classList.add('active');
                    };
                    mThumbs.appendChild(thumb);
                }
            });
        }
    }

    const resBtn = document.getElementById('resBtn');
    if (resBtn) {
        resBtn.onclick = () => { if(d.tel) window.location.href = "tel:" + d.tel; };
        const btnSpan = resBtn.querySelector('span');
        if (btnSpan) btnSpan.innerText = "РЕЗЕРВИРАЈ";
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

// --- 2. МОДАЛ ЗА АКТИВНОСТИ ---
window.openActivityModal = function(btn) {
    const modal = document.getElementById('aModal');
    const container = modal ? modal.querySelector('.modal-container') : null;
    if (!modal || !container) return;

    const d = btn.dataset;
    container.classList.add('activity-mode'); 

    if (document.getElementById('mTitle')) document.getElementById('mTitle').innerText = d.title || "";
    
    const mImg = document.getElementById('mImg');
    if (mImg && d.imgs) mImg.src = d.imgs.split(',')[0].trim();

    // Опис за активности
    let descBox = document.getElementById('mDesc');
    if (!descBox) {
        descBox = document.createElement('div');
        descBox.id = 'mDesc';
        descBox.className = 'activity-description';
        modal.querySelector('.modal-right').insertBefore(descBox, document.getElementById('dynamic-info'));
    }
    descBox.innerText = d.desc || "";
    descBox.style.display = "block";

    // Инфо картички за активности
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

    // Скриј ги thumbs кај активностите (бидејќи таму сликата е 100% висина)
    if (document.getElementById('mThumbs')) document.getElementById('mThumbs').innerHTML = '';

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

// --- 3. ЗАЕДНИЧКИ ФУНКЦИИ ---
window.closeModal = function() {
    const modal = document.getElementById('aModal');
    const container = modal ? modal.querySelector('.modal-container') : null;
    if (modal) modal.classList.remove('active');
    if (container) container.classList.remove('activity-mode');
    
    const descBox = document.getElementById('mDesc');
    if (descBox) descBox.style.display = 'none';
    
    document.body.style.overflow = 'auto';
};

document.addEventListener("DOMContentLoaded", () => {
    // Burger Menu
    const burger = document.querySelector(".burger");
    const menu = document.getElementById("navMenu");
    if (burger && menu) {
        burger.onclick = () => {
            burger.classList.toggle("active");
            menu.classList.toggle("active");
        };
    }
    
    // Затвори на клик надвор од модалот
    window.onclick = (e) => { if (e.target.id === 'aModal') closeModal(); };
});



















