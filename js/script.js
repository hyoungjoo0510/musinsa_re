$(function(){
    
    var winWidth = $(window).innerWidth();
    var delay = 300;
    var timer = null;
    // var navWidth = $("#nav").width();
    var hambtn =false;
    // console.log(navWidth)
    $(window).on('resize', function(){
        
        navWidth = $("#nav").width();
        if(winWidth<1280 && hambtn==true){
            $(".rightGnb").css({
                // right: (winWidth*0.45) / 2
                right: navWidth/2 
            }, 1000)
        }
        
        // console.log(navWidth)
        clearTimeout(timer);
        timer = setTimeout(function(){
            winWidth = $(window).innerWidth();

            magazineInitWeb();
            magazine();
            saleBannerInitial();
            mainMenuHover();
            mobileMenu();
            newItemMenuWeb();
            newItemInit();
            $("#nav>li .subTitle").removeAttr("style");
            $(".subTitle>li>span").removeAttr("style");
            $(".subTitle>li>ul").removeAttr("style");
        }, delay);
    });

    $(".hdr").load("./header.html", function(){

        mainMenuHover();

        mobileMenu();

        $(".hamBtn>a").click(function(){
            hambtn =true;
            navWidth = $("#nav").width();

            $("#nav>li").removeClass("listMenu")
            $(".subTitle>li>span").css({
                "cursor": "pointer",
                opacity: 0
            })
            $("#nav>li:eq(4)").prevAll().children("a").click(function(e){
                if(winWidth<=1280){
                    e.preventDefault();
                }
            })
            $("#nav").stop().animate({
                right: 0
            }, 1000)

            $(".rightGnb").stop().animate({
                // right: (winWidth*0.45) / 2
                right: navWidth/2 
            }, 1000)
    
            $(".bodyBg").stop().fadeIn(300)
            $("body").css("overflow", "hidden")
            $(".logo").stop().animate({
                opacity: 0
            },500, function(){
                $(this).css({
                    "text-align": "left",
                    paddingLeft: 10
                })
                .stop().animate({
                    opacity: 1
                },500)
                
            })
        })
        
        $(".bodyBg").click(function(){
            hambtn =false;
            $(this).stop().fadeOut(300)
            $("#nav").stop().animate({
                right: -100+"%"
            }, 1000)
            $(".rightGnb").stop().animate({
                right: -100+"%"
            }, 1000)
    
            $("body").css("overflow", "auto")
            $(".logo").stop().animate({
                opacity: 0
            },500, function(){
                $(this).css({
                    "text-align": "center",
                    paddingLeft: 0
                })
                .stop().animate({
                    opacity: 1
                },500)
            })
            // $("#nav>li>.subTitle").stop().slideUp(400)
            $("#nav>li>.subTitle").stop().animate({
                height: 0
            }, 400, function(){
                // $(this).css({
                //     "display": "none"
                // })
                $(this).removeAttr("style")
                $(this).find("span").css("opacity", "1")
            })
            $(".subMenu").css("right", "-100%")
            $(".closeBtn").stop().animate({
                right: "-100%"
            }, 500)
        })
    });

    $(".ftr").load("./footer.html")
    
    function mainMenuHover(){
        if(winWidth > 1750){

            $("#nav>li:eq(4)").prevAll().off("mouseover").on("mouseover", function(){
                $("header").stop().animate({
                    height: 470
                }, 500)
            })
            $("#nav>li:eq(4)").prevAll().off("mouseout").on("mouseout", function(){
                $("header").stop().animate({
                    height: 97
                }, 500)
            })
            $(".subTitle>li>span").css("opacity", 1)
        }else{
            $("#nav>li:eq(4)").prevAll().off("mouseover").on("mouseover", function(e){
                e.preventDefault();
            })
            $("#nav>li:eq(4)").prevAll().off("mouseout").on("mouseout", function(e){
                e.preventDefault();
            })
        }
    }
    mainMenuHover();
    
    function mobileMenu(){

        $("#nav>li>a").click(function(){
            if(winWidth<1280){
                $(this).next().stop().animate({
                    height: 170
                }, 400, function(){
                    $(this).find("span").stop().animate({
                        opacity: 1
                    },400)
                })
        
                $(this).parent().siblings().children(".subTitle")
                .stop().animate({
                    height: 0
                }, 400, function(){
                    $(this).find("span").css("opacity", "0")
                })
            }
        })
        
        $(".subTitle>li>span").off("click").on("click", function(){
            if(winWidth < 1280){
                $(this).next().stop().animate({
                    right: 0
                }, 500)
                $(".closeBtn").stop().animate({
                    right: 25
                }, 500)
            }

        })
        $(".closeBtn").click(function(){
            $(".subMenu").stop().animate({
                right: "-100%"
            }, 500)
            $(this).stop().animate({
                right: "-100%"
            }, 500)
        })
    }
    mobileMenu();
    

    var showSale = 0;
    var slideCount = 0;
    var saleObj;
    var saleCount;
    var saleLength=0;

    function saleBannerInitial(){
        if(window.innerWidth > 768){
            if($(".saleBox>ul>li").length>9 && $(".saleBox>ul>li").length<12){
                $(".saleBox>ul>li").eq(9).remove();
                showSale =0;
                slideCount =0;
                saleCount =0;
                $(".saleBox>ul").css("margin-left", 0)
                $(".slideBtn>a").css("margin-left", 0)
            }
            if($(".saleBox>ul>li").length<12){
                saleObj = $(".saleBox>ul>li:lt(3)").clone();
                $(".saleBox>ul").append(saleObj);
            }
            saleLength = $(".saleBox>ul>li").length;
            saleCount = saleLength/4;
            $(".saleBox>ul").width((saleLength/3)*100+"%")
            $(".saleBox>ul>li").width(100/saleLength+"%")
            $(".slideBtn>a").width((100/saleCount)+"%")
        }else{
            if($(".saleBox>ul>li").length>10){
                $(".saleBox>ul>li").eq(11).remove();
                $(".saleBox>ul>li").eq(10).remove();
                showSale =0;
                slideCount =0;
                saleCount =0;
                $(".saleBox>ul").css("margin-left", 0)
                $(".slideBtn>a").css("margin-left", 0)
            }
            if($(".saleBox>ul>li").length<10){
                saleObj = $(".saleBox>ul>li:eq(0)").clone();
                $(".saleBox>ul").append(saleObj);
            }
            saleLength = $(".saleBox>ul>li").length;
            saleCount = saleLength -1;
            $(".saleBox>ul").width(saleLength*100+"%")
            $(".saleBox>ul>li").width(100/saleLength+"%")
            $(".slideBtn>a").width((100/saleCount)+"%")
        }

    }
    saleBannerInitial()
    function saleMove(){
        $(".saleBox>ul").stop().animate({
            marginLeft: -showSale*100+"%"
        },1000)
        
        if(slideCount == saleCount){
            slideCount = 0
        }else if(slideCount < 0){
            slideCount = saleCount-1
        }
        $(".slideBtn>a").stop().animate({
            marginLeft: slideCount*(100/saleCount)+"%"
        },1000)

    }

    $(".saleWrap .ctlArrow>.rightArrow").click(function(){
        if(showSale == saleCount){
            $(".saleBox>ul").css("margin-left", 0)
            showSale = 0;
        }
        showSale++
        slideCount++
        saleMove();
        console.log("showSale:" + showSale)
        // console.log("saleCount:" + saleCount)
    })
    $(".saleWrap .ctlArrow>.leftArrow").click(function(){
        if(showSale == 0){
            if(window.innerWidth > 768){
                $(".saleBox>ul").css({
                    "margin-left": -((saleLength/3)-1)*100+"%"
                })
                showSale = ((saleLength/3)-1)
            }else{
                $(".saleBox>ul").css({
                    "margin-left": -(saleLength-1)*100+"%"
                })
                showSale = (saleLength-1)
            }
        }
        showSale--;
        slideCount--;
        saleMove();
    })

    function newItemInit(){

        $(".newMenu>li").eq(0).addClass("active").siblings().removeClass("active");
        $(".newItemMenu>.itemList").eq(0).css({
            "visibility": "visible",
            opacity: 1
        }).siblings(".itemList").css({
            opacity: 0,
            "visibility": "visible"
        })
        $(".newItemMenu>.itemList>ul").css("margin-left", 0)
    }
    newItemInit();
    function newItemMenuWeb(){
        
        var newlistIndex = 0;
        var showlist = 0;

        $(".newMenu>li").off("click").on("click", function(){
            newlistIndex = $(this).index();

            $(this).addClass("active").siblings().removeClass("active")

            $(".newItemMenu>.itemList").eq(newlistIndex).css("visibility", "visible").stop().animate({
                opacity: 1
            }, 500).siblings(".itemList").animate({opacity: 0},500, function(){
                $(this).css("visibility", "hidden")
                $(".newItemMenu>.itemList>ul").css("margin-left", 0)
            })

            showlist = 0;
        })

        function newitemMove(){
            $(".newItemMenu>.itemList").eq(newlistIndex).children().stop().animate({
                marginLeft: -showlist*100+"%"
            }, 500)
        }

        $(".newItemWrap .ctlArrow>.rightArrow").off("click").on("click", function(){
            console.log("클릭")
            if(winWidth > 930){
                $(".newItemMenu>.itemList").eq(newlistIndex).children().stop().animate({
                    marginLeft: -100+"%"
                }, 500)
            }else{
                if(showlist < 7){
                    showlist++;
                }
                newitemMove()
            }

        })
        $(".newItemWrap .ctlArrow>.leftArrow").off("click").on("click", function(){

            if(winWidth > 930){
                $(".newItemMenu>.itemList").eq(newlistIndex).children().stop().animate({
                    marginLeft: 0+"%"
                }, 500)
            }else{
                if(showlist > 0){
                    showlist--;
                }
                newitemMove()
            }

        })

    }
    newItemMenuWeb();

    // var winWidth = document.documentElement.clientWidth;
    var winCenter = winWidth/2
    var showLeft = 0;
    var showCenter = 1;
    var showRight = 2;
    var showText = 1;

    var magazineCenterIndex = 1;
    var magazineHeight;

    function magazineInitWeb(){

        winWidth = document.documentElement.clientWidth;
        winCenter = winWidth/2
        showLeft = 0;
        showCenter = 1;
        showRight = 2;
        
        magazineCenterIndex = 0;
        magazineHeight = $(".magazineCenter>ul>li>a>img").outerHeight();
        // console.log("높이"+magazineHeight)
        $(".magazineWrap>.magazineCenter").css({
            height: magazineHeight
        })
        if(winWidth> 1750){
            showText = 1;
            $(".magazineCenter>ul>li").eq(1).css({
                opacity: 1,
                "z-index": 30
            }).siblings().css({
                opacity: 0,
                "z-index": 1
            })
            $(".magazineWrap>.textBox>ul>li").eq(showText).css("opacity", 1).siblings().css("opacity", 0)
        }else{
            showText = 0;
            $(".magazineCenter>ul>li").eq(0).css({
                opacity: 1,
                "z-index": 30
            }).siblings().css({
                opacity: 0,
                "z-index": 1
            })
            $(".magazineWrap>.textBox>ul>li").eq(showText).css("opacity", 1).siblings().css("opacity", 0)
        }
        $(".magazineCenter").removeAttr("style");
        $(".magazineLeft").removeAttr("style");
        $(".magazineRight").removeAttr("style");
       
    }
    magazineInitWeb();
    
    function magazineMove(){
        if(magazineCenterIndex == 3){
            magazineCenterIndex = 0;
        }else if(magazineCenterIndex < 0){
            magazineCenterIndex = 2
        }
        $(".magazineCenter>ul>li").eq(magazineCenterIndex).stop().animate({opacity: 1}, 500, function(){
            $(this).css("z-index", 30)
        })
        .siblings().stop().animate({opacity: 0}, 500, function(){
            $(this).css("z-index", 1)
        })

        $(".magazineWrap .textBox>ul>li").eq(magazineCenterIndex).stop().animate({opacity: 1}, 500, function(){
            $(this).css("z-index", 30)
        })
        .siblings().stop().animate({opacity: 0}, 500, function(){
            $(this).css("z-index", 1)
        })
    }

    function magazine(){
        $(".magazineWrap .ctlArrow>.rightArrow").off("click").on("click", function(){
            
            var magazineAni = $(".magazineLeft").is(":animated");
            if(magazineAni != true){
                if(winWidth > 1750){
                    console.log("확인")
                    $(".magazineLeft").stop().animate({
                        left: winCenter-450,
                        "max-width": 500,
                        "opacity": 1,
                        height: 500*0.66666
                    }, 1000, function(){
                        showLeft--
                        if(showLeft < 0){
                            showLeft = 2
                        }
                        $(this).css({
                            left: 0,
                            maxWidth: 400,
                            opacity: 0.5,
                            height: 400*0.66666
                        })
                        $(this).find("li").eq(showLeft).css("opacity", 1).siblings().css("opacity", 0)
        
                    })
                    $(".magazineCenter").stop().animate({
                        left: winWidth-400,
                        maxWidth: 400,
                        height: 400 * 0.666666,
                        opacity: 0.5
                    }, 1000, function(){
                        showCenter--
                        if(showCenter < 0){
                            showCenter = 2
                        }
                        
                        $(this).css({
                            left: winCenter-450,
                            maxWidth: 500,
                            height: 500*0.6666666,
                            opacity: 1
                        })
                        $(this).find("li").eq(showCenter).css({
                            "opacity": 1,
                            "z-index": 10
                        }).siblings().css({
                            "opacity": 0,
                            "z-index": 0
                        })
                    })
                    $(".magazineRight").stop().animate({
                        left: 0
                    }, 1000, function(){
                        showRight--;
                        if(showRight<0){
                            showRight = 2
                        }
                        $(this).find("li").eq(showRight).css("opacity", 1).siblings().css("opacity", 0)
                        $(this).css({
                            left: winWidth-400,
                        })
                    })
                    $(".magazineWrap>.textBox>ul>li").eq(showText).stop().animate({
                        opacity: 0
                    }, 500, function(){
                        showText--
                        if(showText < 0){showText=2}
                        $(".magazineWrap>.textBox>ul>li").eq(showText).stop().animate({
                            opacity: 1
                        }, 500)
                    })  
                }else{
                    // console.log("작은실행")
                    magazineCenterIndex++
                    magazineMove();
                }
         
            }
        })
        $(".magazineWrap .ctlArrow>.leftArrow").off("click").on("click", function(){
            var magazineAni = $(".magazineLeft").is(":animated");
            if(magazineAni != true){
                if(winWidth > 1750){
                    $(".magazineLeft").stop().animate({
                        left: winWidth-400
                    }, 1000, function(){
                        showLeft++
                        if(showLeft >= 3){
                            showLeft = 0
                        }
                        $(this).css({
                            left: 0
                        })
                        $(this).find("li").eq(showLeft).css("opacity", 1).siblings().css("opacity", 0)
        
                    })
                    $(".magazineCenter").stop().animate({
                        left: 0,
                        maxWidth: 400,
                        height: 400 * 0.666666,
                        opacity: 0.5
                    }, 1000, function(){
                        showCenter++
                        if(showCenter >= 3){
                            showCenter = 0
                        }
                        $(this).css({
                            left: winCenter-450,
                            maxWidth: 500,
                            height: 500*0.6666666,
                            opacity: 1
                        })
                        $(this).find("li").eq(showCenter).css({
                            "opacity": 1,
                            "z-index": 10
                        }).siblings().css({
                            "opacity": 0,
                            "z-index": 0
                        })
                    })
                    $(".magazineRight").css("z-index", 15).stop().animate({
                        left: winCenter-450,
                        maxWidth: 500,
                        height: 500*0.666666,
                        opacity: 1
                    }, 1000, function(){
                        showRight++;
                        if(showRight>=3){
                            showRight = 0
                        }
                        $(this).find("li").eq(showRight).css("opacity", 1).siblings().css("opacity", 0)
                        $(this).css({
                            left: winWidth-400,
                            maxWidth: 400,
                            height: 400*0.66666,
                            opacity: 0.5,
                            "z-index": 1
                        })
                    })
                    $(".magazineWrap>.textBox>ul>li").eq(showText).stop().animate({
                        opacity: 0
                    }, 500, function(){
                        showText++
                        if(showText >= 3){showText=0}
                        $(".magazineWrap>.textBox>ul>li").eq(showText).stop().animate({
                            opacity: 1
                        }, 500)
                    })
                }else{
                    magazineCenterIndex--
                    magazineMove();
                }
               
            }
        })
    }
    magazine();

    //#mainBanner
    var obj = $(".banner>li:eq(0)").clone();
    $(".banner").append(obj)

    var showBanner = 0;
    var bannerCount = $(".banner>li").length;

    $(".banner").width(bannerCount*100+"%")
    $(".banner>li").width(100/bannerCount+"%")

    function moveBanner(){
        $(".banner").stop().animate({
            marginLeft: -showBanner*100+"%"
        }, 1000)
        if(showBanner ==3){
            $(".pager>li:eq(0)").addClass("active").siblings().removeClass("active")
        }
        $(".pager>li").eq(showBanner).addClass("active").siblings().removeClass("active");
    }

    $("#mainBanner .pager>li").click(function(){
        showBanner = $(this).index();
        moveBanner();
    })
    $("#mainBanner .rightArrow").click(function(){
        if(showBanner==bannerCount-1){
            $(".banner").css({
                "margin-left": 0
            })
            showBanner = 0;
        }
        showBanner++
        moveBanner();
    })
    $("#mainBanner .leftArrow").click(function(){
        if(showBanner==0){
            $(".banner").css({
                "margin-left": -(bannerCount-1)*100+"%"
            })
            showBanner = bannerCount-1
        }
        showBanner--;
        moveBanner();
    })

    
    function autoBanner(){
        if(showBanner==bannerCount-1){
            $(".banner").css({
                "margin-left": 0
            })
            showBanner = 0;
        }
        showBanner++
        moveBanner();
    }
    var timer1 = setInterval(autoBanner, 3000)

    // styleWrap ********************************************

    var styleWidth = $(".styleImg>li").width();

    var styleObj = $(".styleImg>li:lt(5)").clone();
    $(".styleImg").append(styleObj)
    
    function styleMove(){
        $(".styleImg").animate({
            marginLeft: -(styleWidth*11)
        },20000,"linear", function(){
            $(this).css("margin-left", 0)
        })
    }
    var styleTimer = setInterval(styleMove, 20000);
    styleMove();

})