import{a as k,c as E,_ as F,h as R,d as M,N as U,O as X}from"./q-2af11bbb.js";var K=Object.defineProperty,Y=(t,e,i)=>e in t?K(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,T=(t,e,i)=>(Y(t,typeof e!="symbol"?e+"":e,i),i);class ye extends Error{constructor(e,i){super(typeof e=="string"?e:""),T(this,"name","FormError"),T(this,"errors"),this.errors=typeof e=="string"?i||{}:e}}function pe(t,e,i){const{checked:r,files:n,options:s,value:o,valueAsDate:a,valueAsNumber:c}=t;return!i||i==="string"?o:i==="string[]"?s?[...s].filter(l=>l.selected&&!l.disabled).map(l=>l.value):r?[...e.value||[],o]:(e.value||[]).filter(l=>l!==o):i==="number"?c:i==="boolean"?r:i==="File"&&n?k(n[0]):i==="File[]"&&n?k([...n]):i==="Date"&&a?a:e.value}function N(t){return[...Object.values(t.internal.fields),...Object.values(t.internal.fieldArrays)]}function A(t,e){return t.internal.fieldArrays[e]}function Z(t,e){return+e.replace(`${t}.`,"").split(".")[0]}function $(t,e){w(t,!1).forEach(i=>{const r=A(t,i).items.length-1;e.filter(n=>n.startsWith(`${i}.`)&&Z(i,n)>r).forEach(n=>{e.splice(e.indexOf(n),1)})})}function w(t,e=!0){const i=Object.keys(t.internal.fieldArrays);return e&&$(t,i),i}function G(t,e=!0){const i=Object.keys(t.internal.fields);return e&&$(t,i),i}function _(t,e){return t.internal.fields[e]}function O(t,e,i){const r=G(t,i),n=w(t,i);return typeof e=="string"||Array.isArray(e)?(typeof e=="string"?[e]:e).reduce((s,o)=>{const[a,c]=s;return n.includes(o)?(n.forEach(l=>{l.startsWith(o)&&c.add(l)}),r.forEach(l=>{l.startsWith(o)&&a.add(l)})):a.add(o),s},[new Set,new Set]).map(s=>[...s]):[r,n]}function H(t,{items:e,initialItems:i,error:r}={items:[],initialItems:[],error:""}){const n=i.join()!==e.join();return{internal:{initialItems:[...i],startItems:[...i],validate:[],consumers:[]},name:t,items:e,error:r,active:!1,touched:n,dirty:n}}function z(t,e){const i=r=>r instanceof Blob?r.size:r;return Array.isArray(t)&&Array.isArray(e)?t.map(i).join()!==e.map(i).join():t instanceof Date&&e instanceof Date?t.getTime()!==e.getTime():Number.isNaN(t)&&Number.isNaN(e)?!1:t!==e}function L(t,{value:e,initialValue:i,error:r}={value:void 0,initialValue:void 0,error:""}){const n=z(i,e);return{internal:{initialValue:i,startValue:i,validate:[],transform:[],elements:[],consumers:[]},name:t,value:e,error:r,active:!1,touched:n,dirty:n}}function m(t,e){return t.split(".").reduce((i,r)=>i==null?void 0:i[r],e)}let J=0;function D(){return J++}function ee({loader:t,action:e,fieldArrays:i}){function r(a){var c;return((c=e==null?void 0:e.value)==null?void 0:c.values)&&m(a,e.value.values)}const n=()=>D(),s=a=>{var c;return((c=e==null?void 0:e.value)==null?void 0:c.errors[a])||""},o=(a,c,l)=>Object.entries(c).reduce((y,[f,u])=>{var p;const d=l?`${l}.${f}`:f;if(i!=null&&i.includes(d.replace(/.\d+./g,".$."))){const h=u.map(n);y[1][d]=H(d,{initialItems:h,items:((p=r(d))==null?void 0:p.map(n))||[...h],error:s(d)})}else(!u||typeof u!="object"||Array.isArray(u)||u instanceof Date)&&(y[0][d]=L(d,{initialValue:u,value:r(d)??u,error:s(d)}));return u&&typeof u=="object"&&o(y,u,d),y},a);return o([{},{}],t.value)}async function he(t,e){const i=await t.resolve();return(typeof i=="function"?i():i).safeParse(e)}function P(t,e){return(typeof t!="string"&&!Array.isArray(t)?t:e)||{}}function te(t,e){t.dirty=e||N(t).some(i=>i.active&&i.dirty)}function q(t,e){const i=z(e.internal.startValue,e.value);i!==e.dirty&&(e.dirty=i,te(t,i))}function C(t,e){var i,r;(r=(i=_(t,e))==null?void 0:i.internal.elements[0])==null||r.focus()}function ie(t,e,i,{shouldActive:r=!0,shouldTouched:n=!1,shouldDirty:s=!1,shouldFocus:o=!!i}={}){for(const a of[_(t,e),A(t,e)])a&&(!r||a.active)&&(!n||a.touched)&&(!s||a.dirty)&&(a.error=i,i&&"value"in a&&o&&C(t,e));Q(t,!!i)}function re(t,e,i){const{shouldActive:r=!0,shouldTouched:n=!1,shouldDirty:s=!1,shouldValid:o=!1}=P(e,i);return O(t,e)[0].reduce((a,c)=>{const l=_(t,c);return(!r||l.active)&&(!n||l.touched)&&(!s||l.dirty)&&(!o||!l.error)&&(typeof e=="string"?c.replace(`${e}.`,""):c).split(".").reduce((y,f,u,d)=>y[f]=u===d.length-1?l.value:typeof y[f]=="object"&&y[f]||(isNaN(+d[u+1])?{}:[]),a),a},typeof e=="string"?[]:{})}function _e(t,e,i){const[r,n]=O(t,e,!1),s=typeof e=="string"&&r.length===1,o=!s&&!Array.isArray(e),a=P(e,i),{initialValue:c,initialValues:l,keepResponse:y=!1,keepSubmitCount:f=!1,keepSubmitted:u=!1,keepValues:d=!1,keepDirtyValues:p=!1,keepItems:h=!1,keepDirtyItems:B=!1,keepErrors:S=!1,keepTouched:V=!1,keepDirty:j=!1}=a;r.forEach(b=>{const v=_(t,b);(s?"initialValue"in a:l)&&(v.internal.initialValue=s?c:m(b,l));const I=p&&v.dirty;!d&&!I&&(v.internal.startValue=v.internal.initialValue,v.value=v.internal.initialValue,v.internal.elements.forEach(g=>{g.type==="file"&&(g.value="")})),V||(v.touched=!1),!j&&!d&&!I&&(v.dirty=!1),S||(v.error="")}),n.forEach(b=>{var g;const v=A(t,b),I=B&&v.dirty;!h&&!I&&(l&&(v.internal.initialItems=((g=m(b,l))==null?void 0:g.map(()=>D()))||[]),v.internal.startItems=[...v.internal.initialItems],v.items=[...v.internal.initialItems]),V||(v.touched=!1),!j&&!h&&!I&&(v.dirty=!1),S||(v.error="")}),o&&(y||(t.response={}),f||(t.submitCount=0),u||(t.submitted=!1)),oe(t)}function ne(t,e,{duration:i}={}){t.response=e,i&&setTimeout(()=>{t.response===e&&(t.response={})},i)}function Ee(t,e,i,{shouldTouched:r=!0,shouldDirty:n=!0,shouldValidate:s=!0,shouldFocus:o=!0}={}){const a=ae(t,e);a.value=i,r&&(a.touched=!0,t.touched=!0),n&&q(t,a),s&&x(t,a,e,{on:["touched","input"],shouldFocus:o})}async function se(t,e,i){const[r,n]=O(t,e),{shouldActive:s=!0,shouldFocus:o=!0}=P(e,i),a=D();t.internal.validators.push(a),t.validating=!0;const c=t.internal.validate?await t.internal.validate(re(t,{shouldActive:s})):{};let l=typeof e!="string"&&!Array.isArray(e)?!Object.keys(c).length:!0;const[y]=await Promise.all([Promise.all(r.map(async f=>{const u=_(t,f);if(!s||u.active){let d;for(const h of u.internal.validate)if(d=await h(u.value),d)break;const p=d||c[f]||"";return p&&(l=!1),u.error=p,p?f:null}})),Promise.all(n.map(async f=>{const u=A(t,f);if(!s||u.active){let d="";for(const h of u.internal.validate)if(d=await h(u.items),d)break;const p=d||c[f]||"";p&&(l=!1),u.error=p}}))]);if(le(t,c,{shouldActive:s}),o){const f=y.find(u=>u);f&&C(t,f)}return Q(t,!l),t.internal.validators.splice(t.internal.validators.indexOf(a),1),t.internal.validators.length||(t.validating=!1),l}function x(t,e,i,{on:r,shouldFocus:n=!1}){r.includes((t.internal.validateOn==="submit"?t.submitted:e.error)?t.internal.revalidateOn:t.internal.validateOn)&&se(t,i,{shouldFocus:n})}async function Fe(t,e,i,r,n,s,o){o!==void 0&&(e.value=o);for(const a of e.internal.transform)e.value=await a(e.value,r,n);e.touched=!0,t.touched=!0,q(t,e),x(t,e,i,{on:s})}function ae(t,e){return _(t,e)||(t.internal.fields[e]=L(e)),_(t,e)}function le(t,e,{duration:i,shouldActive:r=!0}){const n=Object.entries(e).reduce((s,[o,a])=>([_(t,o),A(t,o)].every(c=>!c||r&&!c.active)&&s.push(a),s),[]).join(" ");n&&ne(t,{status:"error",message:n},{duration:i})}function Ae(t,e,i){Object.entries(e).forEach(([r,n])=>{n&&ie(t,r,n,{...i,shouldFocus:!1})})}function Q(t,e){t.invalid=e||N(t).some(i=>i.active&&i.error)}function oe(t){let e=!1,i=!1,r=!1;for(const n of N(t))if(n.active&&(n.touched&&(e=!0),n.dirty&&(i=!0),n.error&&(r=!0)),e&&i&&r)break;t.touched=e,t.dirty=i,t.invalid=r}function be(t){return E(()=>F(()=>import("./q-6a6acc9f.js"),["build/q-6a6acc9f.js","build/q-2af11bbb.js"]),"s_g3iC2s54jgU",[t])}const W=X(E(()=>F(()=>import("./q-2ed2a4ea.js"),["build/q-2ed2a4ea.js","build/q-2af11bbb.js"]),"s_vBVRkPF8kFE"));function ue({children:t,name:e,type:i,...r}){const{of:n}=r,s=_(n,e);return R(W,{store:s,...r,children:t(s,{name:e,autoFocus:!1,ref:E(()=>F(()=>import("./q-6c9529a1.js"),["build/q-6c9529a1.js","build/q-2af11bbb.js"]),"s_0EFsQ07yXsM",[s]),onInput$:E(()=>F(()=>import("./q-6c9529a1.js"),["build/q-6c9529a1.js","build/q-2af11bbb.js"]),"s_WQShqIriXzI",[s,n,e,i]),onChange$:E(()=>F(()=>import("./q-6c9529a1.js"),["build/q-6c9529a1.js","build/q-2af11bbb.js"]),"s_vNtVq2dMPhY",[s,n,e]),onBlur$:E(()=>F(()=>import("./q-6c9529a1.js"),["build/q-6c9529a1.js","build/q-2af11bbb.js"]),"s_fzfym1ErEFI",[s,n,e])})},0,e)}function ce({children:t,name:e,...i}){const r=A(i.of,e);return R(W,{store:r,...i,children:t(r)},0,e)}function de({of:t,action:e,onSubmit$:i,responseDuration:r,keepResponse:n,shouldActive:s,shouldTouched:o,shouldDirty:a,shouldFocus:c,reloadDocument:l,children:y,...f}){const{encType:u}=f,d={duration:r,shouldActive:s,shouldTouched:o,shouldDirty:a,shouldFocus:c};return M("form",{...f,action:e==null?void 0:e.actionPath,"preventdefault:submit":!l,ref:p=>{t.element=p},children:y,onSubmit$:E(()=>F(()=>import("./q-30d10a92.js"),["build/q-30d10a92.js","build/q-2af11bbb.js"]),"s_qmKnyqz75p4",[e,u,t,n,i,d,l])},{noValidate:!0,method:"post"},0,"Qg_0")}function fe({validate:t,validateOn:e="submit",revalidateOn:i="input",...r}){return U(()=>{var o,a;const[n,s]=ee(r);return{internal:{fields:n,fieldArrays:s,fieldArrayPaths:r.fieldArrays,validate:t,validators:[],validateOn:e,revalidateOn:i},element:void 0,submitCount:0,submitting:!1,submitted:!1,validating:!1,touched:!1,dirty:!1,invalid:!1,response:((a=(o=r.action)==null?void 0:o.value)==null?void 0:a.response)||{}}})}function Ie(t){const e=fe(t);return[e,{Form:i=>de({of:e,action:t.action,...i}),Field:i=>ue({of:e,...i}),FieldArray:i=>ce({of:e,...i})}]}export{ye as F,re as a,ne as b,le as c,D as d,Ie as e,Ee as f,pe as g,Fe as h,he as i,_e as r,Ae as s,oe as u,se as v,be as z};
