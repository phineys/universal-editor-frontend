import jwt
import requests
import time
from datetime import datetime, timedelta

# Replace these with your actual values
client_id = ""
client_secret = ""
technical_account_id = ""
org_id = ""
ims_endpoint = ""
private_key = """-----BEGIN RSA PRIVATE KEY-----
-----END RSA PRIVATE KEY-----"""

# JWT Payload
payload = {
    "iss": org_id,
    "sub": technical_account_id,
    "aud": f"https://{ims_endpoint}/c/{client_id}",
    "exp": datetime.utcnow() + timedelta(minutes=10),
    "https://ims-na1.adobelogin.com/s/ent_aem_cloud_api": True
}

# Generate JWT
token = jwt.encode(payload, private_key, algorithm='RS256')
print('Generated JWT:', token)

# Exchange JWT for Bearer Token
response = requests.post(
    f"https://{ims_endpoint}/ims/exchange/jwt/",
    data={
        'client_id': client_id,
        'client_secret': client_secret,
        'jwt_token': token
    }
)

if response.status_code == 200:
    access_token = response.json().get('access_token')
    print('Bearer Token:', access_token)
else:
    print('Error:', response.content)