import React from 'react';import nw from 'nw.gui';
import {
    Window,
    TitleBar,
    PushButton,
    TextField,
    Toolbar,
    Box,
    SegmentedControl,
    IndeterminateCircularProgressIndicator,
    View,
    Label
} from 'react-desktop';
class DeskTop extends React.Component {
    constructor() {
        super();
        this.state = { selectedTab: 'login' };
    }
    render() {
        return (
            <View>(๑′ᴗ‵๑)Ｉ Lᵒᵛᵉᵧₒᵤ❤</View>
        );
    }
}
// var nw=require('nw.gui')

// 创建一个空菜单
var menu = new nw.Menu();

// 添加菜单项
menu.append(new nw.MenuItem({
  label: '项 A',
  click: function(){
    alert('You have clicked at "项 A"');
  }
}));
menu.append(new nw.MenuItem({ label: '项 B' }));
menu.append(new nw.MenuItem({ type: 'separator' }));
menu.append(new nw.MenuItem({ label: '项 C' }));

// 监听事件
document.body.addEventListener('contextmenu', function(ev) {
  // 阻止显示默认菜单
  ev.preventDefault();
  // 点击处弹出定义的菜单对象
  menu.popup(ev.x, ev.y);

  return false;
}, false);
var os = require('os');
document.write('您当前系统为 ', os.platform());
export default DeskTop