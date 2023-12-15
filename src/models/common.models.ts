export enum IconEnum {
    ERROR,
    SUCCESS,
    LOGOUT,
    HOME,
    SUN,
    MOON,
    BRIEFCASE,
}

export enum ColorEnum {
    BLUE = '#228BE6',
    RED = '#6B0F1A',
    GREEN = '#9EE493'
}

type HEX = `#${string}`;

export type Color = ColorEnum | HEX;

