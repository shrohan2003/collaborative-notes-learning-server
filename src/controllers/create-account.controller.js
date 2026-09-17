function createAccount(req, res) {
  const { email, password } = req.body ?? {}

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' })
  }

  // will add DB logic
  console.log('email: ' + email + '; password: ' + password)

  res.status(200).json({
    message: 'Account created successfully (FAKE!!!)'
  })
}

module.exports = {
  createAccount
}