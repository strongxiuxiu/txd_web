(function(){

    function object_rlue(){
            // 竞买人描述
                // $(".potential_purchaser").change(function(){
                //         var text =  $(".potential_purchaser").find("option:selected").val()
                //         console.log(text)
                //         if(text == 2){
                //         $(".miaoshu").css({
                //             display:"block"
                //         })
                //         $(".jing_div").css({
                //         "border-color":"#ccc"
                //         })
                //         }else{ 
                //         $(".miaoshu").css({
                //             display:"none"
                //         })
                //         $(".jing_div").css({
                //             "border-color":"transparent"
                //         })
                        
                //         }
                // })
                // 选择激活显示
                // 1.拍卖栏显示情况  拍卖状态
                $(".auction_state").change(function(){
                        let val = $(this).find("option:selected").val();
                        console.log(val)
                        if(val == 1|| val == 2 || val == 3){
                        $(".paimai").css({
                        display:"block"
                        })
                        $(".paimai_div").css({
                            "border-color":"#ccc"
                        })

                        }else{
                        $(".paimai").css({
                            display:"none"
                            })
                            $(".paimai_div").css({
                            
                                    "border-color":"transparent"
                            })
                        }
                        if(val == 4  || val == 5 || val == 6 ){
                            $(".qingkaung").css({
                                    display:"block"
                            })
                        }else{
                            $(".qingkaung").css({
                                    display:"none"
                            })
                        }
                
                })
                //收费
                $(".order_state").change(function(){
                        let val = $(this).find("option:selected").val();
                        if(val == 2){
                            $(".shoufeistate").css({
                                    display:"block"
                            })
                            $(".shoufei_div").css({
                                    "border-color":"#ccc"
                            })
                        }else{
                            $(".shoufeistate").css({
                                    display:"none"
                            })
                            $(".shoufei_div").css({
                                    "border-color":"transparent"
                            })
                        
                        }

                })
                // 开票改变事件
                $(".kiaopiao_state").change(function(){
                        let val = $(this).find("option:selected").val();
                        if(val == 2){
                            $(".kaipiaostate").css({
                                    display:"block"
                            })
                            $(".fapiao_div").css({
                                    "border-color":"#ccc"
                            })
                        }else{
                            $(".kaipiaostate").css({
                                    display:"none"
                            })
                            $(".fapiao_div").css({
                                    "border-color":"transparent"
                            })
                        
                        }


                })
                //标的照片上传
            
                //溢价率
                $(".transaction_price").blur(function(){
                        let num_reg = /^[0-9]*$/
                        starting_price = $(".starting_price").val().replace(/,/g, ""),
                        transaction_price = $(".transaction_price").val().replace(/,/g, "")
                        cha = (transaction_price - starting_price),
                        premium_rate = Math.round(cha / transaction_price*10000)/ 100.00+"%";
                        console.log(starting_price,transaction_price)
                        if( starting_price == "" || transaction_price == ""){
                        $(".price_text").css({
                            opacity:1
                        })
                        
                        }else{
                        $(".price_text").css({
                            opacity:0
                        })
                        if( transaction_price < 0 ||  transaction_price ==0 ){
                            premium_rate = "0%"
                        }else{
                            $(".premium_rate").val(premium_rate)
                        }
                        }
                 
                })
                //到账
                $(".payment_receive").change(function(){
                        let val = $(this).find("option:selected").val();
                        if(val == 1){
                        $(".daozhang").css({
                            display:"block"
                        })
                        }else{
                        $(".daozhang").css({
                            display:"none"
                        })
                        }

                })
                //潜在竞买人
                $(".potential_purchaser").change(function(){
                    let val = $(this).find("option:selected").val();
                    if(val == 1){
                    $(".jingmai_text").css({
                        display:"block"
                    })
                    }else{
                    $(".jingmai_text").css({
                        display:"none"
                    })
                    }

                })
                //潜在竞买人
                    

                $(".object_name").blur(function(){
                    if(this.value == "" || this.value == null){
                        $(this).css({
                            borderColor:"#f00"
                        })
                    }else{
                        $(this).css({
                            borderColor:"#ddd"
                        })
                    }
                        
                    
                })
                $(".presentation_condition").blur(function(){
                    if(this.value == "" || this.value == null){
                        $(this).css({
                            borderColor:"#f00"
                        })
                    }else{
                        $(this).css({
                            borderColor:"#ddd"
                        })
                    }
                        
                    
                })
                $(".auction_url").blur(function(){
                    if(this.value == "" || this.value == null){
                        $(this).css({
                            borderColor:"#f00"
                        })
                    }else{
                        $(this).css({
                            borderColor:"#ddd"
                        })
                    }
                        
                    
                })
                
                $(".starting_price").blur(function(){
                    if(this.value == "" || this.value == null){
                        $(this).css({
                            borderColor:"#f00"
                        })
                    }else{
                        $(this).css({
                            borderColor:"#ddd"
                        })
                    }
                        
                    
                })
                $(".transaction_price").blur(function(){
                    if(this.value == "" || this.value == null){
                        $(this).css({
                            borderColor:"#f00"
                        })
                    }else{
                        $(this).css({
                            borderColor:"#ddd"
                        })
                    }
                        
                    
                })
        
                
                $(".appraisal_agency").blur(function(){
                    if(this.value == "" || this.value == null){
                        $(this).css({
                            borderColor:"#f00"
                        })
                    }else{
                        $(this).css({
                            borderColor:"#ddd"
                        })
                    }
                        
                    
                })
                $(".appraisal_price").blur(function(){
                    if(this.value == "" || this.value == null){
                        $(this).css({
                            borderColor:"#f00"
                        })
                    }else{
                        $(this).css({
                            borderColor:"#ddd"
                        })
                    }
                        
                    
                })
        

                $(".buyer").blur(function(){
                    if(this.value == "" || this.value == null){
                        $(this).css({
                            borderColor:"#f00"
                        })
                    }else{
                        $(this).css({
                            borderColor:"#ddd"
                        })
                    }
                        
                    
                })
                $(".buyer_phoneNum").blur(function(){
                    if(this.value == "" || this.value == null){
                        $(this).css({
                            borderColor:"#f00"
                        })
                    }else{
                        $(this).css({
                            borderColor:"#ddd"
                        })
                    }
                        
                    
                })
                $(".ying_money").blur(function(){
                    if(this.value == "" || this.value == null){
                        $(this).css({
                            borderColor:"#f00"
                        })
                    }else{
                        $(this).css({
                            borderColor:"#ddd"
                        })
                    }
                        
                    
                })
                
                $(".shou_money").blur(function(){
                    if(this.value == "" || this.value == null){
                        $(this).css({
                            borderColor:"#f00"
                        })
                    }else{
                        $(this).css({
                            borderColor:"#ddd"
                        })
                    }
                        
                    
                })
                $(".shou_message").blur(function(){
                    if(this.value == "" || this.value == null){
                        $(this).css({
                            borderColor:"#f00"
                        })
                    }else{
                        $(this).css({
                            borderColor:"#ddd"
                        })
                    }
                        
                    
                })
                $(".kaipaio_price").blur(function(){
                    if(this.value == "" || this.value == null){
                        $(this).css({
                            borderColor:"#f00"
                        })
                    }else{
                        $(this).css({
                            borderColor:"#ddd"
                        })
                    }
                        
                    
                })
                
            
    }
    object_rlue()
    $(".search_input").change(function(){
        if($(this).val() !=""){
            $(".clear_btn").css({
                opacity:1
            })
        }else{
         $(".clear_btn").css({
             opacity:0
         })
 
        }
     })
     $(".search_input_case").change(function(){
        if($(this).val() !=""){
            $(".clear_btn").css({
                opacity:1
            })
        }else{
         $(".clear_btn").css({
             opacity:0
         })
 
        }
     })
    $(".clear_btn").click(function(){
        $(".search_input").val("")
        $(".search_input_case").val("")
        
        
        $(".clear_btn").css({
            opacity:0
        })
        location.reload()
    
    })
    //   返回上一页面
    $("body").on("click",".black",function(){
        window.location.href="javascript:history.go(-1)";
    }) 
    // let user_id = $("#user_id").text()
    // let username = $("#username").text()
    // console.log(user_id)
    // console.log(username)
    // let form_data = new FormData()
    // form_data.append("user_id",user_id)
    // $.ajax({
    //     url:"/user/self/info",
    //     type:'POST',
    //     data:form_data,
    //     processData: false,  // tell jquery not to process the data
    //     contentType: false,
    //     success:function(res){
    //         // console.log(res)
    //         let user_list = res.data
    //         for(let ii of user_list){
    //             // $(".user_logo").attr('src',ii.head_portrait)
    //             $(".img_src").text(ii.head_portrait)
    //             $(".s_id").text(ii.id)
    //             $(".header_photo").attr('src',ii.head_portrait)
    //         }

    //     }
    // })
    function show(w){
        $(`#${w}`).modal('show');
        $(".modal-content input").val("")
    }
    //弹框隐藏
    function hide(w){
        $(`#${w}`).modal('hide');
    }
    })()