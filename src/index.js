import React from 'react';
import ReactDOM from 'react-dom';

import Player from './components/react-hls-player';

class Index extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            hlsUrl : 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
            destroy : false
        };

        this.playerRef = React.createRef();

        this._handleEnter = this._handleEnter.bind(this);
        this._handleDestroyClick = this._handleDestroyClick.bind(this);
        this._handleToggleControls = this._handleToggleControls.bind(this);
    }

    _handleEnter (e) {
        if (e.keyCode === 13) {
            this.setState({
                hlsUrl : e.target.value
            });
        }
    }

    _handleDestroyClick () {
        this.setState({
            destroy : true
        });
    }

    _handleToggleControls () {
        if (this.playerRef.current.hasAttribute('controls')) {
            this.playerRef.current.removeAttribute('controls');
        } else {
            this.playerRef.current.setAttribute('controls', true);
        }
    }

    render () {
        let { hlsUrl, destroy } = this.state;

        return (
            <div>
                <div
                    style={{
                        margin: '0 0 20px'
                    }}
                >
                    <label
                        style={{
                            display: 'block',
                            marginBottom: 10
                        }}
                        htmlFor="url-input"
                    >hls url : </label>
                    <input
                        id="url-input"
                        type="text"
                        defaultValue={hlsUrl}
                        onKeyUp={this._handleEnter}
                        style={{
                            width: '100%',
                            height: '30px',
                            lineHeight: '30px',
                            fontSize: '16px',
                            color: '#333'
                        }}
                    />
                </div>

                {
                    !destroy
                        ? <Player loop={true} width="100%" height="auto" playerRef={this.playerRef} url={hlsUrl} />
                        : null
                }

                <br />

                <button
                    style={{
                        padding: '5px 10px'
                    }}
                    onClick={this._handleDestroyClick}
                >
                    Destroy Video
                </button>

                <button
                    style={{
                        padding: '5px 10px'
                    }}
                    onClick={this._handleToggleControls}
                >
                    Toggle Controls (via custom ref)
                </button>
            </div>
        );
    }
}

ReactDOM.render(<Index />, document.getElementById('container'));
