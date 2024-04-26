class Move extends Phaser.Scene {
    constructor() {
        super("sceneName");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings

        // Create variables to hold constant values for sprite locations
        this.bodyX = 400;
        this.bodyY = 350;
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Shape Characters"
        // https://kenney.nl/assets/shape-characters
        this.load.setPath("./assets/Cards (large)/");
        // body
        this.load.image("image", "card_back.png");
        this.load.image("bullet", "card_hearts_A.png");
        // update instruction text
        document.getElementById('description').innerHTML = '<h2>move.js</h2>'
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability

        // Create the main body sprite
        this.my.sprite.cards = this.add.sprite(this.bodyX, this.bodyY, "image");
        this.my.sprite.bullet = this.add.sprite(this.bodyX, this.bodyY -50, "bullet");
        this.my.sprite.bullet.visible = false;

        /*
        note this is a diffrent implementation then i did before because my old version 
        was adding the move value infinetly to the move so it wasnt a clean movement so I 
        have sinced looked it up to solve that issue.
        */
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
    }

    update() {
        let my = this.my;    // create an alias to this.my for readability

        this.counter++;

        if (this.keyA.isDown) {
            this.my.sprite.cards.x -= 5;  // Move left
        }
        if (this.keyD.isDown) {
            this.my.sprite.cards.x += 5;  // Move right
        }
        this.my.sprite.cards.x = Phaser.Math.Clamp(this.my.sprite.cards.x, 0, this.sys.game.config.width-20);
        
        if (this.keySpace.isDown && !this.my.sprite.bullet.visible) {
            this.my.sprite.bullet.x = this.my.sprite.cards.x;  // Align bullet with player
            this.my.sprite.bullet.y = this.my.sprite.cards.y - 50;  // Start position just above the player
            this.my.sprite.bullet.visible = true;
        }

        // Bullet movement
        if (this.my.sprite.bullet.visible) {
            this.my.sprite.bullet.y -= 10;  // Move the bullet up

            // Hide the bullet if it goes off the screen
            if (this.my.sprite.bullet.y < 0) {
                this.my.sprite.bullet.visible = false;
            }
        }
    
    
    }

}