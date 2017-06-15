import TextStyle = PIXI.TextStyle;
export class Style {
    static readonly AvoBold = 'UTMAvoBold';
    static readonly Roboto = "Roboto Regular";
    static readonly RobotoBold = "Roboto Bold";
    static readonly Tahoma = "Tahoma";
    static readonly UVNButLong2 = "UVNButLong2";
    
    static readonly BtnBoc3d = new TextStyle({
        fontFamily: Style.UVNButLong2,
        fontSize: 31,
        fill: 'white',
        stroke: 'black',
        strokeThickness: 2,
        padding: 2
    });
    static readonly TourSpectator = {
        default: new TextStyle({
            fontFamily: Style.Roboto,
            fontSize: 12,
            fill: '#715844',
            padding: 2
        })
        , count: {
            fontFamily: Style.RobotoBold,
            fontSize: 14,
            fill: '#cc1800',
            fontWeight: 'bold',
        }
    };
    static readonly BtnBoc3dDis = new TextStyle({
        fontFamily: Style.UVNButLong2,
        fontSize: 31,
        fill: '#DBDBDB',
        stroke: '#131313',
        strokeThickness: 2,
        padding: 2
    });

    static readonly TourViewTime = new TextStyle({
        fontFamily: Style.Tahoma,
        align: 'center',
        fontSize: 12,
        fill: 0xffc600,
        fontWeight: 'bold',
        lineSpacing: 4
    });

    static readonly BtnJoinTour = new TextStyle({
        fontFamily: Style.RobotoBold,
        align: 'center',
        fontSize: 13,
        fill: 0xffff97,
        stroke: 'black',
        strokeThickness: 2,
        lineSpacing: 4
    });

    static readonly BtnJoinTourHover = new TextStyle({
        fill: 0xffe3b2
    });

    static readonly BtnJoinTourDis = new TextStyle({
        fill: 0xdbdbdb,
    });

    static readonly TourView: any = {
        default: {
            fontFamily: Style.Tahoma,
            wordWrap: true,
            wordWrapWidth: 290,
            breakWords: true,
            align: 'center',
            fontSize: 12,
            fill: 0xffffff,
            lineSpacing: 4
        },
        time: {
            fontFamily: Style.RobotoBold,
            fontWeight: 'normal',
            fill: 0xffc200
        }
    };

    static readonly TitlePopupText = new TextStyle({
        fontFamily: Style.AvoBold,
        fontSize: 20,
        fill: 0x4d3018,
        align: 'center',
        padding: 2
    });
    static readonly BtnBase = new TextStyle({
        fontFamily: Style.AvoBold,
        fontSize: 13.5,
        fill: 0x5b351d,
        padding: 2
    });
    static readonly BtnBaseDis = new TextStyle({
        fontFamily: Style.AvoBold,
        fontSize: 13.5,
        fill: 0x696969,
        padding: 2
    });
    static readonly ThiDinhRoomNumber = new TextStyle({
        fontFamily: Style.Tahoma,
        fontWeight: 'bold',
        fontSize: 15,
        fill: 0x715844,
        stroke: 0x715844,
        padding: 2
    });
    static readonly ThiDinhRoomPlayer = new TextStyle({
        fontFamily: Style.Tahoma,
        fontSize: 14.5,
        fill: 0x715844,
        stroke: 0x715844,
        align: 'center',
        padding: 2
    });
    static readonly DefaultText = new TextStyle({
        fontFamily: Style.RobotoBold,
        fontSize: 16,
        fill: 'white',
        padding: 2
    });
    static readonly BtnTabThongBao = new TextStyle({
        fontFamily: Style.AvoBold,
        fontSize: 14,
        fill: 'white',
        // fill: 0x5b351d,
        padding: 2
    });
}