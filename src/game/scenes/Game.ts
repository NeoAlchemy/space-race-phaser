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

        this.rightShip = this.physics.add.sprite(325, 584, 'spaceship');
        this.leftShip = this.physics.add.sprite(150, 584, 'spaceship');
    }

    update() {
        if (this.joystick.up) {
            this.rightShip.setVelocityY(-100)
        }
        else if (this.joystick.down) {
            this.rightShip.setVelocityY(100)
        } else {
            this.rightShip.setVelocity(0)
        }

        if (this.cursorKeys && this.cursorKeys.up.isDown) {
            this.rightShip.setVelocityY(-100)
        }
        else if (this.cursorKeys && this.cursorKeys.down.isDown) {
            this.rightShip.setVelocityY(100)
        } else {
            this.rightShip.setVelocity(0)
        }
    }
}
