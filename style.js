
 // HTMLにある部品を、idを使って取得する
const textInput = document.getElementById("textInput");
const displayButton = document.getElementById("displayButton");
const addButton = document.getElementById("addButton");
const backgroundButton = document.getElementById("backgroundButton");
const textDisplay = document.getElementById("textDisplay");
const tableBody = document.getElementById("tableBody");
const rowCount = document.getElementById("rowCount");

// テーブルに表示できる行数は最大3件
const MAX_ROWS = 3;

// 設問2：背景色を変更する順番
const backgroundColors = ["lightblue", "lightgreen", "lightcoral"];
let backgroundIndex = 0;

backgroundButton.addEventListener("click", () => {
    // 現在の順番の色をページ全体に設定する
    document.body.style.backgroundColor = backgroundColors[backgroundIndex];

    // 次に使う色へ進む。最後の色の次は先頭へ戻る
    backgroundIndex = (backgroundIndex + 1) % backgroundColors.length;
});

// 設問1・3：「表示」ボタンの処理
displayButton.addEventListener("click", () => {
    // 前後の空白を取り除いた文字を取得する
    const text = textInput.value.trim();

    // 空なら警告して終了。表示内容もハイライトも変更しない
    if (text === "") {
        alert("入力値が空です。");
        return;
    }

    // 入力した文字を表示エリアに表示する
    textDisplay.textContent = text;

    // クリックするたび黄色のハイライトをON/OFFする
    textDisplay.classList.toggle("highlight");
});

// 現在の行数と「表示」ボタンの表示状態を更新する関数
function updateRowCount() {
    const count = tableBody.rows.length;

    // テーブルに現在表示されている行の数を表示する
    rowCount.textContent = `現在の行数: ${count} 件`;

    // 3件以上なら「表示」を隠す。3件未満なら再表示する
    // 「追加」ボタンは隠さない
    displayButton.hidden = count >= MAX_ROWS;
}

// 設問4・6：「追加」ボタンの処理
addButton.addEventListener("click", () => {
    const text = textInput.value.trim();

    // 空白だけの行を作らないためのチェック
    if (text === "") {
        alert("入力値が空です。");
        return;
    }

    // テーブルの新しい1行を作成する
    const newRow = document.createElement("tr");
    const contentCell = document.createElement("td");
    const actionCell = document.createElement("td");
    const deleteButton = document.createElement("button");

    // 左側のセルに入力内容を安全に文字として設定する
    contentCell.textContent = text;

    // 右側のセルに「削除」ボタンを作る
    deleteButton.type = "button";
    deleteButton.textContent = "削除";

    // 設問5：この行の「削除」が押されたら、その行だけ削除する
    deleteButton.addEventListener("click", () => {
        newRow.remove();
        updateRowCount();
    });

    // セルを行へ組み込み、行をテーブルの一番下に追加する
    actionCell.appendChild(deleteButton);
    newRow.appendChild(contentCell);
    newRow.appendChild(actionCell);
    tableBody.appendChild(newRow);

    // 設問6：4件以上になったら、一番古い先頭の行を削除する
    if (tableBody.rows.length > MAX_ROWS) {
        tableBody.firstElementChild.remove();
    }

    // 追加後の行数と「表示」ボタンを更新する
    updateRowCount();
});

// 起動時にも行数と「表示」ボタンの状態をそろえる
updateRowCount();

// 設問7：コンソールに1から5まで表示する
for (let i = 1; i <= 5; i++) {
    console.log(i);
}
