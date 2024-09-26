import { Scene } from 'phaser';

export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.
        this.add.text(20, 20, 'Boot Sequence Initiated.');
        this.load.bitmapFont({
            key: 'Oswald',
            textureURL: 'assets/font/OswaldLightRed.png',
            fontDataURL: 'assets/font/OswaldLightRed.xml',
        });
        this.load.image('logo', 'assets/logo.png');
        this.load.image('splashscreen', 'assets/splashscreen.png');
    }

    create ()
    {
        const deviceOS = this.sys.game.device.os;
        
        if (deviceOS.android || deviceOS.iOS) {
            this.scale.scaleMode = Phaser.Scale.FIT;
        } else {
            this.scale.scaleMode = Phaser.Scale.NONE;
        }
        this.scene.start('Preloader');
    }
}
