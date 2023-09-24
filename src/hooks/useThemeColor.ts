import { useCallback, useEffect, useRef, useState } from "react";
import { themeVariableList } from "../themes/theme";

export interface ThemeColor {
    theme: any;
    themeName: string;
    switchTheme: () => void;
}

export function useThemeColor(): ThemeColor {
    const appReference = useRef<HTMLElement>(null as any as HTMLElement);

    const [isDarkTheme, setIsDarkTheme] = useState(() => false);
    const [themeName, setThemeName] = useState(() => getThemeName(isDarkTheme));
    const [theme, setTheme] = useState<any>(null);

    const switchTheme = useCallback(() => {
        setIsDarkTheme(!isDarkTheme);
    }, [isDarkTheme]);

    useEffect(() => setThemeName(getThemeName(isDarkTheme)), [isDarkTheme]);

    useEffect(() => {
        const observer = new MutationObserver(() => setTheme(extractTheme(appReference.current)));

        appReference.current = document.getElementsByClassName('app')[0] as HTMLElement;
        setTheme(extractTheme(appReference.current));

        observer.observe(appReference.current, {
            attributes: true,
            attributeFilter: ["class"],
            childList: false,
            characterData: false,
            attributeOldValue: true
        });

        return () => observer.disconnect();
    }, []);

    return { theme, themeName, switchTheme };
}

function extractTheme(app: HTMLElement): Record<string, string> {
    const computedDocumentStyle = getComputedStyle(app);
    const getVariable = (variableName: string): string => computedDocumentStyle.getPropertyValue(`--${variableName}`);
    return themeVariableList.reduce((acc, key) => ({ ...acc, [key]: getVariable(key) }), {});
}

function getThemeName(isDarkTheme: boolean): string {
    return `${(isDarkTheme ? 'dark' : 'light')}-theme`;
}
