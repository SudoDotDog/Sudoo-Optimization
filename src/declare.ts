/**
 * @author WMXPY
 * @namespace Optimization
 * @description Declare
 */

export type Variables = Record<string, number>;

export type BoundFunction<T extends Variables> = (variables: T) => T;
export type ConstraintFunction<T extends Variables> = (variables: T) => boolean;
