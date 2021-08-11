# Sudoo-Optimization

[![Continuous Integration](https://github.com/SudoDotDog/Sudoo-Optimization/actions/workflows/ci.yml/badge.svg)](https://github.com/SudoDotDog/Sudoo-Optimization/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/SudoDotDog/Sudoo-Optimization/branch/main/graph/badge.svg)](https://codecov.io/gh/SudoDotDog/Sudoo-Optimization)
[![npm version](https://badge.fury.io/js/%40sudoo%2Foptimization.svg)](https://www.npmjs.com/package/@sudoo/optimization)
[![downloads](https://img.shields.io/npm/dm/@sudoo/optimization.svg)](https://www.npmjs.com/package/@sudoo/optimization)

Optimization Utils

## Install

```sh
yarn add @sudoo/optimization
# Or
npm install @sudoo/optimization --save
```

## Usage

```ts
import { ParticleSwarmOptimization } from "@sudoo/optimization";

type VarType = {
    x: number;
    y: number;
    z: number;
};

const particleSwarm: ParticleSwarmOptimization<VarType> = ParticleSwarmOptimization.create(
    {
        particles: 49,
        iterations: 7,
        initialization: () => {
            return {
                x: initX(),
                y: initY(),
                z: initZ(),
            };
        },
        function: (data: VarType) => {

            return calculateResult(data.x, data.y, data.z);
        },
    },
);
const result: ParticleSwarmOptimizationResult<VarType> = particleSwarm.findMinimum(); // PSO result
```
