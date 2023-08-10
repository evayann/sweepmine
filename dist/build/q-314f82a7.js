function o(m,r,u){return Math.max(Math.min(m,u),r)}function p(m,r,u,t,a,s=!1){const c=(m-r)/(u-r)*(a-t)+t;if(!s)return c;const f=t<a?[c,t,a]:[c,a,t];return o(...f)}export{p as m};
