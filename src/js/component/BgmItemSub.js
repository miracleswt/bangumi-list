var _           = require('../lib/lodash.custom'),
    React       = require('react'),
    configStore = require('../store/BgmConfigStore');

var BgmItemSub = React.createClass({
    propTypes: {
        data: React.PropTypes.object.isRequired,
        disableNewTab: React.PropTypes.bool,
        handleHideChange: React.PropTypes.func
    },
    getInitialState: function(){
        return {
            hideCheck: this.props.data.hide
        };
    },
    handleHideClick: function(e){
        this.setState({
            hideCheck: e.target.checked
        });
        this.props.handleHideChange(e.target.checked);
    },
    getDownloadSites: function(data){
        var downloadSites = {
            'dmhy': {
                name: '花园',
                prefix: 'http://share.dmhy.org/topics/list?keyword=',
                default: 'CN'
            },
            'popgo': {
                name: '漫游',
                prefix: 'http://share.popgo.org/search.php?title=',
                default: 'CN'
            },
            'nyaa': {
                name: 'Nyaa',
                prefix: 'http://www.nyaa.se/?page=search&term=',
                default: 'JP'
            }
        };

        return _.map(downloadSites, function(conf, domain){
            var keyword = data['title' + conf.default];

            if(data.downloadKeyword && data.downloadKeyword[domain]){
                keyword = data.downloadKeyword[domain];
            }

            return (
                <a
                    key={domain}
                    href={conf.prefix + keyword}
                    target={this.props.disableNewTab ? '_self' : '_blank'}
                >
                    {conf.name}
                </a>
            );
        }.bind(this));
    },
    render: function(){
        var data = this.props.data,
            comment = data.comment ? <p><span>备注：</span>{data.comment}</p> : <p></p>,
            bangumi = data.bgmId ? <a href={'http://bangumi.tv/subject/' + data.bgmId} target={this.props.disableNewTab ? '_self' : '_blank'}>Bangumi页面</a> : '',
            downloadSites = this.getDownloadSites(data);

        return (
            <div className="item-sub">
                <div className="sub-left">
                    <p className="sub-links">
                        <span>链接：</span>
                        <a
                            href={data.officalSite}
                            target={this.props.disableNewTab ? '_self' : '_blank'}
                        >
                            官方网站
                        </a>
                        {bangumi}
                    </p>
                    <p className="sub-links">
                        <span>下载：</span>
                        {downloadSites}
                    </p>
                </div>
                <div className="sub-right">
                    <p>
                        <span>放送日期：</span>
                        {data.showDate}
                    </p>
                    <p className="hide-btn-box">
                        <input
                            type="checkbox"
                            checked={this.state.hideCheck}
                            onChange={this.handleHideClick}
                            id={'hide_' + data.id}
                        />
                        <label htmlFor={'hide_' + data.id}>隐藏</label>
                    </p>
                </div>
                {comment}
            </div>
        );
    }
});

module.exports = BgmItemSub;