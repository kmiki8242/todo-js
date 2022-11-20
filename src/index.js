import "./styles.css";

const onClickAdd = () => {
  // テキストボックスの値を取得し、初期化する
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  createIncompleteList(inputText);
};

// 未完了リストから指定の要素を削除
const deleteFromIncompleteList = (target) => {
  document.getElementById("imcomplete-list").removeChild(target);
};

// 完了リストから指定の要素を削除
const deleteFromCompleteList = (target) => {
  document.getElementById("complete-list").removeChild(target);
};

//未完了リストに追加する関数
const createIncompleteList = (text) => {
  // div生成
  const div = document.createElement("div");
  div.className = "list-row";

  // pタグ生成
  const p = document.createElement("p");
  p.innerText = text;

  // liタグ生成
  const li = document.createElement("li");

  // button(完了)タグ生成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    //未完了のTODOからタスク削除
    deleteFromIncompleteList(completeButton.closest("li"));

    //完了リストに追加する要素
    const addTarget = completeButton.parentNode;

    // TODO内容テキストを取得
    const completeText = addTarget.firstElementChild.innerText;

    //div以下を初期化
    addTarget.textContent = null;

    // pタグ生成
    const p = document.createElement("p");
    p.innerText = completeText;

    // liタグ生成
    const li = document.createElement("li");

    //button(戻す)生成
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    backButton.addEventListener("click", () => {
      //押された戻すボタンの親タグを完了リストから削除
      deleteFromCompleteList(backButton.closest("li"));

      //テキスト取得
      const text = backButton.previousElementSibling.innerText;
      createIncompleteList(text);
    });

    // liの子要素に各要素を設定
    li.appendChild(div);

    // divタグの子要素に各要素を設定
    div.appendChild(p);
    div.appendChild(backButton);

    // 完了リストに追加
    document.getElementById("complete-list").appendChild(li);
  });

  // button(削除)タグ生成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    //押された削除ボタンの親タグを未完了リストから削除
    deleteFromIncompleteList(deleteButton.closest("li"));
  });

  // liの子要素に各要素を設定
  li.appendChild(div);

  // divタグの子要素に各要素を設定
  div.appendChild(p);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  // 未完了リストに追加
  document.getElementById("imcomplete-list").appendChild(li);
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
