export enum IconEnum {
    ERROR,
    SUCCESS,
    LOGOUT,
    LOGIN,
    HOME,
    SUN,
    MOON,
    BRIEFCASE,
    PLUS,
    ARROW_DOWN,
    CHEVRON_DOWN,
    CHEVRON_UP,
    X,
    TIMELINE,
    CASH,
    CASH_OFF
}

export enum ColorEnum {
    BLUE = '#228BE6',
    RED = '#6B0F1A',
    GREEN = '#9EE493'
}

type HEX = `#${string}`;

export type Color = ColorEnum | HEX;

export enum zIndexEnum {
    BACK = 0,
    MIDDLE = 1000,
    FRONT = 2000
}
