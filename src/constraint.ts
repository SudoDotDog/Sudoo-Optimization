/**
 * @author WMXPY
 * @namespace Optimization
 * @description Constraint
 */

import { ConstraintFunction, Variables } from "./declare";

export class ConstraintManager<T extends Variables> {

    public static create<T extends Variables>(): ConstraintManager<T> {

        return new ConstraintManager<T>();
    }

    private readonly _constraints: Array<ConstraintFunction<T>>;

    private constructor() {

        this._constraints = [];
    }

    public get length(): number {
        return this._constraints.length;
    }

    public add(constraint: ConstraintFunction<T>): this {

        this._constraints.push(constraint);
        return this;
    }

    public verify(variables: T): boolean {

        for (const each of this._constraints) {

            if (!each(variables)) {

                return false;
            }
        }
        return true;
    }
}
