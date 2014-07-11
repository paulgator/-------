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
    
var items=this.getItems();
var jumptime=this.getCooldown("jump");
var value=0;
var maxvalue=0;
var target=0;
var longJumpValue=[];
var enemy=this.getNearestEnemy();

for (var i=0;i<items.length;i++) {
    value=Math.pow(items[i].bountyGold,2)/Math.pow(getDistance(this.pos,items[i].pos),2);
    if (value>maxvalue && getDistance(items[i].pos,this.pos)<getDistance(items[i].pos,enemy.pos)) {
        maxvalue=value;
        target=items[i];
    }
}

if (jumptime===0) {
    longJumpValue=getLongJumpValue(items,this.pos);
}

if (items.length>0 && (jumptime>0 || longJumpValue[1]<=10)) {
    this.move(target.pos);
    } else if ((items.length>0 && jumptime===0 && longJumpValue[1]>10)) {
        switch (longJumpValue[0]) {
         case "up": this.jumpTo({x:this.pos.x,y:this.pos.y+70}); break;
         case "down": this.jumpTo({x:this.pos.x,y:this.pos.y-70}); break;
         case "right": this.jumpTo({x:this.pos.x+70,y:this.pos.y}); break;
         case "left": this.jumpTo({x:this.pos.x-70,y:this.pos.y}); break;
         }
         } else {
             this.moveXY (60,40);
             }


