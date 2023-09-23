import { createContext } from 'react';
import { ThemeColor, useThemeColor } from '../hooks/useThemeColor';

export const ThemeContext = createContext<ThemeColor>(null as any);
export function ThemeProvider({ children }: any) {
    const themeColor = useThemeColor();

    return <ThemeContext.Provider value={themeColor}>{children}</ThemeContext.Provider>;
}
