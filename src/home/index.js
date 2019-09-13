import React from 'react';
import { Button, Carousel, Slider, Switch, Card, Icon, Dropdown, Menu, message } from 'antd';
import { connect } from 'react-redux';
import './home.scss';
import { Object } from 'core-js';
import nw from '../config';
const fs = require('fs');
const http = require('http');
const https = require('https');
const uuid = require('uuid-js');
const cmd = require('node-cmd');
const success = (msg) => {
    message.success(msg);
};
const error = (err) => {
    message.error(err);
};
// const load = require('audio-loader');
//需要渲染什么数据
function mapStateToProps(state) {
    return {
        ...state,
    }
}
//需要触发什么行为
function mapDispatchToProps(dispatch) {
    return {
        PayIncrease: () => dispatch({ type: '++', value: 100 }),
        PayDecrease: () => dispatch({ type: '--', value: 10 })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(class Home extends React.Component {
    constructor(props) {
        super(props);
        // console.log(props);
        this.state = {
            name: '主页',
            carousel: [
                { src: require('../../public/3ba1ea2efedf77ab631941520f0ba545.jpg'), txt: '有人不知悔改' },
                { src: require('../../public/7a44ba6c48fd3f509fdf1b41d24ffbb8.jpg'), txt: '迷雾中混淆黑白' },
                { src: require('../../public/523f7f3a2ace95522bc9b1656f9f0557.jpg'), txt: '在情怀里市侩' },
                { src: require('../../public/411201aefbe5132b056157c151205654.jpg'), txt: '旁人不敢来拆穿' }
            ],
            disabled: false,
            lyricsColor: [],
            showLyrics: '有人不知悔改,迷雾中混淆黑白,在情怀里市侩,旁人不敢来拆穿',
            marks: {
                0: 0,
                100: 0
            },
            currentMusic: {
                audioPaused: true,
                value: 0,
                duration: 100,
                src: "https://6d69-missubear-developmen-1256962785.tcb.qcloud.la/audio/%E8%8A%B1%E7%B2%A5_%E7%8E%8B%E8%83%9C%E7%94%B7%20-%20%E5%87%BA%E5%B1%B1.mp3"
            },
            musicList: [
                {
                    name: "出山",
                    author: "花粥_王胜男",
                    duration: "210",
                    src: "https://6d69-missubear-developmen-1256962785.tcb.qcloud.la/audio/%E8%8A%B1%E7%B2%A5_%E7%8E%8B%E8%83%9C%E7%94%B7%20-%20%E5%87%BA%E5%B1%B1.mp3",
                    imgs: [
                        { src: require('../../public/3ba1ea2efedf77ab631941520f0ba545.jpg'), txt: '有人不知悔改' },
                        { src: require('../../public/7a44ba6c48fd3f509fdf1b41d24ffbb8.jpg'), txt: '迷雾中混淆黑白' },
                        { src: require('../../public/523f7f3a2ace95522bc9b1656f9f0557.jpg'), txt: '在情怀里市侩' },
                        { src: require('../../public/411201aefbe5132b056157c151205654.jpg'), txt: '旁人不敢来拆穿' }
                    ]
                },
                {
                    name: "告白气球",
                    author: "周二珂",
                    duration: "210",
                    src: "https://6d69-missubear-developmen-1256962785.tcb.qcloud.la/audio/%E5%91%8A%E7%99%BD%E6%B0%94%E7%90%83%20-%20%E5%91%A8%E4%BA%8C%E7%8F%82.mp3",
                    imgs: [
                        { src: require('../../public/3ba1ea2efedf77ab631941520f0ba545.jpg'), txt: '有人不知悔改' },
                        { src: require('../../public/7a44ba6c48fd3f509fdf1b41d24ffbb8.jpg'), txt: '迷雾中混淆黑白' },
                        { src: require('../../public/523f7f3a2ace95522bc9b1656f9f0557.jpg'), txt: '在情怀里市侩' },
                        { src: require('../../public/411201aefbe5132b056157c151205654.jpg'), txt: '旁人不敢来拆穿' }
                    ]
                }
            ]

        }
        this.carouselRef = null;
        this.homeAudio = null;
        this.currentTimer = null;
        this.colorChange = null;
        this.slider = null;
        this.setCarouselRef = el => {
            this.carouselRef = el;
        };
        this.setHomeAudioRef = el => {
            this.homeAudio = el;
        };
    }
    history = () => {
        console.log(this.props)
        this.props.history.push('/login')
    }
    handleDisabledChange = disabled => {
        this.setState({ disabled });
    };
    componentDidMount() {
        // console.log(this.props)


        // if (this.state.currentMusic.src) this.getFile(this.state.currentMusic.src)
    }
    randomColor = (n, m) => {
        let color = () => {
            return Math.ceil(Math.random() * (m - n) + n)
        }

        this.setState({
            lyricsColor: this.state.showLyrics.split('').map(() => { return `rgb(${color()},${color()},${color()})` })
        })
        this.colorChange = setTimeout(() => {
            this.randomColor(n, m)
        }, 1000);
    }
    audioPlay = () => {
        this.homeAudio.play()
        this.randomColor(0, 255)
        this.slider = setInterval(() => {
            if (this.carouselRef) this.carouselRef.next();
        }, 2000);
        let currentMusic = Object.assign({}, this.state.currentMusic, { audioPaused: false, duration: this.homeAudio.duration })
        let marks = Object.assign({}, this.state.marks, { 100: this.getDuration(this.homeAudio.duration) })
        this.setState({
            currentMusic,
            marks,
        })
        console.log(this.state.marks)
        console.log(this.state.currentMusic)
        this.currentTimer = setInterval(() => {
            console.log(this.homeAudio.currentTime)
            console.log(Number(this.homeAudio.currentTime / this.state.currentMusic.duration * 100).toFixed(0))
            let currentMusic = Object.assign({}, this.state.currentMusic, { value: Number((this.homeAudio.currentTime / this.state.currentMusic.duration * 100).toFixed(0)) })
            this.setState({
                currentMusic
            })
        }, 1000)
        console.log(this.sliderRef)

    }
    audioPause = () => {
        this.homeAudio.pause()
        clearInterval(this.currentTimer)
        clearInterval(this.colorChange)
        clearInterval(this.slider)
        let currentMusic = Object.assign({}, this.state.currentMusic, { audioPaused: true })
        this.setState({
            currentMusic
        })
        console.log(this.homeAudio.paused)
    }
    fastBackward = () => {
        if (!this.state.marks['100']) return
        let currentMusic = Object.assign({}, this.state.currentMusic, { value: this.state.currentMusic.value <= 0 ? 0 : this.state.currentMusic.value -= 1 })
        this.setState({
            currentMusic
        })
        this.homeAudio.currentTime = this.state.currentMusic.value / 100 * this.state.currentMusic.duration
    }
    fastForward = () => {
        if (!this.state.marks['100']) return
        let currentMusic = Object.assign({}, this.state.currentMusic, { value: this.state.currentMusic.value >= 100 ? 100 : this.state.currentMusic.value += 1 })
        this.setState({
            currentMusic
        })
        this.homeAudio.currentTime = this.state.currentMusic.value / 100 * this.state.currentMusic.duration
    }
    getFile = (file) => {
        const reg = new RegExp(/(http|https):\/\/([\w.]+\/?)\S*/);
        switch (file.match(reg)[1]) {
            case 'http':
                http.get(file, res => {
                    console.log(res)
                    let img = []
                    let size = 0
                    // 将图片地址以【.】符号分割，取最后一项，即为格式后缀
                    const _arr = file.split('.')
                    const format = _arr[_arr.length - 1]
                    // 如果没有传入图片名字，则使用随机数
                    const _name = 'file-' + Math.floor(Number(new Date()) * Number(Math.random()))
                    res.on('data', chunk => {
                        img.push(chunk)
                        size += chunk.length
                    })
                    res.on('end', () => {
                        // 合并 Buffer
                        const buffer = Buffer.concat(img, size)
                        fs.stat(buffer, (err, stat) => {
                            if (err) {
                                console.log(`img/${_name}.${format}`, err)
                            }
                            console.log(`img/${_name}.${format}`, stat)
                        })

                    })
                })
                break;
            case 'https':
                https.get(file, res => {
                    console.log(res)
                    let img = []
                    let size = 0
                    // 将图片地址以【.】符号分割，取最后一项，即为格式后缀
                    const _arr = file.split('.')
                    const format = _arr[_arr.length - 1]
                    // 如果没有传入图片名字，则使用随机数
                    const _name = 'file-' + Math.floor(Number(new Date()) * Number(Math.random()))
                    res.on('data', chunk => {
                        img.push(chunk)
                        size += chunk.length
                    })
                    res.on('end', () => {
                        console.log('end')
                        // 合并 Buffer
                        const buffer = Buffer.concat(img, size)
                        console.log(buffer)
                        fs.stat(buffer, (err, stat) => {
                            if (err) {
                                console.log(`img/${_name}.${format}`, err)
                            }
                            console.log(`img/${_name}.${format}`, stat)
                        })

                    })
                })
                break;
            default:
                fs.stat(file, (err, stat) => {
                    if (err) {
                        console.log(err)
                    }
                    console.log(stat)
                })
                break;
        }
    }
    getDuration = (duration) => {
        duration = Math.ceil(duration);
        let seconds = duration % 60;

        let minutes = parseInt(duration / 60);

        let hours = parseInt(minutes / 60);

        minutes = minutes % 60;


        return `${hours ? hours + ':' : ''}${minutes[1] ? minutes : '0' + minutes.toString()}:${seconds[1] ? seconds : '0' + minutes.toString()} `
    }
    CurrentTimechange = val => {
        console.log(val)
        let currentMusic = Object.assign({}, this.state.currentMusic, { value: val })
        this.setState({
            currentMusic
        })
        this.homeAudio.currentTime = this.state.currentMusic.value / 100 * this.state.currentMusic.duration
    }
    audioEnd = () => {
        this.audioPause();
    }
    snapshoot = () => {
        nw.win.capturePage((buffer) => {
            fs.writeFile(`C:\\Users\\张志伟\\Desktop\\nw-snapshoot\\${uuid.create().toString()}.png`, buffer, function (err) {
                if (err) {
                    console.log(err)
                    error('截图失败')
                    return
                } else {
                    success('截图成功')
                    cmd.get('clip ')
                }

            });
        }, { format: 'png', datatype: 'buffer' });

    }
    render() {
        const { PayIncrease, PayDecrease } = this.props;
        const { disabled } = this.state;
        return (
            <div className='home' >
                <Carousel ref={this.setCarouselRef} effect="scrollx" className={this.state.currentMusic.audioPaused ? '' : 'slider-animation'}>
                    {this.state.carousel.map(val => {
                        return (<div key={val.txt}><h3>{val.txt}</h3><img src={val.src} /></div>)
                    }
                    )}
                </Carousel>
                < div className='control' >
                    <Card>
                        <p>{this.state.showLyrics.split('').map((val, i) => { return <span style={{ color: this.state.lyricsColor[i] }} key={i}>{val}</span> })}</p>
                    </Card>
                    <div className="play">
                        <div className="play-btn">
                            <Icon type="fast-backward" onClick={this.fastBackward} />
                            {this.state.currentMusic.audioPaused ?
                                (<Icon type="caret-right" onClick={this.audioPlay} />) : (<Icon type="pause" onClick={this.audioPause} />)}
                            <Icon type="fast-forward" onClick={this.fastForward} />
                        </div>
                        <div className="play-slider"><Slider max={100} min={0} value={this.state.currentMusic.value} defaultValue={0} disabled={this.state.marks['100'] ? false : true} marks={this.state.marks} onChange={this.CurrentTimechange} /></div>
                        <div className="tools">
                            <Icon type="scissor" onClick={this.snapshoot} />
                        </div>
                        <div className="music-list">
                            <Dropdown overlay={<Menu style={{ textAlignLast: "justify", textAlign: "justify" }}>
                                {this.state.musicList.map((val, i) => {
                                    return (
                                        <Menu.Item key={val.name} title={val.author}>
                                            {val.name}
                                        </Menu.Item>
                                    )
                                })}
                            </Menu>} placement="topCenter">
                                <Button>播放列表</Button>
                            </Dropdown>
                        </div>
                    </div>
                    {/* Disabled: <Switch size="small" checked={disabled} onChange={this.handleDisabledChange} /> */}
                </div >
                <audio ref={this.setHomeAudioRef} className="audio" src={this.state.currentMusic.src} onEnded={this.audioEnd}></audio>
                {/* <Button onClick={this.history}>登录</Button>
                <a>{this.state.name + this.props.music.music}</a>
                <Button onClick={PayIncrease}>+</Button>
                <Button onClick={PayDecrease}>-</Button> */}
            </div >
        )
    }
})

