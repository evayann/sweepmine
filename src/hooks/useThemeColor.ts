import { useEffect, useState } from "react";
import { themeVariableList } from "../themes/theme";

export function useThemeColor() {
    const [colors, setColors] = useState(() => extractTheme());

    useEffect(() => {
        const observer = new MutationObserver(() => setColors(extractTheme()));

        observer.observe(document.documentElement, {
            attributes: true,
            childList: false,
            characterData: false,
            attributeOldValue: true
        });

        return () => observer.disconnect()
    }, []);

    return colors;
}

function extractTheme(): Record<string, string> {
    const computedDocumentStyle = getComputedStyle(document.documentElement);
    const getVariable = (variableName: string): string => computedDocumentStyle.getPropertyValue(`--${variableName}`);
    console.log(themeVariableList.reduce((acc, key) => ({ ...acc, [key]: getVariable(key) }), {}));
    return themeVariableList.reduce((acc, key) => ({ ...acc, [key]: getVariable(key) }), {});
}