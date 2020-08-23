import React, {useRef, useEffect, useState} from 'react';
import InputManager from '../../InputManager/InputManager';
import Player from '../../Player/Player';
import World from '../../World/World';

const ReactRogue = ({ width, height, tileSize}) => {
    const canvasRef = useRef();
    const [player, setPlayer] = useState(new Player(1, 2, tileSize));
    const [world, setWorld] = useState(new World(width, height, tileSize));
    let inputManager = new InputManager();

    const handleInput = (action, data) => {
        console.log(`handle input: ${action}: ${JSON.stringify(data)}`);
        let newPlayer = new Player();
        Object.assign(newPlayer, player);
        newPlayer.move(data.x, data.y);
        setPlayer(newPlayer);//we use this to update player state.
    };

    useEffect(()=> {
        console.log('Binding input...');
        inputManager.bindKeys();
        inputManager.subscribe(handleInput);
        return () => {
            inputManager.unbindKeys();
            inputManager.unsubscribe(handleInput);
        }
    })


    //useEffect is a lifecycle hook that gets called everytime the DOM gets changed in any way.
    useEffect(() => {
        console.log("Draw to canvas");
        const cntx = canvasRef.current.getContext('2d');
        cntx.clearRect(0,0, width * tileSize, height * tileSize);
        world.draw(cntx);
        player.draw(cntx);


    })

    return (
        <canvas 
            ref={canvasRef}
            width={width * tileSize} 
            height={height * tileSize} 
            style={{border: '1px solid black'}}
        ></canvas>
    )
    
};

export default ReactRogue;