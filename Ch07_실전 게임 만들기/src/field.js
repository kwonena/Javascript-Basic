"use strict";
// 게임을 정확하게 생성, 아이템 제자리에 배치, 클릭 핸들링 역할
import * as sound from "./sound.js";

const CARROT_SIZE = 80;

export default class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.field = document.querySelector(".game_field");
    this.fieldRect = this.field.getBoundingClientRect();
    this.field.addEventListener("click", this.onClick);
  }

  init() {
    this.field.innerHTML = "";
    // 벌레와 당근을 생성한 뒤 field에 추가해줌
    this._addItem("carrot", this.carrotCount, "img/carrot.png");
    this._addItem("bug", this.bugCount, "img/bug.png");
  }

  setEventListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  // private한 함수라는 것을 알리기 위해 underbar_ 사용
  _addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - CARROT_SIZE;
    const y2 = this.fieldRect.height - CARROT_SIZE;
    for (let i = 0; i < count; i++) {
      const item = document.createElement("img");
      item.setAttribute("class", className);
      item.setAttribute("src", imgPath);
      item.style.position = "absolute";
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.field.appendChild(item);
    }
  }
  onClick(event) {
    const target = event.target;
    if (target.matches(".carrot")) {
      // 당근!!
      target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick("carrot");
    } else if (target.matches(".bug")) {
      // 벌레!!
      this.onItemClick && this.onItemClick("bug");
    }
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
