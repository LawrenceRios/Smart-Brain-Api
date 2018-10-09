
const handleSignin = (req, res, db, bcrypt) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json('incorrect email or password');
	}

	db.select('email', 'hash').from('login')
	.where('email', '=', email)
	.then(data => {
		if (bcrypt.compareSync(password, data[0].hash)) {
			return db.select('*').from('users')
				.where('email', '=', email)
				.then(user => {
					res.json(user[0]);
				})
				.catch(err => res.status(400).json('unable to get user'));
		} else {
			res.status(400).json('wrong credentials');
		}
	})
	.catch(er => res.status(400).json('wrong credentials'));
}

module.exports = {
	handleSignin: handleSignin
}