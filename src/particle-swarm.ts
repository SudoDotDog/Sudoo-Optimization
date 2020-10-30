/**
 * @author WMXPY
 * @namespace Optimization
 * @description Particle Swarm
 */

import { ConstraintManager } from "./constraint";
import { Variables } from "./declare";

export class ParticleSwarmOptimization<T extends Variables> {

    public static create<T extends Variables>(): ParticleSwarmOptimization<T> {

        return new ParticleSwarmOptimization<T>();
    }

    private readonly _constraints: ConstraintManager<T>;

    private constructor() {

        this._constraints = ConstraintManager.create<T>();
    }

    public get constraints(): ConstraintManager<T> {
        return this._constraints;
    }
}
