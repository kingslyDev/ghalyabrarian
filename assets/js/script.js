function toggleMenu() {
  const menu = document.querySelector('.menu-links');
  const icon = document.querySelector('.hamburger-icon');
  menu.classList.toggle('open');
  icon.classList.toggle('open');
}

function scrollTimeline(direction){
  const tl=document.getElementById('timeline'); if(!tl) return;
  const card=tl.querySelector('.timeline-item');
  const gap = parseFloat(getComputedStyle(tl).gap) || 32;
  const step = card ? card.getBoundingClientRect().width + gap : 320;
  tl.scrollBy({ left: direction*step, behavior: 'smooth'});
}

(function initDragScroll(){
  const tl=document.getElementById('timeline'); if(!tl) return;
  let isDown=false,startX,scrollLeft,velocity=0,frame;
  const momentum=()=>{ tl.scrollLeft+=velocity; velocity*=0.95; if(Math.abs(velocity)>0.5) frame=requestAnimationFrame(momentum); };
  const end=()=>{ if(!isDown) return; isDown=false; tl.classList.remove('dragging'); cancelAnimationFrame(frame); momentum(); };
  tl.addEventListener('mousedown',e=>{ isDown=true; tl.classList.add('dragging'); startX=e.pageX - tl.offsetLeft; scrollLeft=tl.scrollLeft; cancelAnimationFrame(frame); });
  tl.addEventListener('mouseleave',end);
  tl.addEventListener('mouseup',end);
  tl.addEventListener('mousemove',e=>{ if(!isDown) return; e.preventDefault(); const x=e.pageX - tl.offsetLeft; const walk=(x-startX); tl.scrollLeft=scrollLeft - walk; velocity=-(walk - (x-startX))*0.2; });
})();

document.addEventListener('DOMContentLoaded',()=>{
  const hint=document.querySelector('.swipe-hint');
  const tl=document.getElementById('timeline');
  if(!hint||!tl) return;
  const hide=()=>{ hint.style.opacity='0'; hint.style.transform='translateY(6px)'; setTimeout(()=> hint && hint.remove(),600); tl.removeEventListener('scroll',hide); };
  tl.addEventListener('scroll',hide,{passive:true});
  setTimeout(hide,6000);
});
