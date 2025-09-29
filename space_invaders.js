// title:   Space Invaders
// author:  Dielson Sales
// desc:    Testing the game
// site:    website link
// license: MIT
// version: 0.1
// script:  js

// Device constants
const screenWidth = 240
const screenHeight = 136
const up = 0
const left = 2
const right = 3
const down = 1
const fire = 4
const black = 0

let player = {
  x: screenWidth / 2,
  y: screenHeight - 8
}

class Bullet {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.length = 5
    this.color = 14
    this.speed = 2
  }
  isVisible() {
    return this.x > -1 && this.y > -1
      && this.x < screenWidth && this.y < screenHeight
  }
}

function move_bullet(bullet, direction) {
	if (direction === up) {
		bullet.y -= bullet.speed
	} else {
		bullet.y += bullet.speed
	}
}

// Player's bullets
let pBullets = []

function TIC(){
  cls(black)

  // Automatic movement
  for (let i = 0; i < pBullets.length; i++) {
    let bullet = pBullets[i]
    move_bullet(bullet, up)
  }
  // Removes non-visible bullets
  pBullets = pBullets.filter((bullet, _) => bullet.isVisible())

  // Checks user actions
  if (btn(left)) player.x -= 1
  if (btn(right)) player.x += 1
  if (btn(up)) player.y -= 1
  if (btn(down)) player.y += 1

  // Checks if user shoots
  if (btn(fire)) {
    pBullets.push(
      new Bullet(
        player.x + 4,
        player.y - 4
      )
    )
  }

  // Prevents space from being out of bounds
  if (player.x > screenWidth - 8) {
    player.x = screenWidth - 8
  }
  if (player.x < 0) {
    player.x = 0
  }
  if (player.y > screenHeight - 8) {
    player.y = screenHeight - 8
  }
  if (player.y < 0) {
    player.y = 0
  }

  // Draws the player
  spr(0, player.x, player.y)

  // Draws the bullets
  for (let i = 0; i < pBullets.length; i++) {
    let bullet = pBullets[i]
    line(bullet.x, bullet.y, bullet.x, bullet.y - 4, 2)
  }

  // Debug prints
  print("bullets: " + pBullets.length, 0, 0)
}

// <TILES>
// 000:00000000000000000002100000c21d0000cccd000ccccdd0ccccccdd00333300
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

