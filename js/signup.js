// ユーザープールの設定
const poolData = {
    UserPoolId : "ca-central-1_FRmct59D6",
    ClientId : "4h96oaphnmcq5kj4b4lunjjitt"
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

var attributeList = [];

/**
 * 画面読み込み時の処理
 */
$(document).ready(function() {
		
	// Amazon Cognito 認証情報プロバイダーの初期化
	AWSCognito.config.region = 'ca-central-1'; // リージョン
	AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
	    IdentityPoolId: "ca-central-1:beb666a5-8d72-44ae-9cd7-91a7d6e732ba"
	});
		    
	// 「Create Account」ボタン押下時
	$("#createAccount").click(function(event) {
	    signUp();
	});
});

/**
 * サインアップ処理。
 */
var signUp = function() {
			
	var username = $("#email").val();
	var lastName = $("#lastName").val();
	var firstName = $("#firstName").val();
	var password = $("#password").val();
			
	// 何か1つでも未入力の項目がある場合、処理終了
    if (!username | !lastName | !firstName | !password) { 
    	return false; 
    }
		    
    // ユーザ属性リストの生成
	var dataEmail = {
		Name : "email",
		Value : username
	}
	var dataFamilyName = {
		Name : "family_name",
		Value : lastName
	}
	var dataGivenName = {
		Name : "given_name",
		Value : firstName
	}
	var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
	var attributeFamilyName = new AmazonCognitoIdentity.CognitoUserAttribute(dataFamilyName);
	var attributeGivenName = new AmazonCognitoIdentity.CognitoUserAttribute(dataGivenName);
	
	attributeList.push(attributeEmail);		
    attributeList.push(attributeFamilyName);
    attributeList.push(attributeGivenName);
			
    // サインアップ処理
    userPool.signUp(username, password, attributeList, null, function(err, result){
	    if (err) {
	    	alert(err);
			return;
	    } else {
	      	// サインアップ成功の場合、アクティベーション画面に遷移する
	    }
    });
}