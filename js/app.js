$(document).ready(init);
let totalTargets = 4;
let totalHit = 0;

function init() {
    animateTitle();
    draggableIcons();
}

function animateTitle() {
    let title = document.querySelector(".title");
    let letters = document.querySelectorAll(".letter");
    let tl = new TimelineMax();

    letters.forEach((letter) => {
        tl.from(
            letter,
            0.1,
            {
                duration: 0.1,
                opacity: 0,
                //x: -500,
                y: 500,
                //delay: 2,
                //ease: Back.easeOut
                ease: "elastic.out(1, 0.3)"
            },
            "+=0.02"
        );
    });
}

function draggableIcons() {
    let cont = document.querySelector(".container");
    let target = $(".target");
    let totalTargets = 4;
    let totalHit = 0;

    gsap.from(
        ".target",
        {
            rotation: 270,
            x: 600,
            y: -600,
            duration: 2,
            delay: 2,
            stagger: 0.3,
            force3D: true
        },
        initDraggableItem()
    );

    function initDraggableItem() {
        Draggable.create(target, {
            bounds: cont,
            type: "x, y",
            //edgeResistance: 0.65,
            cursor: "pointer",
            //inertia:true

            onPress() {
                this.startX = this.x; //left right
                this.startY = this.y; //top down
                this.offsetTop = this.startY - $(this.target).position().top;
                this.offsetLeft = this.startX - $(this.target).position().left;
            },
            onDragEnd() {
                let dragThingthis = this;
                let dropTargets = document.querySelectorAll(".box");
                let dragId = this.target.id + "Drop";

                $.each(target, function (idx, spot) {
                    let pos = $(spot).position();
                    let diffTop = dragThingthis.offsetTop + pos.top;
                    let diffLeft = dragThingthis.offsetLeft + pos.left;

                    let spotId = spot.id;
                    //console.log(dragId);
                    if (spotId === dragId) {
                        if (dragThingthis.hitTest(spot, "10%")) {
                            TweenMax.to(dragThingthis.target, 0.5, {
                                x: diffLeft,
                                y: diffTop,
                                onComplete: hideMatches,
                                onCompleteParams: [dragThingthis, spot]
                            });
                            // console.log(dragThingthis.offsetTop +' '+ pos.top);
                        } else {
                            TweenMax.to(dragThingthis.target, 0.5, {
                                x: dragThingthis.startX,
                                y: dragThingthis.startY
                            });
                        }
                    }
                });
            }
        });
    }
}

function hideMatches(dragItem, targetItem) {
    /*let totalTargets = 4;
    let totalHit = 0;*/
    totalHit++;
    TweenMax.to([dragItem.target, targetItem], 0.5, {
        autoAlpha: 0,
        onComplete: checkTargetCount
    });
}

function checkTargetCount() {
    //console.log(totalTargets + ' '+ totalHit);
    if (totalHit == totalTargets) {
        TweenMax.to(".modal", 2, {
            autoAlpha: 1,
            scale: 2.5,
            opacity: 1,
            onComplete: function () {
                TweenMax.to(".modal", 2.5, { scale: 1, opacity: 0, delay: 2.5 }, 2);
            }
        });
    }
}
