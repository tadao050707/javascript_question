//変数Questionを宣言 問題
    var Questions = [];

//変数CurrentQuestionを宣言
    var CurrentQuestion = [];
        
    //問題文の用意
    addQuestion("多くのプログラミング言語でif{}else{}等と書かれる構文で行われる動作条件は[?]。",'分岐','次第','想定','構想');
    
    addQuestion("変数に入れるデータは基本的に値と[?]が求められる。",'型','式','数','枠');

    addQuestion("C、JAVA、PHP、javascriptでのforとは何を行う為の動作であるか",'繰り返し処理','処理の対象を決める','処理の呼び出し元を定義する','処理を停止する');

    addQuestion("例えば画像ファイルの末尾に付けれられたファイルの種類を示すものを何という？",'拡張子','識別子','判別子','終端子');

    //初期表示イベント
    document.addEventListener(
        //Webページが読み込みが完了したとき、ランダムに問題を表示する
        'DOMContentLoaded',function()
        {
            let tmpAry = Questions.concat();
              
            CurrentQuestion = ArrayRandomaizer(Questions);

            setQuestion(0);
        });

    //関数宣言 ランダム
    function ArrayRandomaizer(original){
        //変数宣言
        let tmpAry = original.concat();
        var randomaized = [];
        /*繰り返し処理
        ランダムに問題をセットする
        変数に代入されている問題を次の問題に置き換える
        */
        while(0 < tmpAry.length){
            var set =Math.floor(Math.random()*tmpAry.length);
            randomaized.push(tmpAry[set]);
            tmpAry.splice(set,1); 
        }
        return randomaized;
    }
    //関数宣言 問題表示
    function setQuestion(number){
        //HTML.CSS要素取得、Answers、resultの挿入
        document.querySelector('#Answers').innerHTML = '';
        document.querySelector('#result').innerHTML ='';
        //HTML.CSS要素取得、文字の変換
        if (CurrentQuestion.length <= number){
            document.querySelector('#Sentence').innerHTML = '終了'; 
            return;
        }
        var question = CurrentQuestion[number];
    
        question.selects = ArrayRandomaizer(question.selects);
        document.querySelector('#Sentence').innerHTML = question.sentence;
        

        //繰り返し処理 解答ボタン生成
        for (let i = 0;i < question.selects.length; i++){
            //ボタン生成,css付与
            var button = document.createElement('button');
            button.innerHTML = question.selects[i];
            button.setAttribute('style',' display:block ; min-width:300px;cursor:pointer; margin-top: 5px; ');
            //ボタンクリックイベント処理
            button.addEventListener('click',function(){
                judgeAnswer(number,question.selects[i])
            });
            //解答ボタン内容変更処理
            document.querySelector('#Answers').appendChild(button);
        }
    }
    //関数宣言 結果表示
    function judgeAnswer(number,value){
        document.querySelector('#result').innerHTML = '';
        //条件分岐 問題と答えが等しいか判定
        if(value == CurrentQuestion[number].answer){
            setQuestion(number + 1);
        }
        //等しくなければ不正解
        else{
            document.querySelector('#result').innerHTML = '不正解';
        }
    }
    //上部addQuestionの問題文を挿入
    function addQuestion(sentence,answer,wrong1,wrong2,wrong3){
      Questions.push(new QuestionEntity(sentence,answer,wrong1,wrong2,wrong3));
      //alert(Questions[0].sentence);
    }
    //関数宣言 問題情報取得
    function QuestionEntity(sentence,answer,wrong1,wrong2,wrong3){
        //問題呼び出し
        this.sentence = sentence;
        //答え呼び出し
        this.answer = answer;
        //解答配列呼び出し
        this.selects = [answer,wrong1,wrong2,wrong3];
    }
