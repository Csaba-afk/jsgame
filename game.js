let counter = 0;
let score = 0;
let cardsremaining = 12;
let cardsarrey = ['argenthorse', 'aya', 'baneod', 'confessor', 'drboom', 'elemd', 'ferals', 'huffer',
    'iceblock', 'leeroy', 'looth', 'mirrorentity', 'mysterious', 'noviceeng',
    'piloteds', 'rhino', 'seagiant', 'wele', 'wolfrider'];
menu();

function reveal(element) {
    if (document.getElementById(element).className === "card") {
        counter += 1;
    }
    if (counter <= 2) {
        if (element.charAt(element.length - 1) === '1') {
            document.getElementById(element).className = element.substring(0, element.length - 1)
        } else {
            document.getElementById(element).className = element;
        }
    }
    if (counter === 2) {
        matchcheck(element);
        setTimeout(hidecards, 2500);
        setTimeout(counterto0, 2500);
        setTimeout(emptyboardcheck, 2500);
    }
}

function hidecards() {
    let divs = document.querySelectorAll('[title="card"]');
    let i;
    for (i = 0; i < divs.length; i++) {
        divs[i].className = divs[i].title;
    }
}

function counterto0() {
    counter = 0;
}

async function matchcheck(element) {
    let divs;
    if (element.charAt(element.length - 1) === '1') {
        divs = document.querySelectorAll("[class= " + element.substring(0, element.length - 1) + "]");
    } else {
        divs = document.querySelectorAll("[class= " + element + "]");
    }
    if (divs.length === 2) {
        await sleep(2450);
        let i;
        for (i = 0; i < divs.length; i++) {
            divs[i].id = "chicken";
            divs[i].className = "chicken";
            divs[i].title = "chicken";
        }
        score += 1;
        cardsremaining -= 2;
        document.getElementById("score").innerHTML = score.toString();
    }

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function shuffleCards() {
    let mixedCardsContainer = document.querySelector(".all-cards");
    for (let i = mixedCardsContainer.children.length; i >= 0; i--) {
        mixedCardsContainer.appendChild(mixedCardsContainer.children[Math.random() * i | 0]);
    }
}

function cardselector() {
    let selectedarr = [];
    for (let i = 0; i < 5; i++) {
        let y = Math.floor(Math.random() * cardsarrey.length);
        if (selectedarr.includes(cardsarrey[y])) {
            i -= 1;
        } else {
            selectedarr.push(cardsarrey[y])
        }
    }
    for (let i = selectedarr.length; i >= 0; i--) {
        let x = document.createElement("div");
        x.title = "card";
        x.className = "card";
        x.id = cardsarrey[i];
        x.onclick = function () {
            reveal(this.id)
        };
        document.getElementById("all-cards").appendChild(x)
    }

}

function makepairs() {
    let allcardcontainer = document.querySelectorAll(".card");
    for (let i = allcardcontainer.length - 1; i >= 0; i--) {
        let elem = allcardcontainer[i];
        let clone = elem.cloneNode(true);
        clone.id = elem.id + "1";
        clone.onclick = function () {
            reveal(this.id)
        };
        elem.after(clone);
    }

}

function emptyboardcheck() {
    if (cardsremaining === 0) {
        cardsremaining = 12;
        document.getElementById("all-cards").remove();
        allcards();
        counter = 0;
        cardselector();
        makepairs();
        shuffleCards();
    }
}

function starting() {
    let x = document.createElement("div");
    x.className = "counter";
    x.innerHTML = "Time Left :  ";
    x.id = "counter";
    document.getElementById("header").appendChild(x);
    setuptimer();
    x = document.createElement("div");
    x.className = "points";
    x.innerHTML = "Your points :";
    document.getElementById("header").appendChild(x);
    x = document.createElement("div");
    x.className = "score";
    x.id = "score";
    x.innerHTML = "0";
    document.getElementById("header").appendChild(x);
    countdown();

}

function menu() {
    let x = document.createElement("div");
    x.id = "button-wrap";
    x.className = "button-wrap";
    document.body.append(x);
    x = document.createElement("button");
    x.id = "play";
    x.innerHTML = "Play";
    x.className = "myButton";
    x.onclick = function () {
        play()
    };
    document.getElementById("button-wrap").appendChild(x);
    x = document.createElement("button");
    x.id = "highscores";
    x.innerHTML = "Highest Score";
    x.className = "myButton";
    x.onclick = function () {
        highestscore()
    };
    document.getElementById("button-wrap").appendChild(x);
}

function play() {
    document.getElementById("play").remove();
    document.getElementById("highscores").remove();
    document.getElementById("button-wrap").remove();
    let x = document.createElement("div");
    x.className = "header";
    x.id = "header";
    document.body.append(x);
    x = document.createElement("div");
    x.className = "all-cards";
    x.id = "all-cards";
    document.body.append(x);
    document.body.className = "body";
    starting();
    cardselector();
    makepairs();
    shuffleCards();
}

function allcards() {
    let x = document.createElement("div");
    x.className = "all-cards";
    x.id = "all-cards";
    document.body.append(x)
}

let mins = 1.5;
let secs = mins * 60;

function countdown() {
    setTimeout('Decrement()', 60);
}

function Decrement() {
    if (document.getElementById) {
        minutes = document.getElementById("minutes");
        seconds = document.getElementById("seconds");
        if (seconds < 59) {
            seconds.innerHTML = toString(secs) + "s";
        } else {
            minutes.innerHTML = getminutes() + "m ";
            seconds.innerHTML = getseconds() + "s";
        }
        if (mins < 1) {
            minutes.style.color = "red";
            seconds.style.color = "red";
        }
        if (mins < 0) {
            timesup();
            minutes.innerHTML = 0;
            seconds.innerHTML = 0;
            mins = 1;
            location.reload();
        } else {
            secs--;
            setTimeout('Decrement()', 1000);
        }
    }
}

function getminutes() {
    mins = Math.floor(secs / 60);
    return mins;
}

function getseconds() {
    return secs - Math.round(mins * 60);
}

function setuptimer() {
    let x = document.createElement("div");
    x.className = "minutes";
    x.id = "minutes";
    document.getElementById("header").appendChild(x);
    x = document.createElement("div");
    x.className = "seconds";
    x.id = "seconds";
    document.getElementById("header").appendChild(x);
}

function timesup() {
    let x = document.getElementById("score").innerHTML;
    let y = localStorage.getItem("score");
    if (y !== null) {
        if (parseInt(x) > parseInt(y)) {
            localStorage.setItem("score", x);
        }
    }
    else {
        localStorage.setItem("score", x);
    }
    alert("You earned :" + x + " points !")

}

function highestscore() {
    let x = localStorage.getItem("score");
    alert("Your highest score is :" + x + " points !")
}