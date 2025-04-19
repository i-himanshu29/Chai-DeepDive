## for google
- https://accounts.google.com/.well-known/openid-configuration
- https://www.googleapis.com/oauth2/v3/certs

## for github
- https://token.actions.githubusercontent.com/.well-known/openid-configuration

- jwks => json web key set
- e => Expontent 
- n => native Key
- n+e => Public key
- kid => key id
- kty => key Type
- alg => algorithm

## for google
``` for google
{
  "keys": [
    {
      "kid": "821f3bc66f0751f7840606799b1adf9e9fb60dfb",
      "e": "AQAB",
      "n": "mvcbc7gZu7VixykOM8JawiiNEco0ZJj9mJ3zezm034iO5w7AbLFOXut2zgWc-uOifuJUHHDSbG5Plk8ObhTxgIOD0ar9Qep5BSH1fFBhNPOfDM8h44Ru7O9_IZ7wyijlhDpzXsb403Z6FrIMAPMJJGjHGrc1f2p-_KojzTTlaAjsolrFgq19NAxQx0qrGvQrMeGB7x1iej_9AO65WGDj4xTNoihAsKgVqvARz-kryDetAlaKnpyORDuceYaMRTTUrRJjue8Sa9eSc72n53eAaau8i2MnDsPtyWnRFondswSxesBEujEgmWZui2X_JePvEDk0xnYcc2CjSWRLELy_NQ",
      "kty": "RSA",
      "use": "sig",
      "alg": "RS256"
    },
    {
      "kid": "c7e04465649ffa606557650c7e65f0a87ae00fe8",
      "e": "AQAB",
      "alg": "RS256",
      "n": "7_H7AoQIGB-rZGIhz6ufR4ChFpkPBudrNoXbPHspjtMk1N8db1PbFa-v1yW0Pv8ujm_ewpQQLJz-KxJQz83-euIgMDKhKWc8Wd_lfjRrR0Yq6pr7JHcQDON4twaMno9mHfeFQLkKWId5hl4aQps9TEcm_jsK8MJJbWWKDjKgbMiu0U6-U-CdWbSoy42U3-trO359tTQfD8f8rkK4Ik2O3BtEgXoZ8mFDs84PR6IcYC2R5BN25bCcpK87Ch9KwEsU05c-ykPhH9AB6Ey5riR8gZ93kHxJPe8ZBmFfaWLU--t5IfwJh4g_6vDmFXZaiZm0TpYy7g9r9Vp8FW7OEQ7N1Q",
      "kty": "RSA",
      "use": "sig"
    }
  ]
}

````
 ## for github
````

{
    "issuer": "https://token.actions.githubusercontent.com",
    "jwks_uri": "https://token.actions.githubusercontent.com/.well-known/jwks",
    "subject_types_supported": [
        "public",
        "pairwise"
    ],
    "response_types_supported": [
        "id_token"
    ],
    "claims_supported": [
        "sub",
        "aud",
        "exp",
        "iat",
        "iss",
        "jti",
        "nbf",
        "ref",
        "sha",
        "repository",
        "repository_id",
        "repository_owner",
        "repository_owner_id",
        "enterprise",
        "enterprise_id",
        "run_id",
        "run_number",
        "run_attempt",
        "actor",
        "actor_id",
        "workflow",
        "workflow_ref",
        "workflow_sha",
        "head_ref",
        "base_ref",
        "event_name",
        "ref_type",
        "ref_protected",
        "environment",
        "environment_node_id",
        "job_workflow_ref",
        "job_workflow_sha",
        "repository_visibility",
        "runner_environment",
        "issuer_scope"
    ],
    "id_token_signing_alg_values_supported": [
        "RS256"
    ],
    "scopes_supported": [
        "openid"
    ]
}

````


- Notes for Me: DB is used from email 979 and it is not tested yet