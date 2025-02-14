function Dashboard(opts) {
    var options = opts;

    var ShowReservationAjaxResponse = function () {
        $('.blockUI').css('cursor', 'default');

        $('#creatingNotification').hide();
        $('#result').show();
    };

    var CloseSaveDialog = function () {
        $.unblockUI();
    };
    Dashboard.prototype.init = function () {
        /*function setIcon(dash, targetIcon) {
            var iconSpan = dash.find('.dashboardHeader').find('a>.bi');
            iconSpan.removeClass('bi-chevron-up');
            iconSpan.removeClass('bi-chevron-down');
            iconSpan.addClass(targetIcon);
        }

        $(".dashboard").each(function (i, v) {
            var dash = $(v);
            var id = dash.attr('id');
            var visibility = readCookie(id);
            if (visibility == '0') {
                dash.find('.dashboardContents').hide();
                setIcon(dash, 'bi-chevron-down');
            } else {
                setIcon(dash, 'bi-chevron-up');
            }

            dash.find('.dashboardHeader a').click(function (e) {
                e.preventDefault();
                var dashboard = dash.find('.dashboardContents');
                var id = dashboard.parent().attr('id');
                if (dashboard.css('display') == 'none') {
                    createCookie(id, '1', 30, opts.scriptUrl);
                    dashboard.show();
                    setIcon(dash, 'bi-chevron-up');
                } else {
                    createCookie(id, '0', 30, opts.scriptUrl);
                    dashboard.hide();
                    setIcon(dash, 'bi-chevron-down');
                }
            });
        });*/

        $('.resourceNameSelector').each(function () {
            $(this).bindResourceDetails($(this).attr('resource-id'));
        });

        var reservations = $(".reservation");

        reservations.qtip({
            position: {
                my: 'bottom left', at: 'top left', effect: false
            },

            content: {
                text: function (event, api) {
                    var refNum = $(this).attr('id');
                    $.ajax({ url: options.summaryPopupUrl, data: { id: refNum } })
                        .done(function (html) {
                            api.set('content.text', html)
                        })
                        .fail(function (xhr, status, error) {
                            api.set('content.text', status + ': ' + error)
                        });

                    return 'Loading...';
                }
            },

            show: {
                delay: 700, effect: false
            },

            hide: {
                fixed: true, delay: 500
            },

            style: {
                classes: 'qtip-light qtip-bootstrap'
            }
        });

        reservations.hover(function () {
            $(this).addClass('hover');
        }, function () {
            $(this).removeClass('hover');
        });

        reservations.mousedown(function () {
            $(this).addClass('clicked');
        });

        reservations.mouseup(function () {
            $(this).removeClass('clicked');
        });

        reservations.click(function () {
            var refNum = $(this).attr('id');
            window.location = options.reservationUrl + refNum;
        });

        $('.btnCheckin').click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            var button = $(this);
            button.attr('disabled', 'disabled');
            button.find('i').removeClass('bi-box-arrow-in-right').addClass('spinner-border').css({
                'width': '1rem',
                'height': '1rem'
            });

            var form = $('#form-checkin');
            var refNum = $(this).attr('data-referencenumber');
            $('#referenceNumber').val(refNum);
            $.blockUI({ message: $('#wait-box') });
            ajaxPost(form, $(this).data('url'), null, function (data) {
                $('button[data-referencenumber="' + refNum + '"]').addClass('d-none');
                $('#result').html(data);
                ShowReservationAjaxResponse();
            });
        });

        $('.btnCheckout').click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            var button = $(this);
            button.attr('disabled', 'disabled');
            button.find('i').removeClass('bi-box-arrow-in-left').addClass('spinner-border').css({
                'width': '1rem',
                'height': '1rem'
            });

            var form = $('#form-checkout');
            var refNum = $(this).attr('data-referencenumber');
            $('#referenceNumber').val(refNum);
            $.blockUI({ message: $('#wait-box') });
            ajaxPost(form, null, null, function (data) {
                $('button[data-referencenumber="' + refNum + '"]').addClass('d-none');
                $('#result').html(data);
                ShowReservationAjaxResponse();
            });
        });

        $('#wait-box').on('click', '#btnSaveSuccessful', function (e) {

            CloseSaveDialog();
        });

        $('#wait-box').on('click', '#btnSaveFailed', function (e) {
            CloseSaveDialog();
        });
    };
}