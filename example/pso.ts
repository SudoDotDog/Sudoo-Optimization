/**
 * @author WMXPY
 * @namespace Example
 * @description PSO
 */

import { ParticleSwarmOptimization } from "../src";

type VarType = {

    readonly x1: number;
    readonly x2: number;
};

const particleSwarm: ParticleSwarmOptimization<VarType> = ParticleSwarmOptimization.create({

    particles: 1,
    iterations: 3,

    initialization: () => {
        return {
            x1: Math.random(),
            x2: Math.random(),
        };
    },
    function: (data: VarType) => {

        return Math.pow(data.x1, 2) + Math.pow(data.x2, 2) + (data.x1 * data.x2);
    }
});

console.log(particleSwarm.findMinimum());
