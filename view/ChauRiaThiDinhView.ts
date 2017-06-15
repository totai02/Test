import {BasePopup} from "./BasePopup";
import {ThiDinhRoomInfoView} from "./ThiDinhRoomInfoView";
import Container = PIXI.Container;
import Text = PIXI.Text;
import view = require("../core/view");
export class ChauRiaThiDinhView extends BasePopup {
    static readonly ContentLeftPadding = 40

    @view({type: Text})
    txtNotice: Text
    @view({type: Container, x: ChauRiaThiDinhView.ContentLeftPadding, y: 40})
    content: Container

    constructor() {
        super('Thi Đình', 405, 287, false)
        
        // this.txtNotice.anchor.set(0.5, 0.5)
        // this.txtNotice.position.x = this.bg.width / 2
        // this.txtNotice.position.y = this.bg.height / 2
        // this.txtNotice.text = "Hiện tại không có phòng nào đang thi"
        // this.txtNotice.style.fill = "blue"
        // initialize content to use addRoomInfo method later
        this.content.addChild(new Container)
        this.addRoomInfo(new ThiDinhRoomInfoView(1, ['Hà Nội mùa thu vàng', 'Chắn Hội Lèo Tôm', 'Mod 123', 'Hà Nội Phố']))
        // this.addRoomInfo(new ThiDinhRoomInfoView(1, ['Mod 123', 'Chắn Hội Lèo Tôm', 'Mod 123', 'Hà Nội Phố']))

        this.btnClose.on('click', () => {
            this.addRoomInfo(new ThiDinhRoomInfoView(1, ['Mod 123', 'Chắn Hội Lèo Tôm', 'Mod 123', 'Hà Nội Phố']))
        })
    }

    addRoomInfo = (roomInfo: ThiDinhRoomInfoView) => {
        let lastRow = <Container>this.content.getChildAt(this.content.children.length - 1)
        const ItemPerRow = 4
        const ColumnSpacing = 10
        if (lastRow.children.length < ItemPerRow) {
            lastRow.addChild(roomInfo);
            let i = lastRow.getChildIndex(roomInfo)
            let column = i % ItemPerRow
            roomInfo.x = column * roomInfo.width
            if (i > 0) {
                roomInfo.x += column * ColumnSpacing
            }
        } else {
            const RowSpacing = 7
            lastRow = this.content.addChild(new Container)
            lastRow.addChild(roomInfo)

            let i = lastRow.parent.getChildIndex(lastRow)
            lastRow.y = i * lastRow.height
            if (i > 0) {
                lastRow.y += i * RowSpacing
            }

            // update background height because new container is added
            this.bg.height += RowSpacing + lastRow.height
        }

        // align row center
        if (lastRow.parent.children.length > 1) {
            lastRow.x = ((lastRow.parent.getChildAt(0) as Container).width - lastRow.width) / 2
        } else {
            // update background width, element position because new roomInfo is added
            const ContentRightPadding = 42
            if (lastRow.children.length > 1) {
                this.bg.width = ChauRiaThiDinhView.ContentLeftPadding + ContentRightPadding + lastRow.width
                lastRow.x = 0
            } else {
                lastRow.x = (this.bg.width - ChauRiaThiDinhView.ContentLeftPadding - ContentRightPadding - lastRow.width) / 2
            }

            this.positionElement()
        }
    }
}