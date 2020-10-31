/**
 * @author WMXPY
 * @namespace Optimization
 * @description Particle Swarm
 */

import { ConstraintManager } from "./constraint";
import { Variables } from "./declare";
import { createVelocitiesByExample, createVelocityByExample } from "./util";

export type ParticleSwarmOptimizationOptions<T> = {

    readonly particles: number;
    readonly iterations: number;

    readonly initialization: () => T;
    readonly function: (variables: T) => number;
};

export type ParticleSwarmOptimizationResult<T> = {

    readonly particles: T[];
    readonly globalBest: number;
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

    public findMinimum(): ParticleSwarmOptimizationResult<T> {

        const count: number = this._options.particles;
        const example: T = this._options.initialization();

        const particles: T[] = new Array(count).fill(undefined).map(this._options.initialization);
        const velocities: T[] = createVelocitiesByExample(example, count);

        let globalBest: number = Infinity;
        const particleBests: number[] = new Array(count).fill(Infinity);

        for (let iteration = 0; iteration < this._options.iterations; iteration++) {

            const currentValues: number[] = new Array(count);

            for (let particleIndex = 0; particleIndex < count; particleIndex++) {

                const value: number = this._options.function(particles[particleIndex]);

                if (isNaN(value)) {
                    throw new Error('[Sudoo-Optimization] Invalid Result');
                }

                currentValues[particleIndex] = value;
                particleBests[particleIndex] = Math.min(value, particleBests[particleIndex]);
            }

            globalBest = Math.min(...particleBests);

            for (let velocityIndex = 0; velocityIndex < count; velocityIndex++) {

                const currentParticle: T = particles[velocityIndex];
                const currentParticleBest: number = particleBests[velocityIndex];

                const previousVelocity: T = velocities[velocityIndex];
                const nextVelocity: T = createVelocityByExample(example);

                const keys: Array<keyof T> = Object.keys(nextVelocity);

                for (const key of keys) {

                    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                    const R1: number = Math.max(0.95, Math.min(0.05, Math.random()));
                    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                    const R2: number = Math.max(0.95, Math.min(0.05, Math.random()));

                    nextVelocity[key] = previousVelocity[key] + (R1 * 2 * (currentParticleBest - currentParticle[key])) + (R2 * 2 * (globalBest - currentParticle[key])) as any;

                }

                velocities[velocityIndex] = nextVelocity;
            }

            for (let particleIndex = 0; particleIndex < count; particleIndex++) {

                const currentVelocity: T = velocities[particleIndex];

                const previousParticle: T = particles[particleIndex];
                const keys: Array<keyof T> = Object.keys(previousParticle);

                particles[particleIndex] = keys.reduce((previous: T, key: keyof T) => {
                    return {
                        ...previous,
                        [key]: previous[key] + currentVelocity[key],
                    };
                }, previousParticle);
            }
        }

        globalBest = Math.min(...particleBests);
        return {
            particles,
            globalBest,
        };
    }
}
