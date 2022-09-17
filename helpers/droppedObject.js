import { isHit }  from './hit.js'

const canvas  = document.getElementById('game_screen');
const ctx     = canvas.getContext('2d');
const OBJECTS = [
  'heart',
];

export const CHANCE_OF_DROP = 0.05;

export default class DroppedObject {

  constructor(game, position) {
    this.game_width   = game.game_width;
    this.game_height  = game.game_height;
    this.game         = game;
    this.object       = this.getRandomObject();
    this.image        = document.getElementById(this.object);
    this.size         = 30;
    this.position     = position;
    this.position.x   = position.x + (this.size / 2);
    this.speed        = 7.5;
    this.name = 'droppedObject';
  }
  

  draw(droppedObjectIndex) {
    this.update();
    ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    
    if(isHit(this, this.game.paddle)) {
      this.game.lives++;
      this.game.droppedObjects.splice(droppedObjectIndex, 1);
    }
  }

  update() {
    this.position.y += this.speed;
  }

  getRandomObject() {
    const totalItems      = OBJECTS.length;
    const randomItemIndex = Math.floor(Math.random() * totalItems);
    return OBJECTS[randomItemIndex];
  }
}