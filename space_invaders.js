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

class Position {
  constructor(x, y) {
    this.x = x,
    this.y = y
  }
}

class Area {
  constructor(initialPosition, finalPosition) {
    this.initialPosition = initialPosition
    this.finalPosition = finalPosition
    this.height = finalPosition.y - initialPosition.y
    this.width = finalPosition.x - initialPosition.x
  }
  isVisible() {
    return this.initialPosition.x < SCREEN_WIDTH
      && this.initialPosition.y < SCREEN_HEIGHT
      && this.finalPosition.x > -1
      && this.finalPosition.y > -1
  }
}

class Size {
  constructor(width, height) {
    this.width = width
    this.height = height
  }
}

class SpaceShip {
  static speed = 2
  constructor(x, y) {
    this.position = new Position(x, y)
    this.size = new Size(8, 8)
  }
}

class Bullet {
  static length = 5
  static speed = 2
  constructor(x, y) {
    this.position = new Position(x, y)
    this.color = 14
  }
  isVisible() {
    return this.position.x > -1 && this.position.y > -1
      && this.position.x < SCREEN_WIDTH && this.position.y < SCREEN_HEIGHT
  }
  move(direction) {
    if (direction == UP) {
      this.position.y -= Bullet.speed
    } else {
      this.position.y += Bullet.speed
    }
  }
}

let player = new SpaceShip(
  SCREEN_WIDTH / 2,
  SCREEN_HEIGHT - 8
)
let playerBullets = []

function TIC(){
  cls(BLACK)

  // Automatic movement
  for (const bullet of playerBullets) {
    bullet.move(UP)
  }
  // Removes non-visible bullets
  playerBullets = playerBullets.filter((bullet, _) => bullet.isVisible())

  // Checks user actions
  if (btn(LEFT)) player.position.x -= SpaceShip.speed
  if (btn(RIGHT)) player.position.x += SpaceShip.speed
  if (btn(UP)) player.position.y -= SpaceShip.speed
  if (btn(DOWN)) player.position.y += SpaceShip.speed

  // Checks if user shoots
  if (btn(FIRE_BTN)) {
    playerBullets.push(
      new Bullet(
        player.position.x + 4,
        player.position.y - 4
      )
    )
  }

  // Prevents space from being out of bounds
  if (player.position.x > SCREEN_WIDTH - 8) {
    player.position.x = SCREEN_WIDTH - 8
  }
  if (player.position.x < 0) {
    player.position.x = 0
  }
  if (player.position.y > SCREEN_HEIGHT - 8) {
    player.position.y = SCREEN_HEIGHT - 8
  }
  if (player.position.y < 0) {
    player.position.y = 0
  }

  // Draws the player
  spr(0, player.position.x, player.position.y)

  // Draws the bullets
  for (const bullet of playerBullets) {
    line(bullet.position.x, bullet.position.y, bullet.position.x, bullet.position.y - Bullet.length, 2)
  }

  // Debug prints
  print("bullets: " + playerBullets.length, 0, 0)
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

