import{m as E,b as P,I as S,E as V,h as a,c as b,_ as p,$ as m,v as n,x as v,d as y,M as u,l as f,p as B}from"./q-2af11bbb.js";import{g as l}from"./q-0da1b34f.js";import{e as O,z as L,f as x}from"./q-236b8bc4.js";const g=(o,s)=>{const e=({class:_,...c})=>{let i;return(r=>{r&&(i||(i=[s]),typeof r=="object"?i.push(Object.entries(r).filter(([,h])=>h).map(([h])=>h).join(" ")):i.push(r))})(_),E(o,{...c,class:_?[s,_]:s})};return e.class=s,Object.defineProperty(e,"className",{get:()=>s,enumerable:!1}),e.toString=()=>s,e};var F=g("button","_1wrkqlc0");g("p","bycac80");const j=o=>{P(b(()=>p(()=>Promise.resolve().then(()=>d),void 0),"s_XmYitGSE5iY"));const s=S(()=>({dimension:o.dimension,nbBombs:o.numberOfBombs.value})),[e,{Form:_,Field:c}]=O({loader:s,validate:L(b(()=>p(()=>Promise.resolve().then(()=>d),void 0),"s_uoFNkemvmys"))}),i=b(()=>p(()=>Promise.resolve().then(()=>d),void 0),"s_BXcv8nZLWXg",[o]);return V(b(()=>p(()=>Promise.resolve().then(()=>d),void 0),"s_AQgtnS2l2Hk",[e,o])),a(_,{children:[m("p",null,null,["Width x Height :",m("span",null,null,[a(c,{children:(t,r)=>a(v,{children:[y("input",{...r,value:u(t,"value")},{max:l.shape.dimension.shape.x.maxValue,min:l.shape.dimension.shape.x.minValue,type:"number"},0,null),t.error&&m("p",null,null,[" ",u(t,"error")," "],1,"ba_0")]},1,"ba_1"),name:"dimension.x",type:"number",[n]:{name:n,type:n}},3,"ba_2"),"x",a(c,{children:(t,r)=>a(v,{children:[y("input",{...r,value:u(t,"value")},{max:l.shape.dimension.shape.y.maxValue,min:l.shape.dimension.shape.y.minValue,type:"number"},0,null),t.error&&m("p",null,null,[" ",u(t,"error")," "],1,"ba_3")]},1,"ba_4"),name:"dimension.y",type:"number",[n]:{name:n,type:n}},3,"ba_5")],1,null)],1,null),m("p",null,null,["Number of bombs :",a(c,{children:(t,r)=>a(v,{children:[y("input",{...r,value:u(t,"value")},{max:l.shape.nbBombs.maxValue,min:l.shape.nbBombs.minValue,type:"number"},0,null),t.error&&m("p",null,null,[" ",u(t,"error")," "],1,"ba_6")]},1,"ba_7"),name:"nbBombs",type:"number",[n]:{name:n,type:n}},3,"ba_8")],1,null),a(F,{children:"Update game",type:"submit",[n]:{type:n}},3,"ba_9")],onSubmit$:i,[n]:{onSubmit$:n}},1,"ba_10")},k=`span{display:flex}span>input[type=number]{width:60px}form{display:flex;flex-direction:column;justify-content:center}
`,A=k,I=l,M=(o,s)=>{const[e]=f();e.setDimension(o.dimension),e.numberOfBombs.value=o.nbBombs},X=({track:o})=>{const[s,e]=f();o(()=>e.dimension),x(s,"dimension.x",e.dimension.x),x(s,"dimension.y",e.dimension.y)},d=Object.freeze(Object.defineProperty({__proto__:null,_hW:B,s_AQgtnS2l2Hk:X,s_BXcv8nZLWXg:M,s_L06IKf7RPAs:j,s_XmYitGSE5iY:A,s_uoFNkemvmys:I},Symbol.toStringTag,{value:"Module"}));export{B as _hW,X as s_AQgtnS2l2Hk,M as s_BXcv8nZLWXg,j as s_L06IKf7RPAs,A as s_XmYitGSE5iY,I as s_uoFNkemvmys};
