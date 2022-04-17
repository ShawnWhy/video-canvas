import logo from './SP_Logo_Menu.svg';

function component(){

let m = document.createElement("main")
let p = document.createElement("p")
let img = document.createElement('img')
m.append(p)
p.append(img)
img.src = logo
img.alt="this is alogo";

return m


}

export default component;