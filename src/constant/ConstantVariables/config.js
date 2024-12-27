const SERVER_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAtSz2ofLro30oXsQZYImv
jr26be3j/Q4h6+xMBagsLRBuR61sJNo2fPMoSKEY3Sq712+cToQS4fKMrc+xIqYj
dsXUkDLjYY0Dylvl1KIxeTP5xFD/PGmJbDVezDdnbeZwVPGhCKnIS9taN5S2/u6H
j44nI4JlIwQxA1/O//A/IAfj8+1vZxxCWsMPPHJ9SQdYxppeoxVtEqyZr6A4ftds
zNapyPw+UWYBu+xhtQQP3slcBLG1HoHAaIxF5ce47ky1rELrJZLwH/0WL4NmgMh+
8DWymGTEhemI6gsfoeE0IeXhQEMouEwlah3QlSv9mIV/PKVEe7l3+fMdRV2CqHFT
bG5chlnzQsoLQGbaWqeM4l75KvxZQJg0khzHMWprjXDsA77C1m2FyleFNZHfY5Ch
oEvQAGbLInw2Eeq61pmboQtDNBRtr7nt37o6qFMDn4JFQtgIGnlSU0ZKUR5BTiuB
zH5lpArZTd+JmRKjFaqrDybGSZxNC6lizAr5S/n96vgJasaW9xu6VwR71eJbC7i2
gyQEL3EVMBKHqAx9mCZCcRN7kyDCDie1BfLFHZMY+05BAZ/lh6yWiLU/ZmAXPSSZ
afU0VHVG7g3U+Ghxl0VQGOcZi77h3q67Fow1YvcjG1wM5pMXz1i00WubD/xVZixZ
dPuPuaFPdFfa2lhYJXCwUOsCAwEAAQ==
-----END PUBLIC KEY-----`;

export const Config = {
    BASE_URL:'https://matrika.com.omaharoadsideassistance.org/api/front_api.php',
    ContentType : 'application/json',
    Accept:'',
    AuthToken: SERVER_PUBLIC_KEY
}
