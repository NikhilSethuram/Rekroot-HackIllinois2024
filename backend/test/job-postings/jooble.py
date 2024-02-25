import http.client

host = 'jooble.org'
key = 'e7b5dd39-38ae-427a-9463-ac27a4136e7a'

connection = http.client.HTTPConnection(host)
#request headers
headers = {"Content-type": "application/json"}
#json query
body = '{ "keywords": "software engineer intern", "location": "los angeles"}'
connection.request('POST','/api/' + key, body, headers)
response = connection.getresponse()
print(response.status, response.reason)
print(response.read())
