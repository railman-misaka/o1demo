(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{4658:function(e,t,r){Promise.resolve().then(r.bind(r,1897))},1897:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return O}});var a=r(7437),l=r(4743),s=r(2265),i=r(5293),n=r(535),o=r(1994),c=r(3335);function d(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,c.m6)((0,o.W)(t))}let u=(0,n.j)("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-md px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),m=s.forwardRef((e,t)=>{let{className:r,variant:l,size:s,asChild:n=!1,...o}=e,c=n?i.g7:"button";return(0,a.jsx)(c,{className:d(u({variant:l,size:s,className:r})),ref:t,...o})});m.displayName="Button";var f=r(3263);let h=s.forwardRef((e,t)=>{let{className:r,...l}=e;return(0,a.jsx)(f.fC,{ref:t,className:d("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",r),...l})});h.displayName=f.fC.displayName;let g=s.forwardRef((e,t)=>{let{className:r,...l}=e;return(0,a.jsx)(f.Ee,{ref:t,className:d("aspect-square h-full w-full",r),...l})});g.displayName=f.Ee.displayName;let p=s.forwardRef((e,t)=>{let{className:r,...l}=e;return(0,a.jsx)(f.NY,{ref:t,className:d("flex h-full w-full items-center justify-center rounded-full bg-muted",r),...l})});function x(e){let{message:t}=e,r="user"===t.role;return(0,a.jsxs)("div",{className:d("flex items-start",r?"justify-end":"justify-start"),children:[!r&&(0,a.jsxs)(h,{className:"mr-3",children:[(0,a.jsx)(g,{src:"/bot-avatar.png",alt:"AI Assistant"}),(0,a.jsx)(p,{children:"\uD83E\uDD16"})]}),(0,a.jsxs)("div",{className:d("max-w-[80%] rounded-lg px-4 py-2",r?"bg-blue-500 text-white":"bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"),children:[t.fileUrl&&t.fileUrl.startsWith("data:image/")&&(0,a.jsx)("div",{className:"mb-2",children:(0,a.jsx)("img",{src:t.fileUrl,alt:t.fileName||"アップロードされた画像",className:"max-w-full rounded-md max-h-64 object-contain"})}),t.fileUrl&&!t.fileUrl.startsWith("data:image/")&&(0,a.jsxs)("div",{className:"mb-2 flex items-center p-2 bg-gray-200 dark:bg-zinc-700 rounded-md",children:[(0,a.jsx)("svg",{className:"h-5 w-5 mr-2 text-gray-500 dark:text-gray-400",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"})}),(0,a.jsx)("span",{className:"text-sm",children:t.fileName||"添付ファイル"})]}),(0,a.jsx)("p",{className:"whitespace-pre-wrap",children:t.content})]}),r&&(0,a.jsxs)(h,{className:"ml-3",children:[(0,a.jsx)(g,{src:"/user-avatar.png",alt:"User"}),(0,a.jsx)(p,{children:"\uD83D\uDC64"})]})]})}p.displayName=f.NY.displayName;var v=r(3837);let y=(e,t)=>{e&&localStorage.setItem("chat_".concat(e),JSON.stringify(t))},w=e=>{if(e){let t=localStorage.getItem("chat_".concat(e));if(t)return JSON.parse(t)}return[]};function j(){let{chatId:e,onUpdateTitle:t,model:r="gpt-35-turbo"}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{messages:i,input:n,handleInputChange:o,handleSubmit:c,isLoading:d}=function(){let{chatId:e,model:t="gpt-35-turbo"}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},[r,a]=(0,s.useState)([]),[l,i]=(0,s.useState)(""),[n,o]=(0,s.useState)(!1);(0,s.useEffect)(()=>{e?a(w(e)):a([])},[e]),(0,s.useEffect)(()=>{e&&r.length>0&&y(e,r)},[e,r]);let c=(0,s.useCallback)(e=>{i(e.target.value)},[]),d=(0,s.useCallback)(async(e,s)=>{if(e.preventDefault(),!l.trim()&&!s||n)return;let c="",d="";s&&(d=s.name,c=s.type.startsWith("image/")?await new Promise(e=>{let t=new FileReader;t.onload=t=>{var r;e(null===(r=t.target)||void 0===r?void 0:r.result)},t.readAsDataURL(s)}):"file://"+s.name);let u={id:(0,v.Z)(),role:"user",content:l,fileUrl:c||void 0,fileName:d||void 0};a(e=>[...e,u]),i(""),o(!0);let m=(0,v.Z)();a(e=>[...e,{id:m,role:"assistant",content:""}]);try{var f;let e=r.concat(u).map(e=>{let{role:t,content:r,fileUrl:a,fileName:l}=e;return{role:t,content:r,fileUrl:a,fileName:l}}),l=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:e,model:t})});if(!l.ok)throw Error("APIリクエストに失敗しました");let s=null===(f=l.body)||void 0===f?void 0:f.getReader();if(!s)throw Error("レスポンスボディを読み取れません");let i=new TextDecoder,n="";for(;;){let{done:e,value:t}=await s.read();if(e)break;for(let e of i.decode(t).split("\n\n"))if(e.startsWith("data: ")){let t=e.slice(6);if("[DONE]"===t)continue;try{let{text:e}=JSON.parse(t);e&&(n+=e,a(e=>e.map(e=>e.id===m?{...e,content:n}:e)))}catch(e){console.error("JSONのパースに失敗しました:",e)}}}}catch(e){console.error("Error generating response:",e),a(e=>e.map(e=>e.id===m?{...e,content:"すみません、エラーが発生しました。もう一度お試しください。"}:e))}finally{o(!1)}},[l,n,r,t]);return{messages:r,input:l,handleInputChange:c,handleSubmit:d,isLoading:n}}({chatId:e,model:r}),[u,f]=(0,s.useState)(null),[h,g]=(0,s.useState)(null),p=(0,s.useRef)(null);return(0,s.useEffect)(()=>{if(i.length>=2&&t){let r=i.find(e=>"user"===e.role);if(r){let a=r.content.length>20?"".concat(r.content.substring(0,20),"..."):r.content;if(t(a),e){let t=localStorage.getItem("chat_history");if(t){let r=JSON.parse(t);if(!r.find(t=>t.id===e)&&i.length>0){let t=[{id:e,createdAt:parseInt(e)||Date.now(),title:a,workspaceId:localStorage.getItem("selected_workspace")||"default"},...r];localStorage.setItem("chat_history",JSON.stringify(t))}}}}}},[i,t,e]),(0,a.jsxs)("div",{className:"flex flex-col h-full overflow-hidden",children:[(0,a.jsx)("div",{className:"flex-1 overflow-y-auto p-4",children:0===i.length?(0,a.jsxs)("div",{className:"h-full flex flex-col items-center justify-center",children:[(0,a.jsx)("div",{className:"bg-zinc-900 text-white p-4 rounded-full mb-4",children:(0,a.jsx)("span",{className:"text-2xl",children:"\uD83D\uDC64"})}),(0,a.jsx)("h2",{className:"text-3xl font-bold mb-8",children:"Azure OpenAI チャットデモ"})]}):(0,a.jsx)("div",{className:"space-y-6 pb-4",children:i.map(e=>(0,a.jsx)(x,{message:e},e.id))})}),u&&(0,a.jsx)("div",{className:"px-4 pb-2",children:(0,a.jsxs)("div",{className:"flex items-center p-2 bg-gray-100 dark:bg-zinc-800 rounded-md",children:[h?(0,a.jsx)("div",{className:"relative",children:(0,a.jsx)("img",{src:h,alt:"プレビュー",className:"h-16 w-auto rounded"})}):(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)("svg",{className:"h-5 w-5 mr-2 text-gray-500",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"})}),(0,a.jsx)("span",{className:"text-sm",children:u.name})]}),(0,a.jsx)("button",{onClick:()=>{f(null),g(null),p.current&&(p.current.value="")},className:"ml-auto p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300",children:(0,a.jsx)("svg",{className:"h-4 w-4",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})})]})}),(0,a.jsx)("div",{className:"border-t p-4 bg-white dark:bg-zinc-900",children:(0,a.jsxs)("form",{onSubmit:t=>{if(c(t,u),u&&(f(null),g(null),p.current&&(p.current.value="")),e&&n.trim()){let t=localStorage.getItem("chat_history");if(t){let r=JSON.parse(t);if(!r.find(t=>t.id===e)){let t=n.length>20?"".concat(n.substring(0,20),"..."):n,a=[{id:e,createdAt:parseInt(e)||Date.now(),title:t,workspaceId:localStorage.getItem("selected_workspace")||"default"},...r];localStorage.setItem("chat_history",JSON.stringify(a))}}else{let t=n.length>20?"".concat(n.substring(0,20),"..."):n,r={id:e,createdAt:parseInt(e)||Date.now(),title:t,workspaceId:localStorage.getItem("selected_workspace")||"default"};localStorage.setItem("chat_history",JSON.stringify([r]))}}},className:"relative",children:[(0,a.jsx)("input",{type:"file",ref:p,onChange:e=>{var t;let r=(null===(t=e.target.files)||void 0===t?void 0:t[0])||null;if(f(r),r){if(r.type.startsWith("image/")){let e=new FileReader;e.onload=e=>{var t;g(null===(t=e.target)||void 0===t?void 0:t.result)},e.readAsDataURL(r)}else g(null)}else g(null)},className:"hidden",accept:"image/*,.pdf,.doc,.docx,.txt,.csv,.xlsx"}),(0,a.jsxs)(m,{type:"button",size:"icon",variant:"ghost",className:"absolute left-3 top-1/2 transform -translate-y-1/2",onClick:()=>{var e;null===(e=p.current)||void 0===e||e.click()},children:[(0,a.jsx)("svg",{className:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 4v16m8-8H4"})}),(0,a.jsx)("span",{className:"sr-only",children:"添付ファイルを追加"})]}),(0,a.jsx)("input",{type:"text",value:n,onChange:o,placeholder:u?"".concat(u.name,"について質問する..."):"メッセージを入力...",className:"w-full pl-12 pr-12 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500",disabled:d}),(0,a.jsxs)(m,{type:"submit",size:"icon",className:"absolute right-3 top-1/2 transform -translate-y-1/2",disabled:d||!n.trim()&&!u,children:[(0,a.jsx)(l.Z,{className:"h-5 w-5"}),(0,a.jsx)("span",{className:"sr-only",children:"送信"})]})]})})]})}var N=r(5868),b=r(8930),k=r(3247),I=r(2489);let S=[{id:"o1",name:"o1",category:"OpenAI"},{id:"o1-mini",name:"o1-mini",category:"OpenAI"},{id:"gpt-4.5-preview",name:"GPT-4.5 Preview",category:"OpenAI"},{id:"o3-mini",name:"o3-mini",category:"OpenAI"},{id:"gpt-4o-mini-audio-preview",name:"GPT-4o Mini Audio Preview",category:"OpenAI"},{id:"gpt-4o-mini-realtime-preview",name:"GPT-4o Mini Realtime Preview",category:"OpenAI"},{id:"gpt-4o",name:"GPT-4o",category:"OpenAI"},{id:"gpt-4o-mini",name:"GPT-4o Mini",category:"OpenAI"},{id:"gpt-4o-audio-preview",name:"GPT-4o Audio Preview",category:"OpenAI"},{id:"gpt-4o-realtime-preview",name:"GPT-4o Realtime Preview",category:"OpenAI"},{id:"o1-preview",name:"o1 Preview",category:"OpenAI"},{id:"gpt-4",name:"GPT-4",category:"OpenAI"},{id:"gpt-4-32k",name:"GPT-4 32k",category:"OpenAI"},{id:"text-embedding-ada-002",name:"Text Embedding Ada 002",category:"OpenAI"},{id:"davinci-002",name:"Davinci 002",category:"OpenAI"},{id:"gpt-35-turbo-16k",name:"GPT-3.5 Turbo 16k",category:"OpenAI"},{id:"gpt-35-turbo-instruct",name:"GPT-3.5 Turbo Instruct",category:"OpenAI"},{id:"gpt-35-turbo",name:"GPT-3.5 Turbo",category:"OpenAI"}],_={id:"default",name:"デフォルト",createdAt:Date.now()};function O(){let[e,t]=(0,s.useState)(null),[r,l]=(0,s.useState)([]),[i,n]=(0,s.useState)("新しい会話"),[o,c]=(0,s.useState)("gpt-4o"),[d,u]=(0,s.useState)([_]),[m,f]=(0,s.useState)(_.id),[h,g]=(0,s.useState)(""),[p,x]=(0,s.useState)([]),[v,y]=(0,s.useState)(!1),w=(0,s.useRef)(null),O=(0,s.useRef)(!1);(0,s.useEffect)(()=>{{let e=localStorage.getItem("workspaces");if(e){let t=JSON.parse(e);u(t.length>0?t:[_])}else localStorage.setItem("workspaces",JSON.stringify([_]));let r=localStorage.getItem("chat_history");if(r){let e=JSON.parse(r);l(e),e.length>0&&(y(!0),O.current=!0)}let a=localStorage.getItem("selected_model");a&&c(a);let s=localStorage.getItem("selected_workspace");s&&f(s);let i=localStorage.getItem("last_chat_id");i&&t(i)}},[]),(0,s.useEffect)(()=>{let e=setInterval(()=>{{let e=localStorage.getItem("chat_history");if(e){let t=JSON.parse(e);JSON.stringify(t)!==JSON.stringify(r)&&l(t)}}},1e3);return()=>clearInterval(e)},[r]),(0,s.useEffect)(()=>{e&&localStorage.setItem("last_chat_id",e)},[e]),(0,s.useEffect)(()=>{m?x(r.filter(e=>e.workspaceId===m||!e.workspaceId&&m===_.id)):x(r)},[m,r]),(0,s.useEffect)(()=>{""===h.trim()?x(r.filter(e=>e.workspaceId===m||!e.workspaceId&&m===_.id)):A(h)},[h,m,r]),(0,s.useEffect)(()=>{if(e){let t=r.find(t=>t.id===e);t&&n(t.title||"会話 ".concat(D(t.createdAt)))}else n("新しい会話")},[e,r]);let A=async e=>{if(!e.trim())return;let t=r.filter(t=>(t.title||"会話 ".concat(D(t.createdAt))).toLowerCase().includes(e.toLowerCase())&&(t.workspaceId===m||!t.workspaceId&&m===_.id));for(let a of r)if(!t.some(e=>e.id===a.id)&&(a.workspaceId===m||!a.workspaceId&&m===_.id)){let r=localStorage.getItem("chat_".concat(a.id));r&&JSON.parse(r).some(t=>t.content.toLowerCase().includes(e.toLowerCase()))&&t.push(a)}x(t)},C=(t,a)=>{let s=r.map(e=>e.id===t?{...e,title:a}:e);l(s),e===t&&n(a),localStorage.setItem("chat_history",JSON.stringify(s))},z=e=>{t(e);let a=r.find(t=>t.id===e);a&&n(a.title||"会話 ".concat(D(a.createdAt)))},J=(a,s)=>{a.stopPropagation(),e===s&&(t(null),n("新しい会話"),localStorage.removeItem("last_chat_id"));let i=r.filter(e=>e.id!==s);l(i),localStorage.setItem("chat_history",JSON.stringify(i)),localStorage.removeItem("chat_".concat(s)),localStorage.removeItem("chat_title_".concat(s))},D=e=>new Date(e).toLocaleString("ja-JP",{month:"numeric",day:"numeric",hour:"2-digit",minute:"2-digit"}),L=S.reduce((e,t)=>{let r=t.category||"その他";return e[r]||(e[r]=[]),e[r].push(t),e},{});return(0,a.jsx)("main",{className:"flex h-screen overflow-hidden",children:(0,a.jsxs)("div",{className:"flex w-full h-full",children:[(0,a.jsxs)("div",{className:"hidden md:flex w-64 flex-col bg-zinc-900 text-white h-full",children:[(0,a.jsxs)("div",{className:"p-4 border-b border-zinc-800",children:[(0,a.jsx)("div",{className:"flex items-center justify-between",children:(0,a.jsxs)("div",{className:"relative w-full",children:[(0,a.jsx)("select",{className:"w-full bg-zinc-900 text-white border border-zinc-700 rounded-md py-2 px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500",value:m,onChange:e=>{let t=e.target.value;f(t),localStorage.setItem("selected_workspace",t)},children:d.map(e=>(0,a.jsx)("option",{value:e.id,children:e.name},e.id))}),(0,a.jsx)("div",{className:"absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none",children:(0,a.jsx)("svg",{className:"h-4 w-4 text-gray-400",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 9l-7 7-7-7"})})})]})}),(0,a.jsxs)("div",{className:"flex justify-between mt-2",children:[(0,a.jsx)("button",{onClick:()=>{let e=prompt("新しいワークスペースの名前を入力してください");if(!e)return;let t={id:Date.now().toString(),name:e,createdAt:Date.now()},r=[...d,t];u(r),f(t.id),localStorage.setItem("workspaces",JSON.stringify(r)),localStorage.setItem("selected_workspace",t.id)},className:"text-xs text-blue-400 hover:text-blue-300 transition-colors",children:"+ 新しいワークスペースを作成"}),(0,a.jsxs)("div",{className:"flex flex-col space-y-1",children:[(0,a.jsxs)("button",{onClick:()=>{if(m===_.id){alert("デフォルトのワークスペースは編集できません。");return}let e=d.find(e=>e.id===m);if(!e)return;let t=prompt("ワークスペース名を入力してください",e.name);if(!t||t===e.name)return;let r=d.map(e=>e.id===m?{...e,name:t}:e);u(r),localStorage.setItem("workspaces",JSON.stringify(r))},className:"text-xs text-gray-400 hover:text-gray-300 transition-colors flex items-center justify-end",disabled:m===_.id,title:m===_.id?"デフォルトのワークスペースは編集できません":"ワークスペース名を編集",children:[(0,a.jsx)(N.Z,{className:"h-3 w-3 mr-1"}),"編集"]}),(0,a.jsxs)("button",{onClick:()=>{var a;if(m===_.id){alert("デフォルトのワークスペースは削除できません。");return}if(!confirm("ワークスペース「".concat(null===(a=d.find(e=>e.id===m))||void 0===a?void 0:a.name,"」を削除しますか？\n\nこのワークスペース内のすべてのチャット履歴も削除されます。")))return;let s=r.filter(e=>e.workspaceId===m);e&&s.some(t=>t.id===e)&&(t(null),n("新しい会話"),localStorage.removeItem("last_chat_id"));let i=r.filter(e=>e.workspaceId!==m),o=d.filter(e=>e.id!==m);f(_.id),l(i),u(o),localStorage.setItem("chat_history",JSON.stringify(i)),localStorage.setItem("workspaces",JSON.stringify(o)),localStorage.setItem("selected_workspace",_.id),s.forEach(e=>{localStorage.removeItem("chat_".concat(e.id)),localStorage.removeItem("chat_title_".concat(e.id))})},className:"text-xs text-red-400 hover:text-red-300 transition-colors flex items-center justify-end",disabled:m===_.id,title:m===_.id?"デフォルトのワークスペースは削除できません":"ワークスペースを削除",children:[(0,a.jsx)(b.Z,{className:"h-3 w-3 mr-1"}),"削除"]})]})]})]}),(0,a.jsx)("div",{className:"p-4",children:(0,a.jsxs)("button",{onClick:()=>{if(e){let t=localStorage.getItem("chat_".concat(e));if(t&&JSON.parse(t).length>0){if(-1===r.findIndex(t=>t.id===e)){let t={id:e,createdAt:parseInt(e)||Date.now(),workspaceId:m},a=localStorage.getItem("chat_title_".concat(e));a&&(t.title=a);let s=[t,...r];l(s),localStorage.setItem("chat_history",JSON.stringify(s))}y(!0),O.current=!0}}let a=Date.now().toString();t(a),n("新しい会話"),localStorage.setItem("last_chat_id",a)},className:"flex items-center justify-center w-full bg-white/10 hover:bg-white/20 text-white rounded-md py-2 px-4 transition-colors",children:[(0,a.jsx)("svg",{className:"h-5 w-5 mr-2",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 4v16m8-8H4"})}),"新しいチャット"]})}),(0,a.jsx)("div",{className:"p-4",children:(0,a.jsxs)("div",{className:"relative",children:[(0,a.jsx)("input",{ref:w,type:"text",placeholder:"チャットを検索...",value:h,onChange:e=>g(e.target.value),className:"w-full bg-zinc-800 text-white border border-zinc-700 rounded-md py-2 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"}),(0,a.jsx)(k.Z,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500"}),h&&(0,a.jsx)("button",{onClick:()=>{g(""),w.current&&w.current.focus()},className:"absolute right-3 top-1/2 transform -translate-y-1/2",children:(0,a.jsx)(I.Z,{className:"h-4 w-4 text-zinc-500 hover:text-zinc-300"})})]})}),(0,a.jsx)("div",{className:"flex-1 overflow-y-auto px-4 pb-4",children:0===p.length?(0,a.jsx)("div",{className:"flex items-center justify-center h-full text-zinc-500",children:h?"検索結果がありません":"チャット履歴がありません"}):(0,a.jsxs)("div",{className:"space-y-2",children:[p.map(t=>(0,a.jsxs)("div",{className:"relative group",children:[(0,a.jsx)("button",{onClick:()=>z(t.id),className:"w-full text-left p-3 rounded-md transition-colors ".concat(e===t.id?"bg-blue-600":"hover:bg-zinc-800"),children:(0,a.jsx)("div",{className:"text-sm font-medium truncate pr-8",children:t.title||"会話 ".concat(D(t.createdAt))})}),(0,a.jsx)("button",{onClick:e=>J(e,t.id),className:"absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-red-500/20",title:"チャットを削除",children:(0,a.jsx)(b.Z,{className:"h-4 w-4 text-red-400"})})]},t.id)),p.length>0&&(0,a.jsx)("button",{onClick:()=>{let a=r.filter(e=>e.workspaceId===m||!e.workspaceId&&m===_.id);if(!confirm("このワークスペース内のすべてのチャット履歴を削除しますか？"))return;e&&a.some(t=>t.id===e)&&(t(null),n("新しい会話"),localStorage.removeItem("last_chat_id"));let s=r.filter(e=>!(e.workspaceId===m||!e.workspaceId&&m===_.id));l(s),localStorage.setItem("chat_history",JSON.stringify(s)),a.forEach(e=>{localStorage.removeItem("chat_".concat(e.id)),localStorage.removeItem("chat_title_".concat(e.id))})},className:"w-full mt-4 text-center p-2 text-xs text-red-400 hover:text-red-300 transition-colors",children:"このワークスペースのチャットをすべて削除"})]})})]}),(0,a.jsxs)("div",{className:"flex-1 flex flex-col h-full overflow-hidden",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between p-4 border-b",children:[(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)("button",{className:"md:hidden mr-4",children:(0,a.jsx)("svg",{className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 6h16M4 12h16M4 18h16"})})}),(0,a.jsx)("h1",{className:"text-xl font-semibold truncate",children:i})]}),(0,a.jsx)("div",{className:"flex items-center",children:(0,a.jsxs)("div",{className:"relative",children:[(0,a.jsx)("select",{value:o,onChange:e=>{let t=e.target.value;c(t),localStorage.setItem("selected_model",t)},className:"appearance-none bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-md py-1 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm",children:Object.entries(L).map(e=>{let[t,r]=e;return(0,a.jsx)("optgroup",{label:t,children:r.map(e=>(0,a.jsx)("option",{value:e.id,children:e.name},e.id))},t)})}),(0,a.jsx)("div",{className:"absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none",children:(0,a.jsx)("svg",{className:"h-4 w-4 text-gray-400",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 9l-7 7-7-7"})})})]})})]}),(0,a.jsx)(j,{chatId:e,onUpdateTitle:t=>{e&&(C(e,t),localStorage.setItem("chat_title_".concat(e),t))},model:o},e)]})]})})}}},function(e){e.O(0,[393,971,117,744],function(){return e(e.s=4658)}),_N_E=e.O()}]);