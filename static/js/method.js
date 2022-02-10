var method={
    msg_layer:function(obj){
        //寮规
        $(".msg-layer-bg,.msg-layer").remove();
       $("body").append( '<div class="msg-layer-bg"></div><div class="msg-layer showAlert"><h5></h5><div class="msg-con"></div><div class="layer-close">&times;</div><div class="layer-btn"><div class="layer-cancel"></div><div class="layer-commit del_snap"></div></div></div>');
        var _layerBg=$(".msg-layer-bg"),_layer=$(".msg-layer"),_close=$(".layer-close"),_cansel=$(".layer-cancel"),_commit=$(".layer-commit");
        _layer.attr("data-animation",obj.type);
        var winH=$(window).height(),winW=$(window).width();
        if(obj.title){
            _layer.find("h5").html(obj.title);
        }else{
            _layer.find("h5").css("display","none")
        }
        _layer.find($(".msg-con")).html(obj.content);
        _layerBg.css({"display":"block"});
        if(!obj.close  || obj.close == "true"){
            _close.css("display","block");
            _close.on("click",function(){
                // method.msg_close();
                method.not_refresh();
            })
        }else{
            _close.css("display","none");
        }
        if(obj.area){
            if(obj.area[0] != "auto" && obj.area[1] != "auto"){
                _layer.css({"width":obj.area[0],"height":obj.area[1],"left":winW/2-parseFloat(obj.area[0])/2,"top":winH/4-parseFloat(obj.area[1])/4});
            }else if(obj.area[0] != "auto" && obj.area[1] === "auto"){
                _layer.css({"width":obj.area[0],"height":obj.area[1],"left":winW/2-parseFloat(obj.area[0])/2,"top":winH/4-(_layer.height()+20)/4});
            }else if(obj.area[0] === "auto" && obj.area[1] != "auto"){
                _layer.css({"width":_layer.width()+20,"height":obj.area[1],"left":winW/2-(_layer.width()+20)/2,"top":winH/4-parseFloat(obj.area[1])/4});
            }

        }else{
            _layer.css({"width":_layer.width()+20,"height":_layer.height()+30,"left":winW/2-(_layer.width()+20)/2,"top":winH/2-(_layer.height()+30)/2});
        }
        if(obj.btn){
            if(obj.btn[0] != 0){
                _cansel.css("display","inline-block");
                _cansel.html(obj.btn[0]);
                _cansel.on("click",function(){
                    method.msg_close();
                })
            }
            if(obj.btn[1] == '提交'){ // 删除快照
                _commit.css("display","inline-block");
                _commit.html(obj.btn[1]);
                _commit.on("click",function(){
                    $('.load-txt').text("开始删除！")
                    $('.loading').css("display","block") // 开启加载。。
                    method.not_refresh()
                    snapshot_del()
                })
                // method.msg_close();
            }else if(obj.btn[2] ==='file_del'){// 删除文件操作
                _commit.css("display","inline-block");
                _commit.html(obj.btn[1]);
                _commit.on("click",function(){
                    $('.load-txt').text("开始删除！")
                    $('.loading').css("display","block") // 开启加载。。
                    method.msg_close()
                    file_del()
                })
            }else if(obj.btn[2] ==='node_del'){// 删除文件操作
                _commit.css("display","inline-block");
                _commit.html(obj.btn[1]);
                _commit.on("click",function(){
                    $('.load-txt').text("开始删除！")
                    $('.loading').css("display","block") // 开启加载。。
                    method.not_refresh()
                    node_del()
                })
            }else if(obj.btn[2] ==='node_restart'){// 重启节点
                _commit.css("display","inline-block");
                _commit.html(obj.btn[1]);
                _commit.on("click",function(){
                    $('.load-txt').text("开始删除！")
                    method.not_refresh()
                    node_restart()
                })
            }else if(obj.btn[2] ==='node_start'){// 节点开启
                _commit.css("display","inline-block");
                _commit.html(obj.btn[1]);
                _commit.on("click",function(){
                    $('.load-txt').text("开始开机！")
                    $('.loading').css("display","block") // 开启加载。。
                    method.not_refresh()
                    node_start()
                })
            }else if(obj.btn[2] ==='node_stop'){// 节点关闭
                _commit.css("display","inline-block");
                _commit.html(obj.btn[1]);
                _commit.on("click",function(){
                    $('.load-txt').text("正在关机中！")
                    $('.loading').css("display","block") // 开启加载。。
                    method.not_refresh()
                    node_stop()
                })
            }else if(obj.btn[2] ==='btn_check') {// 节点关闭
                _commit.css("display", "inline-block");
                _commit.html(obj.btn[1]);
                _commit.on("click", function () {
                    $('.load-txt').text("正在检测....")
                    $('.loading').css("display", "block") // 开启加载。。
                    method.not_refresh()
                    btn_check()
                })
            }else if(obj.btn[2] ==='btn_delete_volume') {// 节点关闭
                _commit.css("display", "inline-block");
                _commit.html(obj.btn[1]);
                _commit.on("click", function () {
                    $('.load-txt').text("开始删除！")
                    $('.loading').css("display","block") // 开启加载。。
                    method.not_refresh()
                    btn_delete_volume()
                })
            }
        }
    },
    msg_close:function(){
        var timer=null;
        $(".msg-layer").removeClass('showAlert').addClass("hideAlert");
        timer=setTimeout(function(){
            clearTimeout(timer);
            $(".msg-layer-bg").remove();
            $(".msg-layer").remove();
            location.reload()  // 刷新
        },200);
    },
    not_refresh :function(){ //不刷新
        var timer=null;
        $(".msg-layer").removeClass('showAlert').addClass("hideAlert");
        timer=setTimeout(function(){
            clearTimeout(timer);
            $(".msg-layer-bg").remove();
            $(".msg-layer").remove();
        },200);
    }
};
// 关闭不刷新



