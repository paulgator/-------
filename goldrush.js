function getDistance(a,b) {
    return Math.sqrt(Math.pow(a.x-b.x,2)+Math.pow(a.y-b.y,2));
}

var items=this.getItems();
var jumptime=this.getCooldown("jump");
var value=0;
var maxvalue=0;
var target=0;


for (var i=0;i<items.length;i++) {
    value=Math.pow(items[i].bountyGold,2)/Math.pow(getDistance(this.pos,items[i].pos),2);
    if (value>maxvalue) {
        maxvalue=value;
        target=items[i];
    }
}

if (items.length>0) {
    this.move(target.pos);
    } else {
    this.moveXY (60,40);
    }


