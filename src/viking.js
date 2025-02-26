//Reusable functions
function getRdm(nb) {
  return Math.floor(Math.random() * (nb - 1));
}

// Soldier
class Soldier {
  constructor(health, strength) {
    this.health = health;
    this.strength = strength;
  }
  attack () {
    return this.strength;
  }
  receiveDamage(damage) {
    this.health -= damage;
  }
}

// Viking
class Viking extends Soldier {
  constructor(name, health, strength){
    super(health, strength);
    this.name = name;
  }
  receiveDamage(damage) {
    super.receiveDamage(damage);
    if(this.health > 0) {
      return `${this.name} has received ${damage} points of damage`
    } else {
      return `${this.name} has died in act of combat`
    }
  }
  battleCry() {
    return 'Odin Owns You All!'

  }
}

// Saxon
class Saxon extends Soldier {
  receiveDamage(damage) {
    super.receiveDamage(damage);
    if(this.health > 0) {
      return `A Saxon has received ${damage} points of damage`
    } else {
      return `A Saxon has died in combat`
    }
  }
}

// War
class War {
  constructor() {
    this.vikingArmy = [];
    this.saxonArmy = []; 
  }
  addViking(viking) {
    this.vikingArmy.push(viking);
  }
  addSaxon(saxon) {
    this.saxonArmy.push(saxon);
  }
  vikingAttack() {
    //let rdmSaxon = Math.floor(Math.random() * (this.saxonArmy.length - 1));
    let rdmSaxon = getRdm(this.saxonArmy.length);
    let rdmViking = getRdm(this.vikingArmy.length);
    let battleResult = this.saxonArmy[rdmSaxon].receiveDamage(this.vikingArmy[rdmViking].strength);
    if (battleResult === 'A Saxon has died in combat') {
      this.saxonArmy.splice(rdmSaxon,1);
    }
    return battleResult;
  }
  saxonAttack () {
    let rdmSaxon = getRdm(this.saxonArmy.length);
    let rdmViking = getRdm(this.vikingArmy.length);
    let battleResult = this.vikingArmy[rdmViking].receiveDamage(this.saxonArmy[rdmSaxon].strength);
    if (battleResult === `${this.vikingArmy[rdmViking].name} has died in act of combat`) {
      this.vikingArmy.splice(rdmViking,1);
    }
    return battleResult;
  }
  showStatus () {
    if (this.vikingArmy.length === 0) {
      return "Saxons have fought for their lives and survived another day..."
    } else if (this.saxonArmy.length === 0) {
      return "Vikings have won the war of the century!"
    } else if (this.vikingArmy.length > 0 && this.saxonArmy.length > 0) {
      return "Vikings and Saxons are still in the thick of battle."
    }
  }
 
}



// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = { Soldier, Viking, Saxon, War };
}
