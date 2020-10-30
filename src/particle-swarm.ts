/**
 * @author WMXPY
 * @namespace Optimization
 * @description Particle Swarm
 */

import { ConstraintManager } from "./constraint";
import { Variables } from "./declare";

export type ParticleSwarmOptimizationOptions = {

    readonly iterations: number;
};

export class ParticleSwarmOptimization<T extends Variables> {

    public static create<T extends Variables>(options: ParticleSwarmOptimizationOptions): ParticleSwarmOptimization<T> {

        return new ParticleSwarmOptimization<T>(options);
    }

    private readonly _options: ParticleSwarmOptimizationOptions;
    private readonly _constraints: ConstraintManager<T>;

    private constructor(options: ParticleSwarmOptimizationOptions) {

        this._options = options;
        this._constraints = ConstraintManager.create<T>();
    }

    public get constraints(): ConstraintManager<T> {
        return this._constraints;
    }
}
