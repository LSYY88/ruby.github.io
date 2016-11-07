
var line1=[
    {
        "moveX":52,
        "moveY":115,
        "toX":31,
        "toY":0
    },
    {
        "moveX":82,
        "moveY":115,
        "toX":0,
        "toY":-89
    },
    {
        "moveX":82,
        "moveY":27,
        "toX":100,
        "toY":0
    },
    {
        "moveX":182,
        "moveY":27,
        "toX":0,
        "toY":90
    },

     {
        "moveX":182,
        "moveY":116,
        "toX":-80,
        "toY":0
    },
    {
        "moveX":102,
        "moveY":116,
        "toX":0,
        "toY":-10
    }
]
var line2=[

{
        "moveX":26,
        "moveY":28,
        "toX":154,
        "toY": 0
        },
    
    {
        "moveX":180,
        "moveY":28,
        "toX":0,
        "toY":40
    },
    {
        "moveX": 180,
        "moveY": 68,
        "toX": -15,
        "toY": 0
        },
    {
        "moveX": 180,
        "moveY": 68,
        "toX": 0,
        "toY":47
        },
     {
        "moveX":181,
        "moveY":116,
        "toX":-79,
        "toY":0
    },
    {
        "moveX":103,
        "moveY":116,
        "toX":0,
        "toY":-10
    }

]
var line3=[
    {
        "moveX":295,
        "moveY":10,
        "toX":0,
        "toY":105
    },
    {
       "moveX":295,
        "moveY":115,
        "toX":-194,
        "toY":0  
    },
    {
       "moveX":101,
        "moveY":115,
        "toX":0,
        "toY":-10  
    }
    

]
var line4=[
    {
       "moveX":295,
        "moveY":140,
        "toX":0,
        "toY":-25  
    },
    {
       "moveX":295,
        "moveY":115,
        "toX":-193,
        "toY":0  
    },
    {
      "moveX":102,
        "moveY":115,
        "toX":0,
        "toY":-10    
    }

]
var line5=[
    {
       "moveX":180,
        "moveY":140,
        "toX":0,
        "toY":-25    
    },
    {
       "moveX":180,
        "moveY":115,
        "toX":-78,
        "toY":0    
    },
    {
      "moveX":102,
        "moveY":115,
        "toX":0,
        "toY":-10    
    }
]

; (function (w, d) {
   
            var can = document.getElementById("can"),
                eir = can.getContext("2d"),
                timer1,
                timer;
                //num代表arr里总共走几条线
            function obj(arr, num) {
                 var i=0;//次数
                //避免同时进行
                  timer1=setTimeout(function(){
                    num++;
                     if(num>=arr.length){
                        clearTimeout(timer);
                         return false;
                     }
                     obj(arr,num);
                 },1060);
                 timer=setInterval(function(){
                      i++;
                     if(i>=10){
                        clearInterval(timer);
                     }
                    eir.beginPath();
                    //通过tox来判断是走X轴还是Y轴;
                    if (arr[num].toX == 0) {
                        //y
        eir.moveTo(arr[num].moveX, arr[num].moveY);
        eir.lineTo(arr[num].moveX, arr[num].moveY+arr[num].toY/10*i);
                    } 
                    else {
                        //x轴
                      eir.moveTo(arr[num].moveX,  arr[num].moveY);
        eir.lineTo(arr[num].moveX+arr[num].toX/10*i, arr[num].moveY);//toX/10*i(把要走的里程的总里程分为十段,计算每一段的里程,再乘以次数)
                    }
                     eir.lineWidth =2;
                     eir.strokeStyle = "red";
                     eir.stroke();
                     eir.closePath();
                                  
            },100)
            }
            
            function clea() {
                eir.clearRect(0, 0, can.width, can.height);
                clearInterval(timer);
                clearTimeout(timer1);
             }
            function hide(obj){
                $(obj).hide();
            }
            hide(".img45,.img46,.img47,.img48");
            function show(){
                $(".img40").show();
                $(".img45").show();
                $(".img46").show();
                $(".img47").show();
                $(".img48").show();
            }
          
            $(".img41").on("tap",function(){
                show();
                eir.clearRect(0, 0, 99+"%", 53+"%");
                clea();
            })
            
             $(".img40").on("tap", function () {
             eir.clearRect(0, 0, 99+"%", 53+"%");
            clea();
            obj(line1, 0);
           })
             $(".img45").on("tap",function(){
                eir.clearRect(0, 0, 99+"%", 53+"%");
                clea();
                hide(".img46,.img47,.img48");
                $(".img40").hide();
                obj(line2, 0);
             })
             $(".img46").on("tap",function(){
                eir.clearRect(0, 0, 99+"%", 53+"%");
               clea();
                 hide(".img45,.img47,.img48");
                 $(".img40").hide();
              obj(line3, 0);
             })
             $(".img47").on("tap",function(){
                eir.clearRect(0, 0, 99+"%", 53+"%");
               clea();
                  hide(".img45,.img44,.img46,.img48");
                 $(".img40").hide();
              obj(line4, 0);
             })
              $(".img48").on("tap",function(){
                eir.clearRect(0, 0, 99+"%", 53+"%");
               clea();
                  hide(".img45,.img44,.img46,.img47");
                 $(".img40").hide();
              obj(line5, 0);
             })
            })(window, document);
            
      
            
            
            
            
            
            
            
          