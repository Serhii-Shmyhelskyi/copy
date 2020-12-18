$(document).ready(function () {

    //E-mail Ajax Send
    $("form").submit(function () { //Change
        var th = $(this);
        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function () {
            alert("Thank you!");
            setTimeout(function () {
                // Done Functions
                th.trigger("reset");
            }, 1000);
        });
        return false;
    });

});

(function ($) {
    $(document).ready(function () {
        $("input.js-phone").keyup(function () {
            var val = $(this).val();
            regVal = /[^\d\+\(\)\-]/g;
            newval = val.replace(regVal, "");
            $(this).val(newval);
        });

        $(".js-phone").intlTelInput({
            geoIpLookup: function (callback) {
                var geo = '';
                if (geo == '') {
                    $.get("//ipinfo.io", function () { }, "jsonp").always(function (resp) {
                        var countryCode = (resp && resp.country) ? resp.country : "";
                        callback(countryCode);
                    });
                } else {
                    callback(geo);
                }
            },
            initialCountry: "auto",
            nationalMode: false,
            utilsScript: "./bundles/utils.js",
            customPlaceholder: function (selectedCountryPlaceholder, selectedCountryData) {
                return selectedCountryPlaceholder;
            },
        });
    });
})(jQuery);

function checkIp() {
    $.getJSON('https://apileads.3snet.tech/check-ip', function (data) {
        console.log(data);
        if (typeof data.ip != 'undefined') {
            var ip = data.ip;
            $('input[name=ip]').attr('value', ip);
        }
    });
};

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function copies() {
    var el = $(".slots .pin");
    var left = parseInt($(el).html());

    left = left > 5 ? left - rand(1, 3) : left - rand(-2, 2);
    if (left < 2) {
        $(el).html(1);
    } else $(el).html(left);

    setTimeout('copies()', rand(9000, 13000));
}

function visitors() {
    var el = $(".online .pin");
    var left = parseInt($(el).html());
    var start = left - 20;
    var end = left + 20;
    if (start < 100) start = left;
    if (end > 200) end = left;
    $(".online .pin").html(rand(start, end));
    setTimeout('visitors()', rand(3000, 13000));
}

yesyoucan = 1;

function videoReview() {
    $('.video-review').click(function () {
        $(this).find(".poster").remove();
        $(this).find("video").play();
    });
}

$(function () {
    copies();
    visitors();
    videoReview();
});


window.addEventListener("DOMContentLoaded", function () {

    // get the form elements defined in your form HTML above

    var form = document.getElementById("my-form");
    var button = document.getElementById("my-form-button");
    var status = document.getElementById("my-form-status");

    // Success and Error functions for after the form is submitted

    function success() {
        form.reset();
        button.style = "display: none ";
        status.innerHTML = "Thanks!";
    }

    function error() {
        status.innerHTML = "Oops! There was a problem.";
    }

    // handle the form submission event

    form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var data = new FormData(form);
        ajax(form.method, form.action, data, success, error);
    });
});

// helper function for sending an AJAX request

function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        if (xhr.status === 200) {
            success(xhr.response, xhr.responseType);
        } else {
            error(xhr.status, xhr.response, xhr.responseType);
        }
    };
    xhr.send(data);
}
