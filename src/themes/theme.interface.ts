export interface Theme {
    main: {
        color: string;
        accent: string;
    };
    secondary: string;
    background: string;

    game: {
        ui: {
            primary: string;
            secondary: string;
        }
    }
}