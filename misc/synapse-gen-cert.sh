MXDOMAIN=matrix.imago.local

# This script will ask you for a password. This is for your CA key and you need it in the next step, when signing your application certificate with your CA key. You can remove the "-aes256" flag in the first line to create a passwordless key, but it is not advised in production.

# Let this script run, and move the generated *.tls.* files into your synapse home directory and restart synapse.
# For android to recognize this, you need to copy the "ca.crt.pem" file to your phone and go to: "Settings->Security->import from SD card" and select the pem-file.
# This certificate has a "CA-Flag" set to true, otherwise android would not import this file correctly.

openssl genrsa -out ca.key.pem 4096
openssl req -x509 -new -nodes -extensions v3_ca -key ca.key.pem -days 1000 -out ca.crt.pem -sha512
openssl genrsa -out $MXDOMAIN.tls.key 4096
openssl req -new -key $MXDOMAIN.tls.key -out $MXDOMAIN.tls.csr -sha512 -subj "/C=XX/ST=/L=/O=/CN=$MXDOMAIN"
openssl x509 -req -in $MXDOMAIN.tls.csr -CA ca.crt.pem -CAkey ca.key.pem -CAcreateserial -out $MXDOMAIN.tls.crt -days 1000 -sha512