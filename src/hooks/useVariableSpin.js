import { useEffect } from "react";

const DEFAULT_RETARGET_RANGE = [1500, 3000];

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

// Spins `ref`'s element via direct transform writes in a rAF loop, easing
// its speed toward a newly randomized target every couple of seconds
// instead of looping at a fixed CSS animation-duration. That's what makes
// it read as organically speeding up/down rather than a constant spin.
function useVariableSpin(
  ref,
  {
    active = true,
    minSpeed = 40,
    maxSpeed = 160,
    retargetRange = DEFAULT_RETARGET_RANGE,
    direction = 1,
  } = {}
) {
  useEffect(() => {
    const node = ref.current;
    if (!node || !active) return undefined;

    let frameId;
    let angle = 0;
    let speed = randomBetween(minSpeed, maxSpeed);
    let targetSpeed = speed;
    let lastTime = performance.now();
    let lastRetarget = lastTime;
    let nextRetargetIn = randomBetween(retargetRange[0], retargetRange[1]);

    const tick = (now) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      if (now - lastRetarget > nextRetargetIn) {
        targetSpeed = randomBetween(minSpeed, maxSpeed);
        lastRetarget = now;
        nextRetargetIn = randomBetween(retargetRange[0], retargetRange[1]);
      }

      speed += (targetSpeed - speed) * Math.min(delta * 0.8, 1);
      angle = (angle + speed * direction * delta) % 360;
      node.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, active, minSpeed, maxSpeed, direction]);
}

export default useVariableSpin;
