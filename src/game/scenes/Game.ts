import { AppConstants } from '../util/AppConstants'
import { GameObjects, Scene } from 'phaser';

export class Game extends Scene
{
    leftScoreText!: Phaser.GameObjects.Text;
    leftScore!: number;
    rightScoreText!: Phaser.GameObjects.Text;
    rightScore!: number;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.cameras.main.setBackgroundColor(0x000000);
        this.leftScore = 0;
        this.leftScoreText = this.add.text(80, 750, this.leftScore.toString(), { font: '48px Verdana', color: AppConstants.FOREGROUND_COLOR_HEX });
        this.rightScore = 0;
        this.rightScoreText = this.add.text(380, 750, this.rightScore.toString(), { font: '48px Verdana', color: AppConstants.FOREGROUND_COLOR_HEX });
        
        this.add.rectangle(235, 700, 10, 200, 0xFFFFFF)

    }
}
