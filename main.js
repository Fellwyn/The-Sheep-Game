import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs";

kaboom({
    width: 1280,
    height: 820,

});

setBackground(Color.fromHex('#36A6E0'))

//player sprites
loadSprite("player", "./resurssit/img/lamb1.png");
loadSprite('left', './resurssit/img/lamb_left.png');
loadSprite("up", "./resurssit/img/lamb_up.png");
loadSprite('down', './resurssit/img/lamb_down.png');


//land
loadSprite("grass1", "./resurssit/img/grass/grass1.png")
loadSprite("ground1", "./resurssit/img/grass/ground_green1.png")
loadSprite("edge_down", "./resurssit/img/grass/edge_down.png")
loadSprite("edge_right", "./resurssit/img/grass/edge_right.png")
loadSprite("grass_edge_right", "./resurssit/img/grass/grass_edge_right.png")
loadSprite("edge_side", "./resurssit/img/grass/edge_downside.png")

loadSprite("bush", "./resurssit/img/trees/bush1.png")
loadSprite("tree", "./resurssit/img/trees/tree1.png")
loadSprite("yellow", "./resurssit/img/trees/yellow_flower.png")

loadSprite("fence", "./resurssit/img/trees/fence1.png")
loadSprite("fence_side", "./resurssit/img/trees/fence_side.png")
loadSprite("hay", "./resurssit/img/trees/hay.png")


//sounds
loadSound('music', "resurssit/sounds/oga_majitapioka.mp3")
loadSound('baa', "resurssit/sounds/baa.mp3")


//landing
scene('landing', () => {
    add([
        text('Start the game'),
        pos(width() / 2.5, height() / 2),
    ])
    onClick(() => go('game'))
})






//game
scene('game', () => {
    const music = play("music", {
        volume: 0.8,
        loop: false,
    })

const map = addLevel([
    '11111111111111114',
    '12222222222222224',
    '12222222222222224',
    '11111112111211114',
    '22222222111222224',
    '22222222222222224',
    '2222222222253336',
    '111111111115    ',
    '12222222222211114',
    '12222222222222214',
    '12222222222222214',
    '11111111111111114',
    '3333333333333336',
], 
    {
tileWidth: 48,
tileHeight: 48,
tiles: {
    1: () => [
    sprite('grass1'),
    area(),
    
    body({isStatic: true})
    ],
    2: () => [
        sprite('ground1'),
        area(),
       body({isStatic: true})
    ],
    3: () => [
        sprite('edge_down'),
        area(),
        body({isStatic: true}),
    ],
    4: () => [
        sprite('edge_right'),
        area(),
        body({isStatic: true}),
    ],
    5: () => [
        sprite('grass_edge_right'),
        area(),
        body({isStatic: true}),
    ],
    6: () => [
        sprite('edge_side'),
        area(),
        body({isStatic: true}),
    ]


}},
)
//bush  layer
addLevel([
    '6                ',
    '       4  3 6    ',
    '   4    111      ',
    '        2 52     ',
    '        1112     ',
    '               3 ',
    ' 3    6          ',
    '  34            ',
    '  6       6 4    ',
    '   3             ',
    '                 ',
    '     4           ',
], 
    {
tileWidth: 48,
tileHeight: 48,
tiles: {

    1: () => [
        sprite('fence'),

        area(),
        body({isStatic: true}),
    ],
    2: () => [
        sprite('fence_side'),
  
        area(),
        body({isStatic: true}),
    ],
    3: () => [
        sprite('bush'),
        area(),
        body({isStatic: true}),
    ],
    4: () => [
        sprite('yellow'),
        area(),
        
        body({isStatic: true}),
        'yellow' //putting the name it brings the object to the game
    ],
    5: () => [
        sprite('hay'),
        area(),
        body({isStatic: true}),
        'hay'
    ],
    6: () => [
        sprite('tree'),
        area(),
        scale(2),
        body({isStatic: true}),
        'tree'
    ],
    9: () => [
        rect(16, 48),
        opacity(1),
        area(),
        //area({  ///HOWWW
        //shape: new Rect(vec2(0), 16, 48), 
        //offset: vec2(1, -4)}),

        body({isStatic: true}), //is this is without isStatic/empty, they are more solid
       
       
        'wall'
    ],

}},
)







const player = add([
    sprite("player"),
    pos(70, 190),
    area(),
    body({isStatic: true}),
    anchor('center'),
    {
        currentSprite: 'player',
        speed: 300,

    },
    'player'
])




onKeyDown('up', () => {
    player.move(0, -player.speed)
    player.use(sprite('up'))
})

onKeyDown('right', () => {
    player.move(player.speed, 0)
    player.use(sprite('player'))
})

onKeyDown('down', () => {
    player.move(0, player.speed)
    player.use(sprite('down'))
})


onKeyDown('left', () => {
    player.move(-player.speed, 0)
    player.use(sprite('left'))
})




//collecting flowers

let collectCounter = 0;

const collectLabel = add([
    text(collectCounter),
    pos(24, 24),

])

//collide flower
player.onCollide('yellow', (y) => {   
  collectCounter+=1
  collectLabel.text = collectCounter;
  play('baa')
  destroy(y)

})


//collect flowers and go home -> win
player.onCollide('hay', () => {
    shake(5)

    if(collectCounter === 5 ){
        
    
        wait(.4, () => {
            go("win")
        });
    }
})

player.onCollide('bush', () => {

})


player.onCollide('wall', () => {
   
})


scene("win", () => {
    add([
        text("You collected all the flowers! :3" , 24),

        pos(width() / 2, height() / 2),
        anchor("center"),
        
    ])

    music.paused = true
    onClick(() => go("game"));
})



//game end bracets
})




go("landing");