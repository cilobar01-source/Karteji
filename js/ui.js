
// js/ui.js
export function qs(sel, el=document){ return el.querySelector(sel) }
export function qsa(sel, el=document){ return [...el.querySelectorAll(sel)] }

export function setText(el, text){ if(typeof el==='string') el = qs(el); if(el) el.textContent = text }
export function setSrc(el, url){ if(typeof el==='string') el = qs(el); if(el) el.src = url }

export function toast(msg){
  const t = document.createElement('div');
  t.className = 'info-chip';
  t.style.position='fixed'; t.style.right='16px'; t.style.bottom='90px'; t.style.zIndex=20;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(()=> t.remove(), 2200);
}
