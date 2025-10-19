// js/utils.js
export const $  = (sel, el=document)=> el.querySelector(sel);
export const $$ = (sel, el=document)=> [...el.querySelectorAll(sel)];

export function fmtRupiah(n=0){
  return "Rp " + Number(n||0).toLocaleString("id-ID");
}

export function truncate(s, len=150){
  if(!s) return "";
  return s.length>len ? s.slice(0,len)+"..." : s;
}

export function nl2br(s=""){
  return (s||"").replace(/\n/g, "<br>");
}
