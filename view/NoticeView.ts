let $ = require('jquery')
import {DomBasePopup} from "../component/DomBasePopup";
export class NoticeView extends DomBasePopup {
    constructor() {
        super('Thông báo', 651, 366)
        
        this.active()
        
        let notices = [{
            content: "Sân Đình ra mắt phiên bản thử nghiệm <b>Open Beta Chắn 3.0</b>. Rất mong nhận được các ý kiến đóng góp và phản hồi của cộng đồng các thành viên Sân Đình.↵Trân trọng cảm ơn.↵<a href='https://chanphom.com/threads/ra-mat-phien-ban-open-beta-chanpro-3-0.11831/' target='_blank'>Chi tiết</a>",
            title: "Chắn 3.0 Beta"
        }, {
            content: "Sân Đình xin trân trọng giới thiệu sự kiện phiên bản Chắn 3.0 Beta: <b>Đua Top, chăm cày có ngay triệu Bảo</b> với phần thưởng hấp dẫn được trao hàng tuần. ↵<a href='https://chanphom.com/threads/dua-top-kinh-nghiem-nhan-bao-hang-tuan.11832/' target='_blank'>Chi tiết</a>",
            title: "Đua Top Chắn 3.0 Beta"
        }], html = ''

        let windowLocation = window.location
        let baseUrl = windowLocation.protocol + '//' + windowLocation.host + windowLocation.pathname
        for (let i = 0; i < notices.length; i++) {
            html += '<div class="thong-bao-item" id="item-' + i + '">';
            html += '   <div class="item-title"><a href="' + baseUrl + '#item-' + i + '">' + notices[i].title + '</a></div>';
            let content = notices[i].content.replace(/\n/g, "<br />");
            content = content.replace(/color='/g, "style='color:");
            html += '   <div class="item-content" class="scrollable"><h2>' + notices[i].title + '</h2>' + content + '</div>';
            html += '</div>';
        }

        this.appendContent(html);
        let item0 = $('#item-0')
        let a = item0.find('a')
        let eq0 = a.eq(0)
        eq0[0].click()
    }
}