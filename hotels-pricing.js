(() => {
  const prices = {
    IN:{s:'₹',setup:[9999,19999,29999],mo:[499,1499,2999],yr:[4999,14999,29999],once:[24999,59999,99999]},
    SEA:{s:'$',setup:[149,299,449],mo:[8,19,39],yr:[79,199,399],once:[349,799,1299]},
    AE:{s:'AED ',setup:[999,1999,2999],mo:[49,149,299],yr:[499,1499,2999],once:[2499,5999,9999]},
    EU:{s:'€',setup:[299,599,899],mo:[15,49,99],yr:[149,499,999],once:[749,1799,2999]},
    GB:{s:'£',setup:[299,599,899],mo:[15,49,99],yr:[149,499,999],once:[749,1799,2999]},
    NA:{s:'$',setup:[349,699,999],mo:[19,59,119],yr:[189,599,1199],once:[849,1999,3299]},
    AU:{s:'A$',setup:[499,999,1499],mo:[29,79,159],yr:[289,799,1599],once:[1199,2799,4499]}
  };
  const sel=document.getElementById('hotel-region'), body=document.getElementById('hotel-pricing-body');
  if (!sel || !body) return;
  const money=(p,n)=>p.s+n.toLocaleString('en-US');
  function render(k){
    const p=prices[k]||prices.IN, annual=p.setup.map((x,i)=>x+p.yr[i]), save=p.mo.map((x,i)=>x*12-p.yr[i]);
    body.innerHTML=`<tr><td><b>MANAGED · Monthly</b><br><span class="fine">Lower commitment</span></td>${p.setup.map((x,i)=>`<td><b>${i===2?'From ':''}${money(p,x)} today</b><br>then ${money(p,p.mo[i])}/mo<br><span class="fine">Year 1: ${i===2?'from ':''}${money(p,x+p.mo[i]*12)}</span></td>`).join('')}</tr><tr><td><b>MANAGED · Annual ⭐</b><br><span class="fine">Best value</span></td>${annual.map((x,i)=>`<td><b>${i===2?'From ':''}${money(p,x)} today</b><br><span class="fine">${money(p,p.setup[i])} setup + first year ${money(p,p.yr[i])}</span><br>then ${i===2?'from ':''}${money(p,p.yr[i])}/yr</td>`).join('')}</tr><tr><td><b>Annual saving</b><br><span class="fine">vs paying monthly</span></td>${save.map((x,i)=>`<td>${i===1?'<b>':''}${money(p,x)}${i===2?'+':''}/year${i===1?'</b>':''}</td>`).join('')}</tr><tr><td><b>ONE-TIME · Pay once</b><br><span class="fine">No Jenvin subscription</span></td>${p.once.map((x,i)=>`<td><b>${i===2?'From ':''}${money(p,x)} once</b></td>`).join('')}</tr>`;
    localStorage.setItem('hotelPricingRegion',k);
  }
  const saved=localStorage.getItem('hotelPricingRegion');
  const region=(navigator.language||'').split('-')[1]||'';
  const guessed=region==='IN'?'IN':region==='AE'?'AE':region==='GB'?'GB':['US','CA'].includes(region)?'NA':region==='AU'?'AU':['SG','MY','PH','ID','VN','TH'].includes(region)?'SEA':['DE','FR','IT','ES','NL','BE','PT','IE','AT','FI','SE','DK','PL','CZ'].includes(region)?'EU':'IN';
  sel.value=saved&&prices[saved]?saved:guessed; render(sel.value);
  sel.addEventListener('change',()=>render(sel.value));
})();