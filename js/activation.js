// ユーザープールの設定
const poolData = {
    UserPoolId : "ca-central-1_FRmct59D6",
    ClientId : "4h96oaphnmcq5kj4b4lunjjitt"
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

/**
 * 画面読み込み時の処理
 */
$(document).ready(function() {
	
	// Amazon Cognito 認証情報プロバイダーの初期化
	AWSCognito.config.region = 'ca-central-1'; // リージョン
	AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
	    IdentityPoolId: "ca-central-1:beb666a5-8d72-44ae-9cd7-91a7d6e732ba"
	});
	
	// 「Activate」ボタン押下時
	$("#activationButton").click(function(event) {
	    activate();
	});
});

/**
 * アクティベーション処理
 */
var activate = function() {

    var email = $("#email").val();
    var activationKey = $("#activationKey").val();
    
    // 何か1つでも未入力の項目がある場合、処理を中断
    if (!email | !activationKey) {
        return false;
    } 
	
    var userData = {
        Username : email,
        Pool : userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    
    // アクティベーション処理
    cognitoUser.confirmRegistration(activationKey, true, function(err, result){
        if (err) {
            // アクティベーション失敗の場合、エラーメッセージを画面に表示
            if (err.message != null) {
                $("div#message span").empty();
                $("div#message span").append(err.message);
            }
        } else {
            // アクティベーション成功の場合、サインイン画面に遷移
        }
    });
};