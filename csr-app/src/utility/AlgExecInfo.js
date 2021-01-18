export default class AlgExecInfo{
    animations;
    distance;
    algorithm;
    negativeCycle;

    AlgExecInfo(animations, distance, algorithm, negativeCycle){
        this.animations = animations;
        this.distance = distance;
        this.algorithm = algorithm;
        this.negativeCycle = negativeCycle;
    }
}