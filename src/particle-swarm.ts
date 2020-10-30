/**
 * @author WMXPY
 * @namespace Optimization
 * @description Particle Swarm
 */

import { ConstraintManager } from "./constraint";
import { Variables } from "./declare";

export type ParticleSwarmOptimizationOptions<T> = {

    readonly particles: number;
    readonly iterations: number;

    readonly initialization: () => T;
    readonly function: (variables: T) => number;
};

export class ParticleSwarmOptimization<T extends Variables> {

    public static create<T extends Variables>(options: ParticleSwarmOptimizationOptions<T>): ParticleSwarmOptimization<T> {

        return new ParticleSwarmOptimization<T>(options);
    }

    private readonly _options: ParticleSwarmOptimizationOptions<T>;
    private readonly _constraints: ConstraintManager<T>;

    private constructor(options: ParticleSwarmOptimizationOptions<T>) {

        this._options = options;
        this._constraints = ConstraintManager.create<T>();
    }

    public get constraints(): ConstraintManager<T> {
        return this._constraints;
    }

    public findMinimum(): number {

        const particles: T[] = new Array(this._options.particles).fill(undefined).map(this._options.initialization);

        let globalBest: number = Infinity;

        for (let i = 0; i < this._options.iterations; i++) {


        }
    }
}
