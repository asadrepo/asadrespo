$(window).on('load',function(){
    // $('#exampleModalCenter17').modal('show');
});

$(document).ready(function(){
    /* SIDENAVI */
    $(".slideDiv").click(function(){
        $(this).next("div").toggle("slide"),7000;
        $(".side-navi-tab").css("display","block");
        $(".side-navi-tab1").css("display","block");
    });
    /* SIDENAVI */

    $(function(){
        $('.cq-dropdown').dropdownCheckboxes();
    });

    //Event for pushed the video
    // $('#carouselExampleIndicators').carousel({
    //     pause: true,
    //     interval: false
    // });

    $('#datepicker').datepicker({
        uiLibrary: 'bootstrap4'
    });
});

/* PROFILE PICTURE */
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#imagePreview').css('background-image', 'url('+e.target.result +')');
            $('#imagePreview').hide();
            $('#imagePreview').fadeIn(650);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
$("#imageUpload").change(function() {
    readURL(this);
});
/* PROFILE PICTURE */

// anychart.onDocumentReady(function () {
//     // create data
//     var data = [
//         {x: "CVE-2019-0922", value: 10},
//         {x: "CVE-2019-0897", value: 15},
//         {x: "CVE-2019-0894", value: 15},
//         {x: "CVE-2019-0820", value: 20},
//         {x: "CVE-2019-0979", value: 10}
//     ];
//
//     // create a pie chart and set the data
//     var chart = anychart.pie(data);
//
//     /* set the inner radius (to turn the pie chart into a doughnut chart)*/
//     chart.innerRadius("30%");
//
//     // set the chart title /*chart.title("Doughnut Chart: Basic Sample");*/
//     // set the container id
//     chart.container("container");
//
//     // initiate drawing the chart
//     chart.draw();
// });

// anychart.onDocumentReady(function () {
//     // create data
//     var data = [
//         {x: "CVE-2019-0922", value: 12},
//         {x: "CVE-2019-0897", value: 15},
//         {x: "CVE-2019-0894", value: 25},
//         {x: "CVE-2019-0820", value: 10},
//         {x: "CVE-2019-0979", value: 20}
//     ];
//
//     // create a pie chart and set the data
//     var chart = anychart.pie(data);
//
//     /* set the inner radius (to turn the pie chart into a doughnut chart)*/
//     chart.innerRadius("30%");
//
//     // set the chart title /*chart.title("Doughnut Chart: Basic Sample");*/
//     // set the container id
//     chart.container("container1");
//
//     // initiate drawing the chart
//     chart.draw();
// });
//
// anychart.onDocumentReady(function () {
//     // create data
//     var data = [
//         {x: "CVE-2019-0922", value: 20},
//         {x: "CVE-2019-0897", value: 15},
//         {x: "CVE-2019-0894", value: 25},
//         {x: "CVE-2019-0820", value: 10},
//         {x: "CVE-2019-0979", value: 10}
//     ];
//
//     // create a pie chart and set the data
//     var chart = anychart.pie(data);
//
//     /* set the inner radius (to turn the pie chart into a doughnut chart)*/
//     chart.innerRadius("30%");
//
//     // set the chart title
//     /*chart.title("Doughnut Chart: Basic Sample");*/
//
//     // set the container id
//     chart.container("container2");
//
//     // initiate drawing the chart
//     chart.draw();
// });

/* RANGE */
var sheet = document.createElement('style'),
    $rangeInput = $('.range input'),
    prefs = ['webkit-slider-runnable-track', 'moz-range-track', 'ms-track'];

document.body.appendChild(sheet);
var getTrackStyle = function (el) {
    var curVal = el.value,
        val = (curVal - 1) * 25,
        style = '';
    // Set active label
    $('.range-labels li').removeClass('active selected');
    var curLabel = $('.range-labels').find('li:nth-child(' + curVal + ')');
    curLabel.addClass('active selected');
    curLabel.prevAll().addClass('selected');
    return val;
};
$rangeInput.on('input', function () {
    sheet.textContent = getTrackStyle(this);
    $(this).parent(".range").css('background','#f'+sheet.textContent+'');
    $(this).parent(".range").attr('style','background: linear-gradient(to right, #2584b4 0%, #2584b4 ' + sheet.textContent + '%, #fff ' + sheet.textContent + '%, #fff 90.25%)');
});

// Change input value on label click
$('.range-labels li').on('click', function () {
    var index = $(this).index();
    $(this).parents(".col-range").find("input").val(index + 1).trigger('input');
    //$rangeInput.val(index + 1).trigger('input');
});
/* RANGE */

/* SHOW / HIDE */
$(document).ready(function(){
    $("#side_navi_show").click(function(){
        $(".show_hide").toggle();
        $(".sideNavi").css("z-index","11");
        $(".sideNavi1").css("z-index","1");
        $(".sideNavi4").css("z-index","1");
        $(".sideNavi5").css("z-index","1");
    });

    $("#side_navi_show1").click(function(){
        $(".show_hide1").toggle();
        $(".sideNavi").css("z-index","1");
        $(".sideNavi1").css("z-index","11");
        $(".sideNavi4").css("z-index","1");
        $(".sideNavi5").css("z-index","1");
    });

    $("#side_navi_show3").click(function(){
        $(".show_hide3").toggle();
        $(".sideNavi").css("z-index","1");
        $(".sideNavi1").css("z-index","1");
        $(".sideNavi4").css("z-index","11");
        $(".sideNavi5").css("z-index","1");
    });

    $("#side_navi_show7").click(function(){
        $(".show_hide4").toggle();
        $(".sideNavi").css("z-index","1");
        $(".sideNavi1").css("z-index","1");
        $(".sideNavi4").css("z-index","1");
        $(".sideNavi5").css("z-index","15");
    });

    $("#side_navi_show2").click(function(){
        $(".show_hide5").toggle();
        $(".sideNavi").css("z-index","0");
    });

    $("#side_navi_show4").click(function(){
        $(".show_hide6").toggle();
        $(".sideNavi").css("z-index","10");
    });

    $("#side_navi_show5").click(function(){
        $(".show_hide7").toggle();
        $(".sideNavi").css("z-index","10");
    });

    $("#side_navi_show6").click(function(){
        $(".show_hide8").toggle();
        $(".sideNavi").css("z-index","10");
    });

    $(function(){
        $('#cs_tool_bg').hover(function() {
            $('.show_hide2').css("display","block");
        }, function() {
            $('.show_hide2').css("display","none");
        })
    });

    // var owl = $('.owl-carousel');
    // owl.owlCarousel({
    //     items: 6,
    //     loop: true,
    //     margin: 10,
    //     autoplay: true,
    //     autoplayTimeout: 4000,
    //     autoplayHoverPause: true
    // });

    $(".lazy").slick({
        dots: true,
        lazyLoad: 'ondemand', // ondemand progressive anticipated
        infinite: true,
        autoplay: true
    });
    $(function(){
        $('#map_menu').addClass("displaynone");
        $('.sideNavi3').addClass("displaynone");

        $('.snavi_hide').click(function() {
            $('#hide_from_third').addClass("displaynone");
            $('#map_menu').addClass("displaynone");
            $('.sideNavi3').addClass("displaynone");
        });
        $('.not_hide').click(function () {
            $('#hide_from_third').removeClass("displaynone");
            $('#map_menu').addClass("displaynone");
            $('.sideNavi3').addClass("displaynone");
        });
        $('.maps_show').click(function () {
            $('#map_menu').removeClass("displaynone");
            $('.sideNavi3').removeClass("displaynone");
            $('#hide_from_third').addClass("displaynone");
        });
    });

    $(function(){
        $('#cs_tool_bg1').click(function() {
            $('.show_hide2').css("display","block");
        }, function() {
            $('.show_hide2').css("display","none");
        })
    });

    $(".showField").click(function() {
        if($(this).is(":checked")) {
            $(".hideField").show();
        } else {
            $(".hideField").hide();
        }
    });

    $(".ch-unch").click(function() {
        if($(this).is(":checked")) {
            $(this).prev("input").prop("disabled", false);
        } else {
            $(this).prev("input").prop("disabled", true);
        }
    });

    $(".select_prem").click(function(){
        $(".show_prem").show();
    });

    $(".free_subs").click(function(){
        $(".show_prem").hide();
    });

    $("#payment_method").click(function(){
        $("#payment_method_div").show();
        $("#edit_profile_div").hide();
    });

    $("#edit_profile").click(function(){
        $("#edit_profile_div").show();
        $("#payment_method_div").hide();
    });
});
/* SHOW / HIDE */

/*AGGLOMETER*/
var myConfig = {
    type: "gauge",
    globals: {
        backgroundColor: 'transparent'
    },
    plotarea:{
        marginTop:25
    },
    plot:{
        size:'70%',
        valueBox: {
            placement: 'center', //Specify "center", "tip", or "edge".
            fontColor: '#d1ff00',
            text:'%v%', //default
            fontSize:20,
            paddingTop: 180,
            backgroundColor: 'transparent'
        }
    },
    tooltip:{
        borderRadius:5
    },

    scaleR:{
        aperture:260,
        minValue: 0,
        maxValue:100,
        step:10,
        center:{
            visible:true,
            size: '10%',
            borderColor: 'transparent'
        },
        tick:{
            "line-color":"#23293f",
            "line-style":"solid", //solid, dashed, or dotted
            "line-width":3,
            "size":45,
            "placement":"inner" //outer, inner, or cross
        },
        item:{
            offsetR:-25,
        },
        labels:['0%','10%','20%','30%','40%','50%','60%','70%','80%','90%','100%'],
        ring:{
            size:45,
            rules:[
                {
                    rule:'%v < 10',
                    backgroundColor:'#128937'
                },
                {
                    rule:'%v >= 10 && %v <= 20',
                    backgroundColor:'#72ad00'
                },
                {
                    rule:'%v >= 20 && %v <= 30',
                    backgroundColor:'#b3b700'
                },
                {
                    rule:'%v >= 30 && %v <= 40',
                    backgroundColor:'#fff200'
                },
                {
                    rule:'%v >= 40 && %v <= 50',
                    backgroundColor:'#ffce00'
                },
                {
                    rule:'%v >= 50 && %v <= 60',
                    backgroundColor:'#ff9d00'
                },
                {
                    rule:'%v >= 60 && %v <= 70',
                    backgroundColor:'#ff6d00'
                },
                {
                    rule:'%v >= 70 && %v <= 80',
                    backgroundColor:'#ff4800'
                },
                {
                    rule:'%v >= 80 && %v <= 90',
                    backgroundColor:'#af0000'
                },
                {
                    rule:'%v >= 90 && %v <= 100',
                    backgroundColor:'#870000'
                }
            ]
        }
    },
    series : [
        {
            values : [24], // starting value
            backgroundColor:'gray',
            indicator:[10,0,0,0,10],
            animation:{
                effect:2,
                method:5,
                sequence:0,
                speed: 10000
            }
        }
    ]
};
var myConfig2 = {
    type: "gauge",
    globals: {
        backgroundColor: 'transparent'
    },
    plotarea:{
        marginTop:25
    },
    tooltip:{
        borderRadius:3
    },

    scaleR:{
        aperture:260,
        minValue: 0,
        maxValue:100,
        step:10,
        center:{
            visible:true,
            size: '5%',
            borderColor: 'transparent'
        },
        tick:{
            "line-color":"#23293f",
            "line-style":"solid", //solid, dashed, or dotted
            "line-width":2,
            "size":20,
            "placement":"inner" //outer, inner, or cross
        },
        item:{
            offsetR:-17,
            fontSize: "8"
        },
        labels:['0%','10%','20%','30%','40%','50%','60%','70%','80%','90%','100%'],
        ring:{
            size:20,
            rules:[
                {
                    rule:'%v < 10',
                    backgroundColor:'#128937'
                },
                {
                    rule:'%v >= 10 && %v <= 20',
                    backgroundColor:'#72ad00'
                },
                {
                    rule:'%v >= 20 && %v <= 30',
                    backgroundColor:'#b3b700'
                },
                {
                    rule:'%v >= 30 && %v <= 40',
                    backgroundColor:'#fff200'
                },
                {
                    rule:'%v >= 40 && %v <= 50',
                    backgroundColor:'#ffce00'
                },
                {
                    rule:'%v >= 50 && %v <= 60',
                    backgroundColor:'#ff9d00'
                },
                {
                    rule:'%v >= 60 && %v <= 70',
                    backgroundColor:'#ff6d00'
                },
                {
                    rule:'%v >= 70 && %v <= 80',
                    backgroundColor:'#ff4800'
                },
                {
                    rule:'%v >= 80 && %v <= 90',
                    backgroundColor:'#af0000'
                },
                {
                    rule:'%v >= 90 && %v <= 100',
                    backgroundColor:'#870000'
                }
            ]
        }
    },
    series : [
        {
            values : [24], // starting value
            backgroundColor:'gray',
            indicator:[5,0,0,0,0],
            animation:{
                effect:2,
                method:5,
                sequence:0,
                speed: 10000
            }
        }
    ]
};

zingchart.render({
    id : 'myChart',
    data : myConfig,
    height: 300,
    width: '100%'
});
for(var a = 0; a <= 9; a++){
    zingchart.render({
        id : "myChart"+a+"",
        data : myConfig2,
        height: 125,
        width: '100%'
    });
}

/*AGGLOMETER*/

/* MAPS */
$(window).resize(function(){
    var footerHeight = $(".sec_footer").height();
    var headerHeight = $(".main_header").height();
    var vh = $(window).height();
    var totalHeight = vh-footerHeight-headerHeight-25.484;
    $("#map").css("height",totalHeight);
});
$(document).ready(function(){
    var footerHeight = $(".sec_footer").height();
    var headerHeight = $(".main_header").height();
    var vh = $(window).height();
    var totalHeight = vh-footerHeight-headerHeight-25.484;
    $("#map").css("height",totalHeight);
});
/* MAPS */