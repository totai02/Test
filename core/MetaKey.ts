export class MetaKey {
    public static readonly Type = 'type';
    public static readonly Object = 'object';
    public static readonly JSon = 'json';//Có thể là đường dẫn tới file json hoặc là tên file json được set trong loader(vd:loader.add([tên file], [đường dẫn]))
    public static readonly Src = 'src';
    public static readonly Id = 'id';
    public static readonly Css = 'css';
    public static readonly Text = 'text';
    public static readonly Password = 'password';
    public static readonly NinePatch = 'ninepatch';
    public static readonly Z = 'z';//Chỉ có giá trị -1 là dưới cùng của list child, hoặc 1 là trên cùng của list child
}