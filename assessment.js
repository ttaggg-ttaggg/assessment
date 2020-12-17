'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子供をすべて削除する
 * @param {HTMLElement} element HTMLの要素
 */

function removeAllChildren(element) {
    while (element.firstChild) {
        //子供の要素がある限り削除
        element.removeChild(element.firstChild);
    }
}

assessmentButton.onclick = function () {
    const userName = userNameInput.value;
    if (userName.length === 0) {
        //名前が空の時は処理を終了する
        return;
    }

    // 診断結果表示エリアの作成
    removeAllChildren(resultDivided);
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    // ツイートエリアの作成
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a'); //<a></a>
    const hrefValue =
        'https://twitter.com/intent/tweet?button_hashtag=' +
        encodeURIComponent('あなたのいいところ') +
        '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href', hrefValue); //<a href="https://～"  ></a>
    anchor.className = 'twitter-hashtag-button'; //<a href="https://～" class='twitter-hashtag-button'></a>
    anchor.setAttribute('data-text', result); //<a href="https://～" class='twitter-hashtag-button' data-text="診断結果の文章"></a>
    anchor.innerText = 'Tweet #あなたのいいところ';
    tweetDivided.appendChild(anchor);

    //widgets.jsの設定
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
};

const answers = [
    '{userName}のいいところはその声です。{userName}の声は聴く者の心を惹きつけ、魅了してやまないでしょう。',
    '{userName}のいいところはそのつぶらな瞳です。{userName}に見つめられた人は、石になったかの様に見とれてしまうでしょう。',
    '{userName}のいいところはその情熱です。{userName}の溢れる情熱は頑なな心を氷解し、周囲に伝播していくでしょう。',
    '{userName}のいいところはその厳しさです。{userName}の真に人を想う厳しさは時には激しく、時には優しく周囲の人たちを救うでしょう。',
    '{userName}のいいところはその博識さです。{userName}の一言は俗人の千の言の葉にも勝るでしょう。',
    '{userName}のいいところはそのユーモアです。{userName}の発想に世界は常に新しい刺激を受けるでしょう。',
    '{userName}のいいところはその用心深さです。石橋を叩いて渡ることは愚か、新たな石橋を建てる{userName}の用心深さはあなたと周囲を守るでしょう。',
    '{userName}のいいところはその容姿です。{userName}の美貌は悪魔さえ魅了し、甘い時間を与えるでしょう。',
    '{userName}のいいところはその決断力です。{userName}の速やかで大胆な決断は後々必ず英断と賛辞を受けるでしょう。',
    '{userName}のいいところはその思いやりです。{userName}の思いやりはあなたが想像するよりも多くの人から感謝をされていることでしょう。',
    '{userName}のいいところはその感受性です。万物の想いを拾い上げ、それに応える{userName}は多くの信頼を集めるでしょう',
    '{userName}のいいところはその節度です。謙虚を具現化したような{userName}の考えは日本の心そのものと言えるかもしれません。',
    '{userName}のいいところはその溢れんばかりの好奇心です。好奇心猫を殺すといいますが、{userName}の好奇心は猫をも救うに違いありません。',
    '{userName}のいいところはその気配りです。底の見えない{userName}の遍く衆中を救うでしょう',
    '{userName}のいいところは枚挙に暇がありません。ありがとう、生まれてきてくれて。ありがとう、{userName}のお母さま。',
    '{userName}のいいところはその自制心です。己を殺す{userName}の心の刃は見る人の心をも洗います。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
    // 全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }

    // 文字のコード番号の合計を回答の数で割って添字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];
    result = result.replace(/\{userName\}/g, userName);
    return result;
}



// テストコード
console.assert(
    assessment('太郎') ===
    '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);
console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
);
