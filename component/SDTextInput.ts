import {ThemeConfig} from "../config/ThemeConfig";
export class SDTextInput extends GOWN.TextInput {
    constructor(text: string = '', displayAsPassword: boolean = false) {
        super(text, displayAsPassword, ThemeConfig.CORE, GOWN.TextInput.SKIN_NAME);
    }
}