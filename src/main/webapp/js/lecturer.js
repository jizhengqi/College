function alertInfor(type, str) {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "positionClass": "toast-top-center",
        "onclick": null,
        "showDuration": "500",
        "hideDuration": "500",
        "timeOut": "2000",
        "extendedTimeOut": "500",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut",
        "onHidden": function () {

        }
    };
    toastr[type](str);
}

var lecturer = {
    lock: true,
    init: function () {
        this.swipePicture();
        this.bindE();
    },
    swipePicture: function () {
        var len1 = $('.swiper-container .swiper-slide').length;
        var len2 = $('.swiper-container2 .swiper-slide').length;
        if (len1 > 1) {
            new Swiper('.swiper-container', {
                autoplay:5000,
                loop:true
            })
        }
        if (len2 > 1) {
            new Swiper('.swiper-container2', {
                autoplay:5000,
                loop:true
            })
        }
    },
    bindE: function () {
        $('.tips').on('click', this.formExpand);
        $('.bg .close').on('click', this.closeForm);
        $('.joinUs').on('click', this.openForm);
        $('.alreadyJoined').on('click', function () {
            alertInfor('error', '你已经申请过，不能重复申请哦~如有疑问，请点击底部咨询按钮。');
        });
        // 表单提交
        $('#subBtn').on('click', this.submitForm);
        // 限制数量
        $('.direction_id').on('change', this.jobCount);
        //大文本框交互
        $('.prestige_id').on('change', this.showStigma);
        $('#theProject').on('change', this.showProject);
        $('#theCompany').on('change', this.showCompany);
        $('.direction_id').on('change', this.showDirection);
    },
    showCompany: function () {
        var c = $('#theCompany').val();
        if (c > 0) {
            $('#showCompany').fadeIn();
        } else {
            $('#showCompany').fadeOut();
        }
    },
    showDirection: function () {
        var num = $('.direction_id:checked').map(function () {
            return this.value;
        }).get().length;
        if (num > 0) {
            $('#showDirection').fadeIn();
        } else {
            $('#showDirection').fadeOut();
        }
    },
    showStigma: function () {
        var num = $('.prestige_id:checked').map(function () {
            return this.value;
        }).get().length;
        if (num > 0) {
            $('#showStigma').fadeIn();
        } else {
            $('#showStigma').fadeOut();
        }
    },
    showProject: function () {
        var options = $(this).find("option:selected");
        var txt = options.text();

        if (txt == "请选择项目经验" || txt == "无") {
            $('#showProject').fadeOut();
            $('#showProject textarea').val('');
        } else {
            $('#showProject').fadeIn();
        }
    },
    jobCount: function () {
        var count = $('.direction_id:checked').length;
        if (count > 3) {
            alertInfor('info', '最多选3个技术方向');
            $(this)[0].checked = false;
        }
    },
    formExpand: function () {
        $('.arrows').toggleClass('open');
        var $info = $('.moreInfo');
        $info.stop();
        if (!$info.hasClass('close')) {
            $info.slideDown();
            $info.addClass('close');
        } else {
            $info.slideUp();
            $info.removeClass('close');
        }
    },
    closeForm: function () {
        $('#form').fadeOut();
        $('.bg').animate({
            marginTop: '150px',
            opacity: '0'
        })
    },
    openForm: function () {
        $('#form').fadeIn();
        $('.bg').animate({
            marginTop: '100px',
            opacity: '1'
        })
    },
    submitForm: function () {
        //  输入框
        var realname = $.trim($('#realname').val());
        if (realname.length <= 0) {
            alertInfor('error', '姓名 不能为空');
            return;
        }
        var mobile = $.trim($('#mobile').val());
        if (mobile.length <= 0) {
            alertInfor('error', '手机 不能为空');
            return;
        }
        var email = $.trim($('#email').val());
        if (email.length <= 0) {
            alertInfor('error', '邮箱 不能为空');
            return;
        }
        var qq = $.trim($('#qq').val());
        if (email.length <= 0) {
            alertInfor('error', 'QQ 不能为空');
            return;
        }

        //  下拉选择框
        var job_year = $('#theYear').val();
        var job = $('#theJob').val();
        var company = $('#theCompany').val();
        var project = $('#theProject').val();

        //  大文本输入框
        var intro = $.trim($('#intro').val());
        var project_desc = $.trim($('#project_desc').val());
        var direction_desc = $.trim($('#direction_desc').val());

        var prestige_desc = $.trim($('#stigma_desc').val());

        var company_desc = $.trim($('#company_desc').val());

        //  复选框
        var direction_id = $('.direction_id:checked').map(function () {
            return this.value;
        }).get();
        if (direction_id.length <= 0) {
            alertInfor('error', '技术方向 不能为空');
            return;
        }
        if (direction_desc.length <= 0) {
            alertInfor('error', '技术方向介绍 不能为空');
            return;
        }

        var prestige = $('.prestige_id:checked').map(function () {
            return this.value;
        }).get();
        var cert = $('.cert_id:checked').map(function () {
            return this.value;
        }).get();

        var csessionid = $('#assistant_csessionid').val();
        if (csessionid.length <= 0) {
            alertInfor('error', '请拖动验证码');
            return;
        }

        var sig = $('#assistant_sig').val();
        var token = $('#assistant_token').val();
        var scene = $('#assistant_scene').val();

        var url = '/evangelist/save';
        var data = {
            'csessionid': csessionid,
            'sig': sig,
            'token': token,
            'scene': scene,

            'name': realname, //姓名
            'phone': mobile, //手机
            'email': email, //邮箱
            'qq': qq, //QQ

            'job_year': job_year, //工作年限
            'job': job, //工作职位
            'company': company, //所属公司
            'company_desc': company_desc,// 公司介绍
            'project': project, //项目经验

            'jobs': direction_id, //意向领域
            'prestige': prestige, //社会声誉
            'cert': cert, //技能证书

            'introduction': intro, //其他介绍
            'prestige_desc': prestige_desc, //社会声誉介绍
            'project_desc': project_desc, //项目经验介绍
            'direction_desc': direction_desc, //意向领养介绍

            'referer': document.referrer,
            'request_params': $('#request_params').val()
        };

        console.log(data);

        if (lecturer.lock) {
           $.ajax({
                type: 'POST',
                url: "ascds/asdcsdc",
                dataType: 'json',
                data: data,
                success: function (data) {
                    if (data.error === 0) {
                        alertInfor('info', '提交成功！');
                        lecturer.lock = true;
                    } else {
                        alertInfor('error', data.message);
                        lecturer.lock = true;
                        assistant_nc.reload();
                        $('#assistant_csessionid').val('');
                    }
                },
                error: function () {
                    alertInfor('error', '网络信号不好，请刷新重试!');
                    console.log(data);
                    lecturer.lock = true;
                    assistant_nc.reload();
                    $('#assistant_csessionid').val('');
                }
            });
        } else {
            alertInfor('info', '请耐心等待')
        }
    },
    isEmail: function (source) {
        return /^[A-Z_a-z0-9-\.]+@([A-Z_a-z0-9-]+\.)+[a-z0-9A-Z]{2,4}$/.test(source);
    },
    isMobile: function (source) {
        return /^((\(\d{2,3}\))|(\d{3}\-))?(1[34578]\d{9})$/.test(source);
    }
}

$(function () {
    lecturer.init();
});
