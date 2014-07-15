function getDistance(a,b) {
    return Math.sqrt(Math.pow(a.x-b.x,2)+Math.pow(a.y-b.y,2));
}

function getLongJumpValue(a,b) {
    var right=0; var left=0; var up=0; var down=0;
    if (a.length===0) {
        return [];
    }
    for (var i=0;i<a.length;i++) {
        if (a[i].pos.x>b.x && a[i].pos.x<b.x+70 && a[i].pos.y>b.y-5 && a[i].pos.y<b.y+5) {
            right+=a[i].bountyGold;
            } else if (a[i].pos.x<b.x && a[i].pos.x>b.x-70 && a[i].pos.y>b.y-5 && a[i].pos.y<b.y+5) {
                left+=a[i].bountyGold;
                } else if (a[i].pos.x<b.x+5 && a[i].pos.x>b.x-5 && a[i].pos.y>b.y && a[i].pos.y<b.y+70) {
                    up+=a[i].bountyGold;
                    } else if (a[i].pos.x<b.x+5 && a[i].pos.x>b.x-5 && a[i].pos.y<b.y && a[i].pos.y>b.y+70) {
                        down+=a[i].bountyGold;
                        }
    }
    if (Math.max(up,down,left,right)==up) {
        return ["up",up];
        } else if (Math.max(up,down,left,right)==down) {
            return ["down",down];
            } else if (Math.max(up,down,left,right)==right) {
                return ["right",right];
                } else if (Math.max(up,down,left,right)==left) {
                    return ["left",left];
                    } else {
                        return [];
                        }
}

function getValuableTarget(a,s,e) {
    var v=0;
    var mv=0;
    var t=0;
        for (var i=0;i<a.length;i++) {
            v=Math.pow(a[i].bountyGold,2)/Math.pow(getDistance(s.pos,a[i].pos),2);
            if (v>mv && getDistance(a[i].pos,s.pos)<getDistance(a[i].pos,e.pos)) {
                mv=v;
                t=a[i];
            }
        }    
    return t;
}

function getClosestTarget(a,s,e) {
    var v=0;
    var mv=0;
    var t=0;
        for (var i=0;i<a.length;i++) {
            v=Math.pow(a[i].bountyGold,1)/Math.pow(getDistance(s.pos,a[i].pos),2);
            if (v>mv && getDistance(a[i].pos,s.pos)<getDistance(a[i].pos,e.pos)) {
                mv=v;
                t=a[i];
            }
        }    
    return t;
}

var items=this.getItems();
var jumptime=this.getCooldown("jump");
var enemy=this.getNearestEnemy();
var target=0;
var enemyTargetClosest=getClosestTarget(items,enemy,this);
var enemyTargetValuable=getValuableTarget(items,enemy,this);

if (enemy.gold-this.gold<15) {
    target=getValuableTarget(items,this,enemy);
    } else {
    target=getClosestTarget(items,this,enemy);
    }

if (jumptime===0) {
    var longJumpValue=getLongJumpValue(items,this.pos);
}

if (jumptime===0 && ((enemyTargetClosest.bountyGold==5 && getDistance(enemyTargetClosest.pos,enemy.pos>26) && getDistance(enemyTargetClosest.pos,enemy.pos<50) && getDistance(enemyTargetClosest.pos,this.pos<70)) || (enemyTargetValuable==5 && getDistance(enemyTargetValuable.pos,enemy.pos>26) && getDistance(enemyTargetValuable.pos,enemy.pos<50) && getDistance(enemyTargetValuable.pos,this.pos<70)))) {
            if (enemyTargetClosest.bountyGold==5) {
                this.jumpTo(enemyTargetClosest.pos);
            } else {
                this.jumpTo(enemyTargetValuable.pos);
            }
    } else {
        if (target!==0 && items.length>0 && (jumptime>0 || (longJumpValue[1]<=11 && longJumpValue[1]<150-this.gold)|| target.bountyGold>3)) {
            this.move(target.pos);
            } else if ((target!==0 && items.length>0 && jumptime===0 && (longJumpValue[1]>11 || longJumpValue>=150-this.gold))) {
                switch (longJumpValue[0]) {
                case "up": this.jumpTo({x:this.pos.x,y:this.pos.y+70}); break;
                case "down": this.jumpTo({x:this.pos.x,y:this.pos.y-70}); break;
                case "right": this.jumpTo({x:this.pos.x+70,y:this.pos.y}); break;
                 case "left": this.jumpTo({x:this.pos.x-70,y:this.pos.y}); break;
                }
            } else {
                this.moveXY (60,40);
            }
}


      }
            } else {
                this.moveXY (60,40);
            }
}


