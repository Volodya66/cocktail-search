import{g as f,a as p,b as I,c as L,s as B,d as q,e as M,f as R}from"./favor-cockt-84ec8be7.js";const w=document.querySelectorAll('a[href^="#"]');for(let t of w)t.addEventListener("click",function(e){e.preventDefault();const o=t.hasAttribute("href")?t.getAttribute("href"):"body";document.querySelector(o).scrollIntoView({behavior:"smooth",block:"start"})});const _=document.querySelector(".container-letters"),N="ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",E=N.split("");let k;addEventListener("resize",T);function T(){document.documentElement.clientWidth>=768?k||x():k!==!1&&F()}function x(){const t=E.map(e=>`<button class="buton-letters">${e}</button>`);_.innerHTML=t.join(""),k=!0}function F(){const t=document.createElement("select");t.classList.add("letters-select");const e=E.map(o=>`<option value="${o}">${o}</option>;`);t.insertAdjacentHTML("beforeend",e.join("")),_.innerHTML="",_.appendChild(t),k=!1}T();const U=document.querySelector(".cocktails__list");U.addEventListener("click",P);const d=document.querySelector(".modal-button-favorite");function H(t){const e=document.querySelector(".js-modal-cocktails-item"),o=e.getAttribute("id"),s=document.querySelector(`[data-cocktId = "${o}"]`);if(L(o,"modalCocktail")){d.textContent="Remove from favorite";let a=f();a=a.filter(m=>m.id!==o),p(a),s.classList.add("add_favorites_js"),s.classList.remove("remove_favorites_js"),d.textContent="Add to favorite";return}else{d.textContent="Add to favorite",f();const a=e;if(a){const h={id:a.getAttribute("id"),name:a.querySelector(".modal-cocktails-card-title").textContent,description:a.querySelector(".modal-cocktail-item-description").textContent,imageSrc:a.querySelector(".modal-cocktails-img").src};let r=f();r.some(i=>i.id===h.id)||(r.push(h),p(r))}s.classList.remove("add_favorites_js"),s.classList.add("remove_favorites_js"),d.textContent="Remove from favorite";return}}function P(t){const e=t.target;if(e.classList.contains("learnmore__btn")&&d.addEventListener("click",H),!!e.classList.contains("svg__btn")){if(e.classList.contains("remove_favorites_js")){e.classList.add("add_favorites_js"),e.classList.remove("remove_favorites_js");const s=e.closest(".cocktails__item").getAttribute("id");let c=f();c=c.filter(a=>a.id!==s),p(c);return}I(t),e.classList.remove("add_favorites_js"),e.classList.add("remove_favorites_js")}}function v(t,e){e.innerHTML=t.map(o=>`
<li class="cocktails__item change-theme" id = ${o._id}>
<img class="cocktails__item__img" loading="lazy" src=${o.drinkThumb} alt=${o.drink}>
<h3 class="cocktails__item__header">${o.drink}</h3>
<p class="cocktails__item__description">${o.description}</p>
<div class="cocktails__btn__container">
<button type="button" class="learnmore__btn"  data-modal-open="modal-cocktails" data-id="${o._id}">learn more</button>
<button type="button" data-cocktId = "${o._id}"  class="svg__btn  ${L(o._id,"favorites")}"> 
 <svg class="svg-heart">
<use class="cocktails__svg add_favorites_js" href="${B}#icon-heart"></use>
</svg>
</button>
</div> 
</li>
`).join("")}const W="https://drinkify.b.goit.study/api/v1";function y(){return document.documentElement.clientWidth>1280?9:8}function D(){if(document.documentElement.clientWidth)return O(y()).then(e=>{const o=document.querySelector(".cocktails__list");v(e,o)}).catch(e=>{console.error(e.message)})}D();async function O(t){try{return(await q.get(`${W}/cocktails/?r=${t}`)).data}catch{console.error(error.message)}}const z=document.querySelector(".cocktails__list");function C(t){try{return fetch(`https://drinkify.b.goit.study/api/v1/cocktails/search/?${t}`).then(e=>e.json())}catch{document.querySelector(".search__title").classList.add("visually-hidden"),M(z)}}const V="https://drinkify.b.goit.study/api/v1",G=document.querySelectorAll("[data-modal-close]"),J=document.querySelector(".cocktails__list");function K(t){function e(o){if(o.target.nodeName!=="BUTTON"||!o.target.dataset.id)return;const s=o.target.dataset.modalOpen,c=o.target.dataset.id,a=document.getElementById(s);Q(a,c)}t.addEventListener("click",e)}K(J);G.forEach(t=>{t.addEventListener("click",()=>{const e=t.closest("[data-modal]");X(e)})});function Q(t,e){t.classList.remove("is-hidden"),Y(e)}function X(t){t.classList.add("is-hidden")}async function Y(t){return Z(t).then(e=>{const o=document.querySelector(".js-modal-cocktails");tt(e,o),document.querySelector(".list-cocktail-ingredients").addEventListener("click",R)}).catch(e=>{console.error(e.message)})}async function Z(t){try{return(await q.get(`${V}/cocktails/lookup/?id=${t}`)).data}catch{console.error(error.message)}}function tt(t,e){const o=[],s=[];t[0].ingredients.forEach(i=>{i.measure===void 0&&(i.measure=""),o.push(i.measure+" "+i.title),s.push(i.ingredientId)}),e.innerHTML=t.map(i=>`
        <li class="js-modal-cocktails-item" id="${i._id}">
        <ul class="modal-cocktails-card-part-1 list">
          <li class="modal-cocktails-card-item">
            <div class="modal-cocktails-img-wrapper">
              <img
                class="modal-cocktails-img"
                src="${i.drinkThumb}"
                alt="${i.drink}"
                loading="lazy"
              />
            </div>
          </li>
          <li class="modal-cocktails-card-item">
            <h2 class="modal-cocktails-card-title">${i.drink}</h2>
            <h2 class="modal-cocktails-info-part-title">INGREDIENTS:</h2>
            <p class="visually-hidden modal-cocktail-item-description">${i.description}</p>
            <p class="modal-cocktails-info-part-undotitle">Per cocktail</p>
            <ul class="modal-cocktails-info-part-1-list list-cocktail-ingredients">
            </ul>
          </li>
        </ul>
        <div class="modal-cocktails-card-part-2">
          <h2 class="modal-cocktails-info-part-title">INSTRUCTIONS:</h2>
          <p class="modal-cocktails-info-part-2-text">${i.instructions}</p>
        </div>
        </li>
      `).join("");const c=document.querySelector(".modal-button-favorite"),m=document.querySelector(".js-modal-cocktails-item").getAttribute("id");L(m,"modalCocktail")?c.textContent="Remove from favorite":c.textContent="Add to favorite";const r=document.querySelector(".modal-cocktails-info-part-1-list");for(let i=0;i<o.length;i++)r.insertAdjacentHTML("afterbegin",`<li class="list-cocktail-ingredients-item" id=${s[i]}>${o[i]}</li>`)}const g=y(),j=document.querySelector(".cocktails__list");let u=[];function et(t,e,o){let s=1;for(u=[],s=0;s<Math.ceil(t.length/g);s+=1){const c=t.slice(s*g,(s+1)*g);u.push(c)}v(u[0],j),st(u,e)}function ot(t){t.target.nodeName==="BUTTON"&&v(u[t.target.textContent-1],j)}function st(t,e,o){let s=[];for(let c=0;c<=t.length-1;c+=1)s.push(`<button class="js-pagination-btn" type="button" id="js-pagination-btn">${c+1}</button>`);e.innerHTML=s.join(""),e.addEventListener("click",ot)}const it=document.querySelector(".search-form"),b=document.querySelector(".search-input"),A=document.querySelector(".container-letters"),ct=document.querySelector(".cocktails__list"),l=document.querySelector("#pagination-elements"),at=document.querySelector(".search__title"),$=y();A.addEventListener("click",rt);A.addEventListener("change",lt);it.addEventListener("submit",nt);async function S(t){if(!t){l.innerHTML="";return}t.length>$?(at.innerHTML="Searching results",l.classList.remove("visually-hidden"),et(t,l)):t.length<=$&&(l.classList.add("visually-hidden"),l.innerHTML="",v(t,ct))}async function nt(t){t.preventDefault();const e=b.value.trim();if(b.value="",e){const o=await C(`s=${e}`);S(o)}}let n=[];async function rt(t){if(t.target.tagName==="BUTTON"){const e=await C(`f=${t.target.innerText}`);n.length===0?(n.push(t.target),n[0].classList.toggle("active")):(n[0].classList.toggle("active"),n=[],n.push(t.target),n[0].classList.toggle("active")),S(e)}}async function lt(t){if(t.target.tagName==="SELECT"){const e=await C(`f=${t.target.value}`);S(e)}}
