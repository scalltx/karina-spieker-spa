// Business details are centralized. Do not activate unverified contact data.
const BUSINESS = { whatsapp: '5547988083322', instagram: 'https://www.instagram.com/karina.spieker/', address: 'Rua Diringshofen, 121 — Anita Garibaldi, Joinville, SC', mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Karina%20Spieker%20Massoterapia%20e%20SPA&query_place_id=ChIJzRRy90Cx3pQRK5o9u7I2WE8', googleReviewsUrl: 'https://www.google.com/maps/search/?api=1&query=Karina%20Spieker%20Massoterapia%20e%20SPA&query_place_id=ChIJzRRy90Cx3pQRK5o9u7I2WE8' };
const services = [
['Day SPA','Uma experiência para desacelerar e abrir espaço para o autocuidado.','50%'],
['Massagem relaxante','Toques suaves e um convite para descansar o corpo e a mente.','75%'],
['Para gestantes','Cuidado com avaliação individual e orientações adequadas ao período gestacional.','35%'],
['Thai Massagem','Uma abordagem corporal que combina movimentos e alongamentos.','40%'],
['Liberação miofascial','Uma técnica de trabalho manual dos tecidos, definida conforme avaliação.','55%'],
['Auriculoterapia','Uma abordagem que utiliza pontos na região da orelha. Saiba mais no atendimento.','85%']
];
function contactLink(service){return BUSINESS.whatsapp ? `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(service ? `Olá! Vim pelo site e gostaria de saber mais sobre ${service}.` : 'Olá! Vim pelo site e gostaria de saber mais sobre as experiências de SPA e massoterapia.')}` : BUSINESS.instagram}
document.querySelector('#services').innerHTML=services.map(([name,description,position],i)=>`<article class="service reveal"><div class="service-photo"><img src="assets/hero-complete.png" loading="lazy" alt="Fotografia ilustrativa de massagem; não retrata o espaço ou a técnica específica" width="420" height="310" style="object-position:${position}"><span class="number">0${i+1}</span></div><h3>${name}</h3><p>${description}</p><a href="${contactLink(name)}" target="_blank" rel="noopener" aria-label="Quero saber mais sobre ${name}">Quero saber mais <span>↗</span></a></article>`).join('');
document.querySelectorAll('.contact').forEach(a=>{a.href=contactLink();a.target='_blank';a.rel='noopener';if(BUSINESS.whatsapp && a.classList.contains('floating'))a.setAttribute('aria-label','Agendar pelo WhatsApp')});
const menu=document.querySelector('.menu'),nav=document.querySelector('nav');menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Fechar menu':'Abrir menu')});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));
const header=document.querySelector('header');window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>90),{passive:true});
// Animate from visible content: failed or disabled animations never hide a section.
const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');
const motionTargets=document.querySelectorAll('.reveal,.benefits p,.faq-list details,.final-cta > *,footer > *');
if('IntersectionObserver' in window && !motionPreference.matches){
  const active=new Set();
  const observer=new IntersectionObserver(entries=>{
    entries.filter(entry=>entry.isIntersecting).forEach((entry,index)=>{
      const el=entry.target;
      const animation=el.animate([{opacity:0,transform:'translateY(24px)'},{opacity:1,transform:'translateY(0)'}],{duration:600,delay:Math.min(index*80,240),easing:'cubic-bezier(.2,.65,.3,1)',fill:'backwards'});
      active.add(animation); animation.finished.finally(()=>active.delete(animation)); observer.unobserve(el);
    });
  },{threshold:.06,rootMargin:'0px 0px -24px 0px'});
  motionTargets.forEach(el=>observer.observe(el));
  motionPreference.addEventListener('change',event=>{if(event.matches){observer.disconnect();active.forEach(a=>a.cancel());active.clear()}});
}
document.querySelectorAll('.faq-list details').forEach(details=>details.addEventListener('toggle',()=>{if(details.open&&!motionPreference.matches)details.querySelector('p').animate([{opacity:0,transform:'translateY(-6px)'},{opacity:1,transform:'translateY(0)'}],{duration:300,easing:'ease-out'})}));
const dialog=document.querySelector('#privacy-dialog');document.querySelector('#privacy').addEventListener('click',()=>dialog.showModal());document.querySelector('#close-dialog').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});document.querySelector('#year').textContent=new Date().getFullYear();
document.querySelectorAll('#services img').forEach(img=>{img.loading='eager';img.style.minHeight='100%';img.style.height='100%';img.style.objectFit='cover'});

