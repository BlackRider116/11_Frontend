!function(t){var e={};function n(o){if(e[o])return e[o].exports;var a=e[o]={i:o,l:!1,exports:{}};return t[o].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)n.d(o,a,function(e){return t[e]}.bind(null,a));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);n(1)},function(t,e){const n="https://backend-dz11.herokuapp.com";let o=0,a=0;const i=document.getElementById("root"),s=document.createElement("form");s.innerHTML='\n<div class="input-group">\n  <input type="text" class="form-control" placeholder="Введите текст" data-id="link">\n  <div class="input-group-append" id="button-addon4">\n    <input type="hidden" name="type">\n    <input type="hidden" name="url">\n    <input data-id="files" type="file" name="media" style="visibility: hidden; opacity: 0.0001; height: 1px; width: 1px;">\n    <button data-action="upload" class="btn btn-outline-secondary" type="button">Загрузить</button>\n    <button data-id="record" class="btn btn-outline-secondary" type="button">Записать</button>\n    <button data-id="send" class="btn btn-outline-primary" type="button">Добавить</button>\n  </div>\n</div>\n',i.appendChild(s);const r=document.createElement("button");r.className="btn btn-primary btn-block mt-1",r.textContent="Показать новые записи",r.style.display="none",r.addEventListener("click",t=>{t.preventDefault(),fetch(`${n}/posts/${o}`).then(t=>{if(!t.ok)throw new Error(t.statusText);return t.json()}).then((function(t){o=0,f(y,t,1),r.style.display="none"})).catch(t=>{console.log(t)})}),i.appendChild(r);const d=document.querySelector("[data-id=send]"),l=s.querySelector("[data-id=link]");l.value=localStorage.getItem("content"),l.addEventListener("input",t=>{localStorage.setItem("content",t.currentTarget.value)});const c=document.querySelector("[data-action=upload]"),u=document.querySelector("input[name=type]"),p=document.querySelector("input[name=url]"),b=document.querySelector("[data-id=files]");c.addEventListener("click",t=>{b.dispatchEvent(new MouseEvent("click"))}),b.addEventListener("change",t=>{t.preventDefault(),h.disabled=!0;const[e]=Array.from(t.currentTarget.files),o=new FormData;o.append("media",e),d.disabled=!0,fetch(`${n}/upload`,{method:"POST",body:o}).then(t=>{if(!t.ok)throw new Error(t.statusText);return t.json()}).then(t=>{const e=`${n}/static/${t.name}`;p.value=e,u.value=t.types}).catch(t=>{console.log(t)}).finally(()=>{d.disabled=!1})});const h=s.querySelector("[data-id=record]");h.addEventListener("click",(function(t){if(t.preventDefault(),!navigator.mediaDevices){const t=document.createElement("div");return t.textContent="Your browser not support media! Use Yande Browser.",void document.body.appendChild(t)}if(!window.MediaRecorder){const t=document.createElement("div");return t.textContent="Your browser not media recordering! Use Yande Browser.",void document.body.appendChild(t)}navigator.mediaDevices.getUserMedia({audio:!0,video:!0}).then(t=>{d.disabled=!0,c.disabled=!0;const e=new MediaRecorder(t,{mediaType:"video/webm"}),o=[];e.addEventListener("dataavailable",t=>{o.push(t.data)}),e.addEventListener("stop",e=>{t.getTracks().forEach(t=>t.stop());const a=new Blob(o),i=new FormData;i.append("media",a),fetch(`${n}/upload`,{method:"POST",body:i}).then(t=>{if(!t.ok)throw new Error(t.statusText);return t.json()}).then(t=>{const e=`${n}/static/${t.name}`;p.value=e,u.value=t.types,d.disabled=!1}).catch(t=>{console.log(t)})}),e.start(),setTimeout(()=>{e.stop()},1e4)}).catch(t=>{console.log(t)})})),s.querySelector("[data-id=send]").addEventListener("click",(function(t){t.preventDefault();const e={id:0,content:l.value,type:u.value,file:p.value};fetch(`${n}/posts`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then(t=>{if(!t.ok)throw new Error(t.statusText);return t.json()}).then(t=>{l.value="",u.value="",p.value="",b.value="",c.disabled=!1,h.disabled=!1,localStorage.clear(),o=t.id,f(y,Array(t),1)}).catch(t=>{console.log(t)})}));const y=document.createElement("div");function f(t,e,o){for(let i of e){const e=document.createElement("li");e.className="card mb-2",e.innerHTML=""===(a=i).type?`\n        <div class="card-body">\n            <p style='font-size:20px'>${a.content}</p>\n            <button class="btn" data-id="likes">♡ ${a.likes}</button>\n            <button class="btn btn-primary" data-action="like">👍</button>\n            <button class="btn btn-danger" data-action="dislike">👎</button>\n            <button class="btn btn-light" data-action="delete">Удалить пост</button>\n            \n        </div>\n    `:"image"===a.type?`\n        <img src="${a.file}" class="card-img-top"></img>\n        <div class="card-body">\n            <p style='font-size:20px'>${a.content}</p>\n            <button class="btn" data-id="likes">♡ ${a.likes}</button>\n            <button class="btn btn-primary" data-action="like">👍</button>\n            <button class="btn btn-danger" data-action="dislike">👎</button>\n            <button class="btn btn-light" data-action="delete">Удалить пост</button>\n            \n        </div>\n    `:"audio"===a.type?`\n        <audio src="${a.file}" class="card-img-top" controls></audio>\n        <div class="card-body">\n            <p style='font-size:20px'>${a.content}</p>\n            <button class="btn" data-id="likes">♡ ${a.likes}</button>\n            <button class="btn btn-primary" data-action="like">👍</button>\n            <button class="btn btn-danger" data-action="dislike">👎</button>\n            <button class="btn btn-light" data-action="delete">Удалить пост</button>\n            \n        </div>\n    `:"video"===a.type?`\n        <video src="${a.file}" width="960" height="540" class="embed-responsive embed-responsive-16by9 card-img-top" controls></video>\n        <div class="card-body">\n            <p style='font-size:20px'>${a.content}</p>\n            <button class="btn" data-id="likes">♡ ${a.likes}</button>\n            <button class="btn btn-primary" data-action="like">👍</button>\n            <button class="btn btn-danger" data-action="dislike">👎</button>\n            <button class="btn btn-light" data-action="delete">Удалить пост</button>\n            \n        </div>\n    `:void 0,e.querySelector("[data-action=delete]").addEventListener("click",(function(){fetch(`${n}/posts/${i.id}`,{method:"DELETE"}).then(t=>{if(!t.ok)throw new Error(t.statusText);return t.json()}).then(n=>{t.removeChild(e)}).catch(t=>{console.log(t)})})),e.querySelector("[data-action=like]").addEventListener("click",(function(t){t.preventDefault(),fetch(`${n}/posts/${i.id}/likes`,{method:"POST"}).then(t=>{if(!t.ok)throw new Error(t.statusText);return t.json()}).then(t=>{e.querySelector("[data-id=likes]").textContent=`♡ ${t.likes}`}).catch(t=>{console.log(t)})})),e.querySelector("[data-action=dislike]").addEventListener("click",(function(t){t.preventDefault(),fetch(`${n}/posts/${i.id}/likes`,{method:"DELETE"}).then(t=>{if(!t.ok)throw new Error(t.statusText);return t.json()}).then(t=>{e.querySelector("[data-id=likes]").textContent=`♡ ${t.likes}`}).catch(t=>{console.log(t)})})),1===o?t.insertBefore(e,t.firstElementChild):t.appendChild(e)}var a}i.appendChild(y),fetch(`${n}/posts/seenPosts/${a}`).then(t=>{if(!t.ok)throw new Error(t.statusText);return t.json()}).then((function(t){0!==t.length&&(t.length>=5&&(a=t[t.length-5].id,m.style.display="block"),f(y,t.reverse()))})).catch(t=>{console.log(t)});const m=document.createElement("button");m.className="btn btn-primary btn-block mt-1",m.textContent="Показать еще посты",m.style.display="none",m.addEventListener("click",(function(t){t.preventDefault(),fetch(`${n}/posts/seenPosts/${a}`).then(t=>{if(!t.ok)throw new Error(t.statusText);return t.json()}).then((function(t){0===t.length?m.style.display="none":(t.length<5?(a=t[t.length-1].id,m.style.display="none"):(a=t[t.length-5].id,m.style.display="block"),f(y,t.reverse()))})).catch(t=>{console.log(t)})})),i.appendChild(m),setInterval(()=>{fetch(`${n}/posts/${o}`).then(t=>{if(!t.ok)throw new Error(t.statusText);return t.json()}).then((function(t){0===t.length?(console.log("Новых постов нет"),r.style.display="none"):0===o?(o=t[t.length-1].id,r.style.display="none"):r.style.display="block"})).catch(t=>{console.log(t)})},3e3)}]);