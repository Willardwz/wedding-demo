    //获得主界面
var mainDiv=document.getElementById("maindiv");
    //获得开始界面
var startdiv=document.getElementById("startdiv");
    //获得游戏中分数显示界面
var scorediv=document.getElementById("scorediv");
    //获得分数界面
var scorelabel=document.getElementById("label");
    //获得暂停界面
var suspenddiv=document.getElementById("suspenddiv");
    //获得游戏结束界面
var enddiv=document.getElementById("enddiv");
    //获得游戏结束后分数统计界面
var planscore=document.getElementById("planscore");
    //初始化分数
var scores=0;

/*
 创建人物类
 */
function plan(hp,X,Y,sizeX,sizeY,score,dietime,sudu,boomimage,imagesrc){
    this.planX=X;
    this.planY=Y;
    this.imagenode=null;
    this.planhp=hp;
    this.planscore=score;
    this.plansizeX=sizeX;
    this.plansizeY=sizeY;
    this.planboomimage=boomimage;
    this.planisdie=false;
    this.plandietimes=0;
    this.plandietime=dietime;
    this.plansudu=sudu;
//行为
/*
移动行为
     */
    this.planmove=function(){
        if(scores<=50000){
            this.imagenode.style.top=this.imagenode.offsetTop+this.plansudu+"px";
        }
        else if(scores>50000&&scores<=100000){
            this.imagenode.style.top=this.imagenode.offsetTop+this.plansudu+1+"px";
        }
        else if(scores>100000&&scores<=150000){
            this.imagenode.style.top=this.imagenode.offsetTop+this.plansudu+2+"px";
        }
        else if(scores>150000&&scores<=200000){
            this.imagenode.style.top=this.imagenode.offsetTop+this.plansudu+3+"px";
        }
        else if(scores>200000&&scores<=300000){
            this.imagenode.style.top=this.imagenode.offsetTop+this.plansudu+4+"px";
        }
        else{
            this.imagenode.style.top=this.imagenode.offsetTop+this.plansudu+5+"px";
        }
    }
    this.init=function(){
        this.imagenode=document.createElement("img");
        this.imagenode.style.left=this.planX+"px";
        this.imagenode.style.top=this.planY+"px";
        this.imagenode.src=imagesrc;
        mainDiv.appendChild(this.imagenode);
    }
    this.init();
}

/*
创建爱心类
 */
function bullet(X,Y,sizeX,sizeY,imagesrc){
    this.bulletX=X;
    this.bulletY=Y;
    this.bulletimage=null;
    this.bulletattach=1;
    this.bulletsizeX=sizeX;
    this.bulletsizeY=sizeY;
//行为
/*
 移动行为
 */
    this.bulletmove=function(){
        this.bulletimage.style.top=this.bulletimage.offsetTop-20+"px";
    }
    this.init=function(){
        this.bulletimage=document.createElement("img");
        this.bulletimage.style.left= this.bulletX+"px";
        this.bulletimage.style.top= this.bulletY+"px";
        this.bulletimage.src=imagesrc;
        mainDiv.appendChild(this.bulletimage);
    }
    this.init();
}

/*
 创建单行爱心类
 */
function oddbullet(X,Y){
    bullet.call(this,X,Y,6,14,"images/ax.jpg");
}

/*
创建敌方人物类
 */
function enemy(hp,a,b,sizeX,sizeY,score,dietime,sudu,boomimage,imagesrc){
    plan.call(this,hp,random(a,b),-100,sizeX,sizeY,score,dietime,sudu,boomimage,imagesrc);
}
//产生min到max之间的随机数
function random(min,max){
    return Math.floor(min+Math.random()*(max-min));
}

/*
创建本方人物类
 */
function ourplan(X,Y){
   var imagesrc="images/15.jpg";
   plan.call(this,1,X,Y,66,80,0,660,0,"images/boom.png",imagesrc);
   this.imagenode.setAttribute('id','ourplan');


//替换照片处
// var imgArr = ["images/15.jpg","images/16.jpg"];//图片路径数组
// var index = Math.floor((Math.random()*imgArr.length));//随机下标，保证随机的数字在数组中能取到
// var imagesrc = imgArr[index];//随机获取的图片路径
// plan.call(this,1,X,Y,66,80,0,660,0,"images/15.jpg",imagesrc);
// var imagenode = document.getElementById('imagenode');//获取需要改变的img标签
// this.imagenode.setAttribute('id','ourplan');//设置src属性

}

/*
 创建本方人物
 */
var selfplan=new ourplan(120,485);
//移动事件
var ourPlan=document.getElementById('ourplan');
var yidong=function(){
    var oevent=window.event||arguments[0];
    var chufa=oevent.srcElement||oevent.target;
    var selfplanX=oevent.clientX-500;
    var selfplanY=oevent.clientY;
    ourPlan.style.left=selfplanX-selfplan.plansizeX/2+"px";
    ourPlan.style.top=selfplanY-selfplan.plansizeY/2+"px";
//    document.getElementsByTagName('img')[0].style.left=selfplanX-selfplan.plansizeX/2+"px";
//    document.getElementsByTagName('img')[0]..style.top=selfplanY-selfplan.plansizeY/2+"px";
}
/*
暂停事件
 */
var number=0;
var zanting=function(){
    if(number==0){
        suspenddiv.style.display="block";
        if(document.removeEventListener){
            mainDiv.removeEventListener("mousemove",yidong,true);
            bodyobj.removeEventListener("mousemove",bianjie,true);
        }
        else if(document.detachEvent){
            mainDiv.detachEvent("onmousemove",yidong);
            bodyobj.detachEvent("onmousemove",bianjie);
        }
        clearInterval(set);
        number=1;
    }
    else{
        suspenddiv.style.display="none";
        if(document.addEventListener){
            mainDiv.addEventListener("mousemove",yidong,true);
            bodyobj.addEventListener("mousemove",bianjie,true);
        }
        else if(document.attachEvent){
            mainDiv.attachEvent("onmousemove",yidong);
            bodyobj.attachEvent("onmousemove",bianjie);
        }
        set=setInterval(start,20);
        number=0;
    }
}
//判断本方人物是否移出边界,如果移出边界,则取消mousemove事件,反之加上mousemove事件
var bianjie=function(){
    var oevent=window.event||arguments[0];
    var bodyobjX=oevent.clientX;
    var bodyobjY=oevent.clientY;
    if(bodyobjX<505||bodyobjX>815||bodyobjY<0||bodyobjY>568){
        if(document.removeEventListener){
            mainDiv.removeEventListener("mousemove",yidong,true);
        }
        else if(document.detachEvent){
            mainDiv.detachEvent("onmousemove",yidong);
        }
    }
    else{
        if(document.addEventListener){
            mainDiv.addEventListener("mousemove",yidong,true);
        }
        else if(document.attachEvent){
            mainDiv.attachEvent("nomousemove",yidong);
        }
    }
}
//暂停界面重新开始事件
//function chongxinkaishi(){
//    location.reload(true);
//    startdiv.style.display="none";
//    maindiv.style.display="block";
//}
var bodyobj=document.getElementsByTagName("body")[0];
if(document.addEventListener){
    //为本方人物添加移动和暂停
    mainDiv.addEventListener("mousemove",yidong,true);
    //为本方人物添加暂停事件
    selfplan.imagenode.addEventListener("click",zanting,true);
    //为body添加判断本方人物移出边界事件
    bodyobj.addEventListener("mousemove",bianjie,true);
    //为暂停界面的继续按钮添加暂停事件
    suspenddiv.getElementsByTagName("button")[0].addEventListener("click",zanting,true);
//    suspenddiv.getElementsByTagName("button")[1].addEventListener("click",chongxinkaishi,true);
    //为暂停界面的返回主页按钮添加事件
    suspenddiv.getElementsByTagName("button")[2].addEventListener("click",jixu,true);
}
else if(document.attachEvent){
    //为本方人物添加移动
    mainDiv.attachEvent("onmousemove",yidong);
    //为本方人物添加暂停事件
    selfplan.imagenode.attachEvent("onclick",zanting);
    //为body添加判断本方人物移出边界事件
    bodyobj.attachEvent("onmousemove",bianjie);
    //为暂停界面的继续按钮添加暂停事件
    suspenddiv.getElementsByTagName("button")[0].attachEvent("onclick",zanting);
//    suspenddiv.getElementsByTagName("button")[1].attachEvent("click",chongxinkaishi,true);
    //为暂停界面的返回主页按钮添加事件
    suspenddiv.getElementsByTagName("button")[2].attachEvent("click",jixu,true);
}
//初始化隐藏本方人物
selfplan.imagenode.style.display="none";

/*
敌方人物对象数组
 */
var enemys=[];

/*
爱心对象数组
 */
var bullets=[];
var mark=0;
var mark1=0;
var backgroundPositionY=0;
/*
开始函数
 */
function start(){
    mainDiv.style.backgroundPositionY=backgroundPositionY+"px";
    backgroundPositionY+=0.5;
    if(backgroundPositionY==568){
        backgroundPositionY=0;
    }
    mark++;
    /*
    创建敌方人物
     */

    if(mark==20){
        mark1++;
        // //中飞机
        // if(mark1%5==0){
        //     enemys.push(new enemy(6,25,274,46,60,5000,360,random(1,3),"images/中飞机爆炸.gif","image/enemy3_fly_1.png"));
        // }
        // //大飞机
        // if(mark1==20){
        //     enemys.push(new enemy(12,57,210,110,164,30000,540,1,"images/大飞机爆炸.gif","image/enemy2_fly_1.png"));
        //     mark1=0;
        // }
        //小飞机
        // else{
            enemys.push(new enemy(1,19,286,34,24,1000,360,random(1,4),"images/boom.png","images/16.jpg"));
        // }
        mark=0;
    }
/*
移动敌方人物
 */
    var enemyslen=enemys.length;
    for(var i=0;i<enemyslen;i++){
        if(enemys[i].planisdie!=true){
            enemys[i].planmove();
        }
/*
 如果敌方人物超出边界,删除敌方
 */
        if(enemys[i].imagenode.offsetTop>568){
            mainDiv.removeChild(enemys[i].imagenode);
            enemys.splice(i,1);
            enemyslen--;
        }
        //当敌方死亡标记为true时，经过一段时间后清除敌机
        if(enemys[i].planisdie==true){
            enemys[i].plandietimes+=20;
            if(enemys[i].plandietimes==enemys[i].plandietime){
                mainDiv.removeChild(enemys[i].imagenode);
                enemys.splice(i,1);
                enemyslen--;
            }
        }
    }

/*
创建爱心
*/
    if(mark%5==0){
            bullets.push(new oddbullet(parseInt(selfplan.imagenode.style.left)+31,parseInt(selfplan.imagenode.style.top)-10));
    }

/*
移动爱心
*/
    var bulletslen=bullets.length;
    for(var i=0;i<bulletslen;i++){
        bullets[i].bulletmove();
/*
如果爱心超出边界,删除爱心
*/
        if(bullets[i].bulletimage.offsetTop<0){
            mainDiv.removeChild(bullets[i].bulletimage);
            bullets.splice(i,1);
            bulletslen--;
        }
    }

/*
碰撞判断
*/
    for(var k=0;k<bulletslen;k++){
        for(var j=0;j<enemyslen;j++){
            //判断碰撞本方人物
            if(enemys[j].planisdie==false){
                if(enemys[j].imagenode.offsetLeft+enemys[j].plansizeX>=selfplan.imagenode.offsetLeft&&enemys[j].imagenode.offsetLeft<=selfplan.imagenode.offsetLeft+selfplan.plansizeX){
                  if(enemys[j].imagenode.offsetTop+enemys[j].plansizeY>=selfplan.imagenode.offsetTop+40&&enemys[j].imagenode.offsetTop<=selfplan.imagenode.offsetTop-20+selfplan.plansizeY){
                      //碰撞本方人物，游戏结束，统计分数
                      selfplan.imagenode.src="images/boom.png";
                      enddiv.style.display="block";
                      planscore.innerHTML=scores;
                      if(document.removeEventListener){
                          mainDiv.removeEventListener("mousemove",yidong,true);
                          bodyobj.removeEventListener("mousemove",bianjie,true);
                      }
                      else if(document.detachEvent){
                          mainDiv.detachEvent("onmousemove",yidong);
                          bodyobj.removeEventListener("mousemove",bianjie,true);
                      }
                      clearInterval(set);
                  }
                }
                //判断爱心与敌方碰撞
                if((bullets[k].bulletimage.offsetLeft+bullets[k].bulletsizeX>enemys[j].imagenode.offsetLeft)&&(bullets[k].bulletimage.offsetLeft<enemys[j].imagenode.offsetLeft+enemys[j].plansizeX)){
                    if(bullets[k].bulletimage.offsetTop<=enemys[j].imagenode.offsetTop+enemys[j].plansizeY&&bullets[k].bulletimage.offsetTop+bullets[k].bulletsizeY>=enemys[j].imagenode.offsetTop){
                        //敌方血量减爱心攻击力
                        enemys[j].planhp=enemys[j].planhp-bullets[k].bulletattach;
                        //敌方血量为0，敌方图片换为爆炸图片，死亡标记为true，计分
                        if(enemys[j].planhp==0){
                            scores=scores+enemys[j].planscore;
                            scorelabel.innerHTML=scores;
                            enemys[j].imagenode.src=enemys[j].planboomimage;
                            enemys[j].planisdie=true;
                        }
                        //删除爱心
                        mainDiv.removeChild(bullets[k].bulletimage);
                            bullets.splice(k,1);
                            bulletslen--;
                            break;
                    }
                }
            }
        }
    }
}
/*
开始游戏按钮点击事件
 */
var set;
function begin(){

    startdiv.style.display="none";
    mainDiv.style.display="block";
    selfplan.imagenode.style.display="block";
    scorediv.style.display="block";
    /*
     调用开始函数
     */
    set=setInterval(start,20);
}
//游戏结束后点击继续按钮事件
function jixu(){
    location.reload(true);
}

/*
    完成界面的初始化
    敌方一个
    我方一个
 */
