'use client';

import React from 'react';
import useBearStore from '@/stores/bearStore';

const BearCounter = () => {
  const bears = useBearStore((state) => state.bears);
  return <h1>{bears} around here ...</h1>;
};

const Controls = () => {
  const increasePopulation = useBearStore((state) => state.increasePopulation);
  return (
    <button type="button" onClick={increasePopulation}>
      one up
    </button>
  );
};

const Bear = () => (
  <div>
    <BearCounter />
    <Controls />
  </div>
);

export default Bear;
