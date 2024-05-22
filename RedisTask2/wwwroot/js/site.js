
function Start() {
    ClickChannelMessagesAddedCash();
    setInterval(GetAllMessages, 1000);
}

function ClickChannelMessagesAddedCash() {
    $.ajax({
        url: `/Home/ClickChannelMessagesAddedCash`,
        method: "GET",
        success: function (data) {
        }
    });
}

function GetAllMessages() {
    $.ajax({
        url: `/Home/GetAllMessages`,
        method: "GET",
        success: function (data) {

            var context = "";
            for (var i = 0; i < data.length; i++) {
                context += `
                   <div style="margin:auto;margin-top:3%;text-align:center;background-color:forestgreen">${data[i]}</div>                
                `;
            }

            var messages = document.getElementById("messages");
            messages.innerHTML = context;
        }
    });
}


function AddChannel() {
    var channelName = document.getElementById("addedChannelName");
    if (channelName.value != null && channelName.value.trim() != "") {
        $.ajax({
            url: `/Home/AddChannel?channelName=${channelName.value}`,
            method: "GET",
            success: function (data) {
                GetAllChannels();
                channelName.value = "";
            }
        });
    }
    else {
        alert("Your channel name can't be empty");
    }
}

function GetAllChannels() {
    $.ajax({
        url: `/Home/GetAllChannels`,
        method: "GET",
        success: function (data) {
            var context = "";

            for (var i = 0; i < data.length; i++) {
                context += `
                 <button onclick="ClickChannel('${data[i]}')" style="width:88%;background-color:greenyellow;margin:auto;margin-top:3%;">
                   ${data[i]}
                 </button>
            `;
            }

            var channel = document.getElementById("channels");
            channel.innerHTML = context;
        }
    });
}

function ClickChannel(channelName) {
    $.ajax({
        url: `/Home/ClickChannel?channelName=${channelName}`,
        method: "GET",
        success: function (data) {
            var context = "";

            context += `
                <input id="message" style="width:65%;" />
                <button onclick="SendMessage()" style="width:30%;display:inline-block;">Send Message</button>
            `;

            var sendMessage = document.getElementById("sendMessage");
            sendMessage.innerHTML = context;

            var channelNa = document.getElementById("clickChannelH1Name");
            channelNa.innerHTML = channelName;

            Start();
        }
    });
}

function SendMessage() {
    var message = document.getElementById("message");
    var me = message.value.trim();

    if (me != "") {
        $.ajax({
            url: `/Home/SendMessage?message=${me}`,
            method: "GET",
            success: function (data) {

            }
        });
    }
    else {
        alert("Message can't be empty");
    }
}

GetAllChannels();
