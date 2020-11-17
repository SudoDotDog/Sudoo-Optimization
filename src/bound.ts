/**
 * @author WMXPY
 * @namespace Optimization
 * @description Bound
 */

import { BoundFunction, Variables } from "./declare";

export class BoundManager<T extends Variables> {

    public static create<T extends Variables>(): BoundManager<T> {

        return new BoundManager<T>();
    }

    private readonly _bounds: Array<BoundFunction<T>>;

    private constructor() {

        this._bounds = [];
    }

    public get length(): number {
        return this._bounds.length;
    }

    public add(bound: BoundFunction<T>): this {

        this._bounds.push(bound);
        return this;
    }

    public neutralize(variables: T): T {

        let clone: T = {
            ...variables,
        };
        for (const each of this._bounds) {

            clone = each(clone);
        }
        return clone;
    }
}
