**WELCOME TO MY TRANSLATE API**

> Oficial API URL: https://mytranslate-api.herokuapp.com/
### Translate Route
- **translate/ [POST]**
	> translate your texts

	_needs token_
	response example:
	```json
		{
			text: "hello world",
			result: "Olá Mundo",
			fromLanguage: {
				name: "Inglês",
				shortName: "en"
			},
			toLanguage: {
				name: "Português",
				shortName: "pt"
			}
		}
	```
- **translate/status [GET]**
	> show API status

	response example:
	```json
		{
			message: "Welcome to MyTranslate API",
			online: true
		}
	```
- **translate/languages [GET]**
	> list all languages supports

	response example:
	```json
		[
			{
				name: "Português",
				shortName: "pt"
			},
			{
				name: "Inglês",
				shortName: "en"
			},
		]
	```
### User Route
- **user/authenticate [POST]**
	> authenticate your account to get your Token

	response example:
	```json
		{
			token: "[token here]",
			user: {
				_id: "60ef1a98a44bc21b00627bf5",
				name: "Your Name",
				email: "youremail@test.com",
			}
		}
	```