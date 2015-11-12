// Enemies our player must avoid
var Enemy = function() {
    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
    // ensures enemy smoothly transitions into frame
    this.x = -100;
    // creates a random speed for each new enemy
    this.speed = Math.floor(Math.random()*200) + 80;
    // designates a random row for each enemy to move in
    var randomPosition = Math.floor(Math.random()*3) + 1;
    if (randomPosition == 1) {
        this.y = 220;
    }
    else if (randomPosition == 2) {
        this.y = 140;
    }
    else {
        this.y = 60; 
    }
};

Enemy.prototype.update = function(dt) {
    this.checkCollision();
    this.y = this.y;
    if (this.x < 510) {
        this.x = this.x + this.speed * dt;
    }
    else {
        this.x = -100;
    }
};

// Draws the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Checks whether or not the player has collided with the enemy
Enemy.prototype.checkCollision = function () {
    if(this.x < player.x + 70  && this.x + 70  > player.x && this.y < player.y + 60 && this.y + 60 > player.y) {
        player.x = 200;
        player.y = 400;
    }
};

var Player = function() {
    this.sprite = 'images/char-horn-girl.png';
    this.x = 200;
    this.y = 400;
};

Player.prototype.update = function(dt) {
    this.x = this.x;
    this.y = this.y;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    switch(key) {
        case "left":
            if(this.x != 0){
                this.x -= 100;
            }
            break;
        case "up":
            if(this.y != 40){
                this.y -= 90;
            }
            else {
                //reset player
                this.x = 200;
                this.y = 400;
                alert("You won!");
            }
            break;
        case "right":
            if(this.x != 400){
                this.x += 100;
            }
            break;
        case "down":
            if(this.y != 400){
                this.y += 90;
            }
            break;
        default:
    }
};

var allEnemies = [];
for (var i = 0; i < 4; i++) {
    allEnemies.push(new Enemy());
}

var player = new Player();

// Listens for key presses and sends the keys to the
//Player.handleInput() method
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
