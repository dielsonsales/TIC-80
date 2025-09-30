// title:   Space Invaders
// author:  Dielson Sales
// desc:    Testing the game
// site:    website link
// license: MIT
// version: 0.1
// script:  js

// Device constants
const SCREEN_WIDTH = 240
const SCREEN_HEIGHT = 136
const UP = 0
const LEFT = 2
const RIGHT = 3
const DOWN = 1
const FIRE_BTN = 4
const BLACK = 0
const SPRITE_SIZE = 8
const SPACESHIP_SIZE = SPRITE_SIZE

class Position {
  constructor(x, y) {
    this.x = x,
    this.y = y
  }
}

class Area {
  constructor(initialPosition, width, height) {
    this.initialPosition = initialPosition
    this.width = width
    this.height = height
  }
  isVisible() {
    return this.initialPosition.x < SCREEN_WIDTH
      && this.initialPosition.y < SCREEN_HEIGHT
      && (this.initialPosition.x + this.width) > -1
      && (this.initialPosition.y + this.height) > -1
  }
  finalPosition() {
    return new Position(
      this.initialPosition.x + this.width,
      this.initialPosition.y + this.height
    )
  }
  description() {
    return "[" + this.initialPosition.x + ", " + this.initialPosition.y + ", " + this.finalPosition().x + ", " + this.finalPosition().y + "]"
  }
}

class SpaceShip {
  static speed = 2
  constructor(x, y) {
    this.area = new Area(
      new Position(x, y),
      SPACESHIP_SIZE,
      SPACESHIP_SIZE
    )
  }
}

class Bullet {
  static length = 5
  static speed = 2
  constructor(initialPosition) {
    this.area = new Area(initialPosition, 1, Bullet.length)
    this.color = 14
  }
  move(direction) {
    if (direction == UP) {
      this.area.initialPosition.y -= Bullet.speed
    } else {
      this.position.y += Bullet.speed
    }
  }
}

let player = new SpaceShip(
  SCREEN_WIDTH / 2,
  SCREEN_HEIGHT - SPACESHIP_SIZE
)
let playerBullets = []

function TIC(){
  cls(BLACK)

  // Automatic movement
  for (const bullet of playerBullets) {
    bullet.move(UP)
  }
  // Removes non-visible bullets
  playerBullets = playerBullets.filter((bullet, _) => bullet.area.isVisible())

  // Checks user actions
  if (btn(LEFT)) player.area.initialPosition.x -= SpaceShip.speed
  if (btn(RIGHT)) player.area.initialPosition.x += SpaceShip.speed
  if (btn(UP)) player.area.initialPosition.y -= SpaceShip.speed
  if (btn(DOWN)) player.area.initialPosition.y += SpaceShip.speed

  // Checks if user shoots
  if (btn(FIRE_BTN)) {
    playerBullets.push(
      new Bullet(
        new Position(
          player.area.initialPosition.x + player.area.width / 2,
          player.area.initialPosition.y - 4
        )
      )
    )
  }

  // Prevents space from being out of bounds
  if (player.area.finalPosition().x > SCREEN_WIDTH) {
    player.area.initialPosition.x = SCREEN_WIDTH - player.area.width
  }
  if (player.area.initialPosition.x < 0) {
    player.area.initialPosition.x = 0
  }
  if (player.area.finalPosition().y > SCREEN_HEIGHT) {
    player.area.initialPosition.y = SCREEN_HEIGHT - player.area.height
  }
  if (player.area.initialPosition.y < 0) {
    player.area.initialPosition.y = 0
  }

  // Draws the player
  spr(0, player.area.initialPosition.x, player.area.initialPosition.y)

  // Draws the bullets
  for (const bullet of playerBullets) {
    line(
      bullet.area.initialPosition.x,
      bullet.area.initialPosition.y,
      bullet.area.initialPosition.x,
      bullet.area.finalPosition().y,
      2
    )
  }

  // Debug prints
  print("bullets: " + playerBullets.length, 0, 0)
  print("spaceship area: " + player.area.description(), 0, SPRITE_SIZE)
}

// <TILES>
// 000:000000000002100000c21d0000cccd000ccccdd0ccccccdd0033330000033000
// </TILES>

// <WAVES>
// 000:00000000ffffffff00000000ffffffff
// 001:0123456789abcdeffedcba9876543210
// 002:0123456789abcdef0123456789abcdef
// </WAVES>

// <SFX>
// 000:000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000304000000000
// </SFX>

// <TRACKS>
// 000:100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// </TRACKS>

// <PALETTE>
// 000:1a1c2c5d275db13e53ef7d57ffcd75a7f07038b76425717929366f3b5dc941a6f673eff7f4f4f494b0c2566c86333c57
// </PALETTE>

