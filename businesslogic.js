//変数Questionを宣言 問題配列
var Questions = [];

//変数CurrentQuestionを宣言　現在の問題配列
var CurrentQuestion = [];

//変数answersAry正解した問題配列
var answersAry = []



//問題文の用意
addQuestion("多くのプログラミング言語でif{}else{}等と書かれる構文で行われる動作条件は[?]。", '分岐', '次第', '想定', '構想');

addQuestion("変数に入れるデータは基本的に値と[?]が求められる。", '型', '式', '数', '枠');

addQuestion("C、JAVA、PHP、javascriptでのforとは何を行う為の動作であるか", '繰り返し処理', '処理の対象を決める', '処理の呼び出し元を定義する', '処理を停止する');

addQuestion("例えば画像ファイルの末尾に付けれられたファイルの種類を示すものを何という？", '拡張子', '識別子', '判別子', '終端子');

//初期表示イベント
document.addEventListener(
    //Webページが読み込みが完了したとき、ランダムに問題を表示する
    'DOMContentLoaded', function () {
        let tmpAry = Questions.concat();
        //ArrayRandomaizer関数で生成した問題を
        CurrentQuestion = ArrayRandomaizer(Questions);
        //表示
        setQuestion(0);
    });

//関数宣言 ランダム
function ArrayRandomaizer(original) {
    //変数宣言　
    let tmpAry = original.concat();
    var randomaized = [];
    /*繰り返し処理
    ランダムに問題をセットする
    変数に代入されている問題を次の問題に置き換える
    */
    //tmpAry.length(4)
    //0より大きい場合繰り返し処理をする
    while (0 < tmpAry.length) {
        //temAryの要素数をMath.floor メソッドで小数点以下の値を切り捨ててMath.randomで乱数を生成する
        var set = Math.floor(Math.random() * tmpAry.length);
        //生成した問題を変数setに挿入
        randomaized.push(tmpAry[set]);
        //第1引数で指定した要素から、第2引数で指定した値を取り除く
        //tmpAry（４つの問題）set(0)１(2問目)を削除
        tmpAry.splice(set, 1);
    }
    //randomaizedへ値を返す
    return randomaized;
}


//関数宣言 問題をsentenceにセット解答ボタンを生成
function setQuestion(number) {
    //HTML.CSS要素取得、Answers、resultの挿入
    //関数呼び出し
    countQuestions(number)
    document.querySelector('#Answers').innerHTML = '';
    // document.querySelector('#result').innerHTML = '';
    //CurrentQuestion要素とnumberが等しいかそれ以下なら処理終了
    if (CurrentQuestion.length <= number) {
        return;
    }
    //questionに現在の問題番号を代入
    var question = CurrentQuestion[number];

    question.selects = ArrayRandomaizer(question.selects);
    document.querySelector('#Sentence').innerHTML = question.sentence;

    //繰り返し処理 解答ボタン生成
    for (let i = 0; i < question.selects.length; i++) {
        //ボタン生成,css付与
        var button = document.createElement('button');
        button.innerHTML = question.selects[i];
        //setAttributeで属性を追加・変更
        button.setAttribute('style', ' display:block ; min-width:300px;cursor:pointer; margin-top: 5px; ');
        //ボタンクリックイベント処理
        button.addEventListener('click', function () {
            judgeAnswer(number, question.selects[i])
        });
        //createElementで生成したボタンをappendChild()によって要素追加
        document.querySelector('#Answers').appendChild(button);
    }
}


    //関数宣言 結果取得 numberは要素番号：valueは要素名
function judgeAnswer(number, value) {
        //checkQuestion関数呼び出し
        checkQuestion(number, value)
        //idリザルトに表示
        // document.querySelector('#result').innerHTML = '';
        //問題数１づつ増やす
        setQuestion(number + 1)
        
}


    //上部addQuestionの問題文を挿入
function addQuestion(sentence, answer, wrong1, wrong2, wrong3) {
        Questions.push(new QuestionEntity(sentence, answer, wrong1, wrong2, wrong3));
}


    //関数宣言 問題情報取得インスタンス生成
function QuestionEntity(sentence, answer, wrong1, wrong2, wrong3) {
    //問題呼び出し
    this.sentence = sentence;
    //答え呼び出し
    this.answer = answer;
    //解答配列呼び出し
    this.selects = [answer, wrong1, wrong2, wrong3];
    }


    //問題数カウント関数　numberは問題番号
function countQuestions(number) {
        //Questions.lengthから問題要素を取得してQuestions.lengthよりnumber問題番号が小さい場合処理を続ける
        //カウントは0から始まるので+1している、Questions.lengthは問題数
        if (number + 1 <= Questions.length) {
            //文字列とQuestions.lengthを結合してHTMLに表示
            document.querySelector('#count').innerHTML = (number + 1) + "問目 " + "/ 全 " + Questions.length + " 問中";
            //そうじゃなければカウントを0にする
    } else {
        document.querySelector('#Sentence').innerHTML = '';
        //解答数0初期値付与
        var AnswersCount = 0
        
        //answerは解答要素　indexは問題番号要素
        //answersAry配列の中の要素分繰り返して要素がおわる所で終了する。（配列の各要素について繰り返し）
        answersAry.forEach((answer, index) => {
            //答えが正しければカウントを増やす
            if (answer.correctAnswer) {
                AnswersCount++
                
            }
            //すべての問題が完了した後に表示する
            //カウントは0から始まるので+1している
            if (index + 1 == answersAry.length) {
                document.getElementById('exe').style.display = 'none';
                document.querySelector('#result').style.display = 'block';
                document.querySelector('#result').innerHTML = "正解数は " + AnswersCount + " 問です!";
                // document.querySelector('#Sentence').innerHTML = "正解数は " + AnswersCount + " 問です!";
            }
        })
    }
}

    //解答チェック関数numberは要素番号：valueは要素名
function checkQuestion(number, value) {
    //質問配列作成
    var question = {}
     //answersAryに正解した答えが存在するかチェック、または問題が存在する場合同じ問題ではないかチェックする
    if (answersAry[number] == undefined || answersAry[number].sentence != CurrentQuestion[number].sentence) {
         //question.sentenceに現在の問題を追加
        question.sentence = CurrentQuestion[number].sentence
         //現在の問題の答えと選んだ答えが正解かどうかをtrueかfalseで判別
        question.correctAnswer = CurrentQuestion[number].answer == value ? true : false
        //判定された値をquestionに挿入
        answersAry.push(question)
    }
}