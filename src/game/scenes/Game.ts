import { AppConstants } from '../util/AppConstants'
import { GameObjects, Scene } from 'phaser';

export class Game extends Scene
{
    leftScoreText!: GameObjects.Text;
    leftScore!: number;
    rightScoreText!: GameObjects.Text;
    rightScore!: number;
    joystick!: any;
    cursorKeys!: any;
    rightShip!: Phaser.Physics.Arcade.Sprite;
    leftShip!: Phaser.Physics.Arcade.Sprite;
    asteroidGroup!: Phaser.Physics.Arcade.Group;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.cameras.main.setBackgroundColor(0x000000);

        const rexVirtualJoyStickPlugin: any = this.plugins.get('rexvirtualjoystickplugin');
        const joystick = rexVirtualJoyStickPlugin.add(this, {
            x: AppConstants.JOYSTICK_X,
            y: AppConstants.JOYSTICK_Y,
            radius: AppConstants.JOYSTICK_RADIUS,
            base: this.add.circle(0, 0, AppConstants.JOYSTICK_BASE_SIZE, AppConstants.JOYSTICK_BASE_COLOR),
            thumb: this.add.circle(0, 0, AppConstants.JOYSTICK_THUMB_SIZE, AppConstants.JOYSTICK_THUMB_COLOR),
            dir: AppConstants.JOYSTICK_DIR,
            enable: true
        });
        this.joystick = joystick;

        if (this.input.keyboard) {
            this.cursorKeys = this.input.keyboard.createCursorKeys();
        }


        this.leftScore = 0;
        this.leftScoreText = this.add.text(80, 550, this.leftScore.toString(), { font: '48px Verdana', color: AppConstants.FOREGROUND_COLOR_HEX });
        this.rightScore = 0;
        this.rightScoreText = this.add.text(380, 550, this.rightScore.toString(), { font: '48px Verdana', color: AppConstants.FOREGROUND_COLOR_HEX });
        
        this.add.rectangle(245, 550, 10, 100, 0xFFFFFF)
        this.add.rectangle(240, 600, 480, 1, 0xFFFFFF)

        this.rightShip = this.physics.add.sprite(325, AppConstants.SHIP_STARTING_POINT, 'spaceship');
        this.leftShip = this.physics.add.sprite(150, AppConstants.SHIP_STARTING_POINT, 'spaceship');
        

        this.physics.world.setBounds(0, 0, this.scale.width, this.scale.height);
        this.leftShip.setCollideWorldBounds(true);
        this.rightShip.setCollideWorldBounds(true);

        this.asteroidGroup = this.physics.add.group({
            key: 'asteroid',   
            repeat: 40,        
            setXY: {           
                x: Phaser.Math.Between(0, this.scale.width),  // Random X position
                y: Phaser.Math.Between(0, this.scale.height), // Random Y position
            }
        });

        this.asteroidGroup.children.iterate((asteroid: GameObjects.GameObject) => {
            const asteroidSprite = asteroid as Phaser.Physics.Arcade.Sprite;
            asteroidSprite.setPosition(
                Phaser.Math.Between(0, 480),  // Random X velocity
                Phaser.Math.Between(0, 500)   // Random Y velocity
            );
            asteroidSprite.setCollideWorldBounds(true);  // Make sure asteroids bounce off world bounds
            asteroidSprite.setBounce(1);                 // Set a bounce effect
            asteroidSprite.setVelocityX(Phaser.Math.Between(-150, 150));  // Random rotation
            return null;
        });

        this.physics.add.collider(this.rightShip, this.asteroidGroup, this.asteroidHitShip, undefined, this)
    }

    update() {
        let velocityY = 0;  // Set a default velocity of 0

        // Joystick movement detection
        if (this.joystick) {
            if (this.joystick.up) {
                velocityY = -AppConstants.SHIP_VELOCITY;  // Move up
            } else if (this.joystick.down) {
                velocityY = AppConstants.SHIP_VELOCITY;  // Move down
            }
        }

        // Keyboard movement detection
        if (this.cursorKeys) {
            if (this.cursorKeys.up.isDown) {
                velocityY = -AppConstants.SHIP_VELOCITY;  // Override with keyboard up
            } else if (this.cursorKeys.down.isDown) {
                velocityY = AppConstants.SHIP_VELOCITY;  // Override with keyboard down
            }
        }

        // Apply the velocity to the right ship
        this.rightShip.setVelocityY(velocityY);

        // Check for collisions or scoring conditions
        this._hitCeiling();
    }

    asteroidHitShip(ship: any, asteroid: any) {
        asteroid.setVelocityX(0);
        ship.setVelocityX(0)
        this.rightShip.y = AppConstants.SHIP_STARTING_POINT
    }

    _hitCeiling() {
        if (this.rightShip.y == (this.rightShip.height / 2)) {
            this.rightScore++
            this.rightScoreText.setText(this.rightScore.toString())
            this.rightShip.y = AppConstants.SHIP_STARTING_POINT
        }
        if (this.leftShip.y == (this.leftShip.height / 2)) {
            this.leftScore++
            this.leftScoreText.setText(this.leftScore.toString())
            this.leftShip.y = AppConstants.SHIP_STARTING_POINT
        }
    }
}
