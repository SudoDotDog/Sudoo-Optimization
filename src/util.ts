/**
 * @author WMXPY
 * @namespace Optimization
 * @description Util
 */

import { Variables } from "./declare";

export const createVelocityByExample = <T extends Variables>(variables: T): T => {

    const keys: Array<keyof T> = Object.keys(variables);
    return keys.reduce((previous: Partial<T>, each: keyof T) => {
        return {
            ...previous,
            [each]: 0,
        };
    }, {}) as T;
};

export const createVelocitiesByExample = <T extends Variables>(variables: T, count: number): T[] => {

    const keys: Array<keyof T> = Object.keys(variables);
    const velocities: T[] = new Array(count).fill(undefined).map(() => {
        return keys.reduce((previous: Partial<T>, each: keyof T) => {
            return {
                ...previous,
                [each]: 0,
            };
        }, {}) as T;
    });

    return velocities;
};

export const createMinimumVariablesByExample = <T extends Variables>(variables: T, count: number): T[] => {

    const keys: Array<keyof T> = Object.keys(variables);
    const variableList: T[] = new Array(count).fill(undefined).map(() => {
        return keys.reduce((previous: Partial<T>, each: keyof T) => {
            return {
                ...previous,
                [each]: -Infinity,
            };
        }, {}) as T;
    });

    return variableList;
};

export const createMaximumVariablesByExample = <T extends Variables>(variables: T, count: number): T[] => {

    const keys: Array<keyof T> = Object.keys(variables);
    const variableList: T[] = new Array(count).fill(undefined).map(() => {
        return keys.reduce((previous: Partial<T>, each: keyof T) => {
            return {
                ...previous,
                [each]: Infinity,
            };
        }, {}) as T;
    });

    return variableList;
};
