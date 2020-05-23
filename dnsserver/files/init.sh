#!/bin/bash
if [ "$DEFAULT_DNS_DOMAIN" = "" ];
then 
	DEFAULT_DNS_DOMAIN=example.local
fi

cp /root/forward.example.local /etc/bind/forward.$DEFAULT_DNS_DOMAIN
cp /root/named.conf.local /etc/bind/named.conf.local
cp /root/named.conf.options /etc/bind/named.conf.options
cp /root/reverse.example.local /etc/bind/reverse.$DEFAULT_DNS_DOMAIN

sed -i "s/DEFAULT_DNS_DOMAIN/$DEFAULT_DNS_DOMAIN/g" /etc/bind/*

HOST_IP=`ifconfig eth0 |egrep netmask |sed -E "s/[a-zA-Z]*//g" |sed "s/   /|/g" |cut -d "|" -f4`
sed -i "s/HOST_IP/$HOST_IP/g" /etc/bind/*

echo DEFAULT_DNS_DOMAIN: $DEFAULT_DNS_DOMAIN
echo HOST_IP: $HOST_IP

/usr/sbin/named
while sleep 2; do
	ps aux |grep named |grep -q -v grep
	if [ $? -ne 0 ];
	then
		echo "Bind process has already exited."
		exit 1
	fi
done