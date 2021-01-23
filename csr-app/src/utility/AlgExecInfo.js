/**
 * AlgExecInfo class contains key information about the execution of a graph algorithm
 */
export default class AlgExecInfo {
  constructor(animations, distance, algorithm, withAnimation, negativeCycle = false, kwargs) {
    this.animations = animations;
    this.distance = distance;
    this.algorithm = algorithm;
    this.negativeCycle = negativeCycle;
    this.withAnimation = withAnimation;
    this.kwargs = kwargs
  }
}
