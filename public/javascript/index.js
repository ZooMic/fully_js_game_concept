import game from './game/game';
import $ from 'jquery';

const handleCurrentAppStateResponse = (data) => {
    if(data.user) {
        if(data.user.disconnect) {
            $('#sing-in-window').css('display', 'none');
            $('#my-canvas').css('display', 'none');
            $('#ask-user-window').css('display', 'block');
        } else {
            $('#sing-in-window').css('display', 'none');
            $('#my-canvas').css('display', 'block');
            $('#ask-user-window').css('display', 'none');
            game.init(data);
        }
    } else {
        alert('Critical error. Refresh page and try again!');
    }  
};

const handleErrors = (jqXHR) => {
    
    switch(jqXHR.status) {
        case 401: {
            $('#sign-in-window-err-msg').text(jqXHR.responseJSON.msg);
            $('#sing-in-window').css('display', 'block');
            $('#my-canvas').css('display', 'none');
            $('#ask-user-window').css('display', 'none');
            break;
        }
    }
};

const init = () => {
    $.ajax({
        type: 'GET',
        url: 'current_app_state',
        dataType: 'json',
        success: handleCurrentAppStateResponse,
        error: handleErrors,
    });
};

const login = () => {
    let username = $('#username').val();
    $.ajax({
        type: 'POST',
        url: 'login',
        dataType: 'json',
        data: {username},
        success: init,
        error: handleErrors,
    });
};

const askSubmited = (data) => {
    $.ajax({
        type: 'POST',
        url: 'user-restore-answer',
        dataType: 'json',
        data: {
            answer: data.currentTarget.value,
        },
        success: init,
        error: handleErrors,
    });
};

$('#my-body').on('load', init());
$('#sign-in-submit').on('click', login);
$('.ask-user-window-submit').on('click', askSubmited);


// not pretty layout management



