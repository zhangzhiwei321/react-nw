import React from 'react';
import { Button } from 'antd';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.history = this.history.bind(this)
    }
    history() {
        console.log(this.props)
        this.props.history.push('/')
    }
    render() {
        return (
            <div>
                <a>回到home</a>
                <Button onClick={this.history}>看看</Button>
            </div>
        )
    }
}
