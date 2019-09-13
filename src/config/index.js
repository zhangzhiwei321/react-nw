import nw from 'nw.gui';
console.log(nw)
nw.Screen.Init();
const win = nw.Window.get();
const menu = new nw.Menu();

export default {
    screen: nw.Screen,
    app: nw.App,
    win,
    menu,
    global
}

