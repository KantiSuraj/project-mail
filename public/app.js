const socket = io();
const inboxList = document.getElementById("inboxList");
const sentList = document.getElementById("sentList");
const promotionList = document.getElementById("promotionList");
const promoKeywords = ["buy", "discount", "offer", "sale"];

const emailForm = document.getElementById("emailForm");
const toInput = document.getElementById("to");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");

const userEmail = localStorage.getItem("email");
const emailDisplay = document.querySelector('.m');
emailDisplay.textContent = `Hello,${userEmail}`;

if (!userEmail) {
    window.location.href = '/';
}


function showCompose() {
    document.getElementById("composeSection").style.display = "block";
    document.getElementById("inboxSection").style.display = "none";
    document.getElementById("sentSection").style.display = "none";
    document.getElementById("promotionSection").style.display = "none";
}

function showInbox() {
    document.getElementById("composeSection").style.display = "none";
    document.getElementById("inboxSection").style.display = "block";
    document.getElementById("sentSection").style.display = "none";
    document.getElementById("promotionSection").style.display = "none";
}

function showSent() {
    document.getElementById("composeSection").style.display = "none";
    document.getElementById("inboxSection").style.display = "none";
    document.getElementById("sentSection").style.display = "block";
    document.getElementById("promotionSection").style.display = "none";
}

function showPromotion(){
    document.getElementById("composeSection").style.display = "none";
    document.getElementById("inboxSection").style.display = "none";
    document.getElementById("sentSection").style.display = "none";
    document.getElementById("promotionSection").style.display = "block";
}


emailForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const to = toInput.value;
    const subject = subjectInput.value || "(No Subject)";
    const message = messageInput.value;

    socket.emit("sendMessage", {
        from: userEmail,
        to: to,
        subject: subject,
        message: message
    });


    const sentItem = document.createElement("li");
    sentItem.className = "sent";
    sentItem.innerHTML = `<strong>To: ${to}</strong><br><em>${subject}</em><br>${message}`;
    sentList.appendChild(sentItem);

    
    toInput.value = "";
    subjectInput.value = "";
    messageInput.value = "";
});


socket.on("receiveMessage", function (data) {
    const isPromotional = promoKeywords.some(keyword => data.message.toLowerCase().includes(keyword));
    if (data.to === userEmail) {
        if(isPromotional){
            const inboxItem = document.createElement("li");
            inboxItem.className = "received";
            inboxItem.innerHTML = `<strong>From: ${data.from}</strong><br><em>Subject: ${data.subject}</em><br>Body: ${data.message}`;
            promotionList.appendChild(inboxItem);
        } else{
            const inboxItem = document.createElement("li");
            inboxItem.className = "received";
            inboxItem.innerHTML = `<strong>From: ${data.from}</strong><br><em>Subject: ${data.subject}</em><br>Body: ${data.message}`;
            inboxList.appendChild(inboxItem);
        }
    }
});
