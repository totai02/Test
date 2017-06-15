import {BaseView} from "./BaseView";
import {DomBasePopup} from "../component/DomBasePopup";
export class ThiDinhWaitingUsersView extends BaseView {
    readonly popupContent = '<div id="popup-corner"></div>' +
        '<div id="thoigian-baodanh">Kỳ thi Đình sẽ bắt đầu trong vòng <span id="time-span">:</span> nữa</div>' +
        '<div id="noidung-siso-baodanh">Hiện đang có <span id="siso-span">#</span> thí sinh trong phòng báo danh</div>' +
        '<div id="content-column"><div id="danhsach-thisinh"><table id="tieude-danhsach-thisinh" class="table"><thead><tr><th class="stt-thisinh">STT</th><th class="separateHeader"></th><th class="ten-thisinh">Tên</th><th class="separateHeader"></th><th>Bảo</th></tr></thead></table><div id="than-danhsach-thisinh" class="overflow"><table class="table"><tbody></tbody></table></div></div><div id="chatBg"><div id="chatMessages"><div id="messagesArea" class="overflow"></div></div><div id="chatInputBg" class="box-footer"><input id="chatInput" placeholder="Xin chào !"><button class="btn btn-default dropdown-toggle" type="button" id="nut-emoticon" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button><ul class="dropdown-menu" aria-labelledby="dropdownMenu2" id="emoticon"></ul></div></div></div>'

    jEmoticon: Array<any>;

    domPopup: DomBasePopup;
    messagesArea: JQuery

    constructor() {
        super();
        this.domPopup = new DomBasePopup('Báo Danh Thi Đình', 765, 456);
        this.domPopup.active();

        this.domPopup.appendContent(this.popupContent);
        const MessageAreaPadding = 10
        let basePopup = DomBasePopup.tagBasePopup
        let chatMessages = basePopup.find('#chatMessages')
        this.messagesArea = basePopup.find('#messagesArea')
        this.messagesArea.css({
            'margin-left': MessageAreaPadding + 'px',
            'margin-top': MessageAreaPadding + 'px',
            width: chatMessages.width() - MessageAreaPadding + 'px',
            height: chatMessages.height() - MessageAreaPadding + 'px'
        })
        
        setInterval(() => {
            let date = new Date()
            let min = date.getMinutes()
            let s = date.getSeconds()
            DomBasePopup.tagBasePopup.find('span#time-span').html((min < 10 ? '0': '') + min + ':' + (s < 10 ? '0': '') + s)
        }, 1000)

        // test code
        let than = DomBasePopup.tagBasePopup.find('#than-danhsach-thisinh > table > tbody')
        for (let i = 0; i < 30; i++)
            than.append('<tr id="' + '"><td class="stt-thisinh">' + 1 + '</td><td class="separatedata"></td><td class="ten-thisinh">' + 'Đỗ Xuân Quyết' + '</td><td class="separatedata"></td><td>' + '123.456.789.123' + '</td></tr><tr class="separateRow"><td colspan="5" class="separateRow"></td></tr>')
        for (let i = 0; i < 20; i++) {
            this.messagesArea.append('Đỗ Xuân Quyết<br>')
            this.scrollToEnd()
        }
    }
    
    scrollToEnd = () => {
        let height = this.messagesArea.get(0).scrollHeight;

        this.messagesArea.animate({scrollTop: height}, 'fast');
    };
}