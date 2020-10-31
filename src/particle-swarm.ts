/**
 * @author WMXPY
 * @namespace Optimization
 * @description Particle Swarm
 */

import { ConstraintManager } from "./constraint";
import { Variables } from "./declare";
import { createMaximumVariableByExample, createMaximumVariablesByExample, createVelocitiesByExample, createVelocityByExample } from "./util";

export type ParticleSwarmOptimizationOptions<T> = {

    readonly particles: number;
    readonly iterations: number;

    readonly initialization: () => T;
    readonly function: (variables: T) => number;
};

export type ParticleSwarmOptimizationResult<T> = {

    readonly particles: T[];

    readonly globalBest: T;
    readonly globalBestValue: number;

    readonly aliveParticleCount: number;
    readonly diedParticleCount: number;
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

        const disabledParticles: number[] = [];

        const particles: T[] = new Array(count).fill(undefined).map(this._options.initialization);

        const velocities: T[] = createVelocitiesByExample(example, count);

        let globalBest: T = createMaximumVariableByExample(example);
        let globalBestValue: number = Infinity;

        const particleBests: T[] = createMaximumVariablesByExample(example, count);
        const particleBestValues: number[] = new Array(count).fill(Infinity);

        for (let iteration = 0; iteration < this._options.iterations; iteration++) {

            const currentValues: number[] = new Array(count);

            valueUpdate: for (let particleIndex = 0; particleIndex < count; particleIndex++) {

                if (disabledParticles.includes(particleIndex)) {
                    continue valueUpdate;
                }

                const currentParticle: T = particles[particleIndex];
                if (!this._constraints.verify(currentParticle)) {

                    disabledParticles.push(particleIndex);
                    continue valueUpdate;
                }

                const value: number = this._options.function(currentParticle);

                if (isNaN(value)) {
                    throw new Error('[Sudoo-Optimization] Invalid Result');
                }

                currentValues[particleIndex] = value;

                if (value < particleBestValues[particleIndex]) {
                    particleBests[particleIndex] = currentParticle;
                    particleBestValues[particleIndex] = value;
                }
            }

            bestUpdate: for (let particleIndex = 0; particleIndex < count; particleIndex++) {

                if (disabledParticles.includes(particleIndex)) {
                    continue bestUpdate;
                }

                if (particleBestValues[particleIndex] < globalBestValue) {

                    globalBest = particleBests[particleIndex];
                    globalBestValue = particleBestValues[particleIndex];
                }
            }

            velocityUpdate: for (let velocityIndex = 0; velocityIndex < count; velocityIndex++) {

                if (disabledParticles.includes(velocityIndex)) {
                    continue velocityUpdate;
                }

                const currentParticle: T = particles[velocityIndex];
                const currentParticleBest: T = particleBests[velocityIndex];

                const previousVelocity: T = velocities[velocityIndex];
                const nextVelocity: T = createVelocityByExample(example);

                const keys: Array<keyof T> = Object.keys(nextVelocity);

                for (const key of keys) {

                    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                    const R1: number = Math.max(0.95, Math.min(0.05, Math.random()));
                    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                    const R2: number = Math.max(0.95, Math.min(0.05, Math.random()));

                    nextVelocity[key] = previousVelocity[key]
                        + (R1 * 2 * (currentParticleBest[key] - currentParticle[key]))
                        + (R2 * 2 * (globalBest[key] - currentParticle[key])) as any;
                }

                velocities[velocityIndex] = nextVelocity;
            }

            particleUpdate: for (let particleIndex = 0; particleIndex < count; particleIndex++) {

                if (disabledParticles.includes(particleIndex)) {
                    continue particleUpdate;
                }

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

        bestUpdate: for (let particleIndex = 0; particleIndex < count; particleIndex++) {

            if (disabledParticles.includes(particleIndex)) {
                continue bestUpdate;
            }

            if (particleBestValues[particleIndex] < globalBestValue) {

                globalBest = particleBests[particleIndex];
                globalBestValue = particleBestValues[particleIndex];
            }
        }

        return {
            particles,

            globalBest,
            globalBestValue,

            aliveParticleCount: this._options.particles - disabledParticles.length,
            diedParticleCount: disabledParticles.length,
        };
    }
}
