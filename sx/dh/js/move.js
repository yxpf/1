function getStyle(obj,attr){

    if(obj.currentStyle){

        return obj.currentStyle[attr];

    }else{

        return getComputedStyle(obj,false)[attr];

    }

}

//随意属性值

//startMove(obj,{attr1:iTarget1,attr2:iTarget2},fn)

function startMove(obj,json,fn){

    

    clearInterval(obj.timer);          

    obj.timer = setInterval(function(){
    	
    	var flat = true;  //true：都到达了

        for(var attr in json){

            var icur = 0;

            //检测属性

            if(attr == 'opacity'){

                icur = Math.round(parseFloat(getStyle(obj,attr))*100);

            }else{

                icur = parseInt(getStyle(obj,attr));

            }

            //算速度

            var speed = (json[attr]-icur)/8;

            speed = speed>0?Math.ceil(speed):Math.floor(speed);

            //判断运行状态

            if(icur != json[attr]){ //所有的运动还没完成

                flat = false;

            }

            if(attr == 'opacity'){

                obj.style.filter = 'alpha(opacity:'+(icur + speed)+')';

                obj.style.opacity = (icur + speed)/100;

            }else{

                obj.style[attr] = icur + speed +'px';  

            }

            if(flat == true){

                clearInterval(obj.timer);

                if(fn){

                    fn();

                }

            }

        }

    },30);

}

