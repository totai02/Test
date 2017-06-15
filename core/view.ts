import {MetaKey} from "./MetaKey";
function view(viewProp: Object) {
    return (target: any, key: string) => {
        if (viewProp[MetaKey.Object]) target[key] = viewProp[MetaKey.Object];
        else target[key] = {}; // property need to be instantiated before looking up in BaseView
        Reflect.defineMetadata('view', viewProp, target, key); // add metadata for use later
    }
}
export = view;