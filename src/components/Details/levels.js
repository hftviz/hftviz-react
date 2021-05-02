import bid1 from "../../data/level1/bid-level1.json";
import bid2 from "../../data/level2/bid-level2.json";
import bid3 from "../../data/level3/bid-level3.json";
// import bid4 from "../../data/level4/bid-level4.json";
import ask1 from "../../data/level1/ask-level1.json";
import ask2 from "../../data/level2/ask-level2.json";
import ask3 from "../../data/level3/ask-level3.json";
// import ask4 from "../../data/level4/ask-level4.json";
import cancel1 from "../../data/level1/cancel-level1.json";
import cancel2 from "../../data/level2/cancel-level2.json";
import cancel3 from "../../data/level3/cancel-level3.json";
// import cancel4 from "../../data/level4/cancel-level4.json";
import volume1 from "../../data/level1/volume-level1.json";
import volume2 from "../../data/level2/volume-level2.json";
import volume3 from "../../data/level3/volume-level3.json";
// import volume4 from "../../data/level4/volume-level4.json";


let levels = {
    level1: {bid: bid1, ask: ask1, cancel: cancel1, volume: volume1},
    level2: {bid: bid2, ask: ask2, cancel: cancel2, volume: volume2},
    level3: {bid: bid3, ask: ask3, cancel: cancel3, volume: volume3},
    // level4: {bid: bid4, ask: ask4, cancel: cancel4, volume: volume4}
};



export default levels;