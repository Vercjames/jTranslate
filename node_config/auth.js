module.exports = {
    'facebookAuth': {
        'clientID' : '495035560673393',
        'clientSecret' : 'f3e0501d47a9320fe6e8d2f314c3dab8',
        'callbackURL' : 'http://localhost:1337/auth/facebook/callback',
        profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified']
    },
    'googleAuth': {
        'clientID' : '798402727416-2dbg7pfc8lqb8doa0rcqjj6aes79d332.apps.googleusercontent.com',
        'clientSecret' : 'GWWGfLQr_WiTiohG4RXO_Op3',
        'callbackURL' : 'http://localhost:2116/auth/google/callback'
    }
};

