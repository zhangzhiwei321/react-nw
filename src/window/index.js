import React from 'react';
import { TitleBar } from 'react-desktop/windows';
import nw from '../config';

export default class extends React.Component {
    static defaultProps = {
        // color: '#fff',
        theme: 'light'
    };

    constructor(props) {
        super(props);
        this.state = { isMaximized: false };
    }

    close = () => nw.win.close();
    minimize = () => nw.win.minimize();
    toggleMaximize = () => {
        if (this.state.isMaximized) {
            nw.win.restore()
        } else {
            nw.win.maximize();
        }
        this.setState({ isMaximized: !this.state.isMaximized })
    };
    render() {
        return (
            <TitleBar
                title="我想婧婧"
                controls
                isMaximized={this.state.isMaximized}
                theme={this.props.theme}
                background={this.props.color}
                onCloseClick={this.close}
                onMinimizeClick={this.minimize}
                onMaximizeClick={this.toggleMaximize}
                onRestoreDownClick={this.toggleMaximize}
                style={{position:'fixed',top:'0px',left:'0px',zIndex:999999}}
            />
        );
    }
}