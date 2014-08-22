var socket = io.connect({
    secure: true
});
if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function(str) {
        return this.slice(0, str.length) == str;
    };
}

function addMessage(msg, nickname) {
    filterContent(msg, nickname);
}
var sender;

function sendMessage() {
    if ($('#messageInput').val() != "") {
        if ($('#messageInput').val().startsWith('/')) {
            var name = $('#messageInput').val().split(" ")[0].replace(/\/+/g, '');
            socket.emit('privateMessage', {
                'sender': sender,
                'name': name,
                'message': $('#messageInput').val()
            });
        } else {
            socket.emit('message', $('#messageInput').val());
        }

        addMessage($('#messageInput').val(), "Me", new Date().toISOString(), true);
        $('#messageInput').val('');
    }
}

function setName() {
    if ($("#nameInput").val() != "") {
        sender = $("#nameInput").val();
        socket.emit('setName', $("#nameInput").val());
        $('#chatControls').show();
        $('#register').hide();
    }
}
socket.on('message', function(data) {
    if (data.sender == "Test")
        alert("test");
    else
        addMessage(data['message'], data['nickname']);
    if (!notiOff) {
        noti.play();
        missedMessages++;
        // $('#friend:last-child').css("background-color","red");
    }
});


$(function() {
    if (typeof String.prototype.startsWith != 'function') {
        String.prototype.startsWith = function(str) {
            return this.slice(0, str.length) == str;
        };
    }

    new uploader('chat', 'status', false, 'list');

    $(window).on("blur focus", function(e) {
        var prevType = $(this).data("prevType");

        if (prevType != e.type) { //  reduce double fire issues
            switch (e.type) {
                case "blur":
                    notiOff = false;
                    break;
                case "focus":
                    notiOff = true;
                    // $('.message').slice(-missedMessages).css("background-color","blue");
                    missedMessages = 0;
                    break;
            }
        }
        $(this).data("prevType", e.type);
    });

    missedMessages = 0;
    notiOff = true;
    noti = document.createElement("audio");
    noti.setAttribute("src", "resources/sounds/1.mp3");
    noti.load();
    noti.volume = 0.3;

    $("#chatControls").hide();

    //  $('.messageImage').on("click","a,img", function (e) {
    //    // e.preventDefault();
    //    alert('e');
    // });
    $("#nameButton").click(function() {
        setName()
    });
    $("#submit").click(function() {
        sendMessage();
    });
    $('#nameInput').focus();

    $('#nameInput').keypress(function(e) {
        if (e.which == 13) {
            setName();
            $('#messageInput').focus();
        }
    });
    $('#messageInput').keypress(function(e) {
        if (e.which == 13) {
            sendMessage();
        }
    });
});

function filterContent(msg, nickname) {
    if (nickname != "Me") {
        friend = 'id="friend"';
    } else {
        friend = '';
    }
    if (msg.startsWith('data:image/')) {
        var img = document.createElement('img');
        img.src = msg;
        var div = document.createElement('div');
        div.className = "message messageImage";
        if (friend) div.id = "friend";
        $(div).append(img);
        $("#content").append(div);
        img.addEventListener('click', function(e) {
            if ($(this).width() != 100) $(this).width(100);
            else {
                $(this).width($('#content').width() - 20);
                $("#content").scrollTo(($(this)), 200, {
                    easing: 'linear'
                });
            }
        });
    } else if (msg.startsWith('data:audio/')) {
        var aud = document.createElement('audio');
        aud.src = msg;
        // aud.setAttribute('controls');
        var div = document.createElement('div');
        div.className = "message messageAudio";
        if (friend) div.id = "friend";
        $(div).append(aud);
        var playImg = new loadImage('play');
        playImg.style.display = 'block';
        $(div).append(playImg);
        $(div).append(new loadImage('pause'));
        $("#content").append(div);
        div.addEventListener('click', function(e) {
            if (this.children[0].paused) {
                this.children[0].play();
                this.children[1].style.display = "none";
                this.children[2].style.display = "block";
            } else {
                this.children[0].pause();
                this.children[1].style.display = "block";
                this.children[2].style.display = "none";
            }
        });
    } else if (msg.startsWith('data:video/')) {
        var vid = document.createElement('video');
        var source = document.createElement('source');
        source.src = msg;
        $(vid).append(source);
        // vid.setAttribute('controls');
        var div = document.createElement('div');
        div.className = "message messageImage";
        if (friend) div.id = "friend";
        $(div).append(vid);
        $("#content").append(div);
        vid.addEventListener('click', function(e) {
            if (this.paused) this.play();
            else this.pause();
        });
    } else if (msg.startsWith('http')) {
        $("#content").append('<div class="message"' + friend + '><span id="textInMessage"><a href="' + msg + '">' + msg + '<a/></span></div>');
    } else {
        $("#content").append('<div class="message"' + friend + '><span id="textInMessage">' + msg + '</span></div>');
    }

    $("#content").stop().animate({
        scrollTop: $("#content")[0].scrollHeight
    }, 1000);
}

function loadImage(image) {
    var img = document.createElement("img");
    img.src = 'resources/images/' + image + '.png';
    img.style.display = 'none';
    img.setAttribute('id', 'controlsImg')
    return img;
}