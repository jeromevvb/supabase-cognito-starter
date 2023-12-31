<a href="https://demo-nextjs-with-supabase.vercel.app/">
  <img alt="Next.js 13 and app template Router-ready Supabase starter kit." src="https://demo-nextjs-with-supabase.vercel.app/opengraph-image.png">
  <h1 align="center">Supabase starter kit</h1>
</a>

<p align="center">
 This starter configures NextAuth with Cognito and support usage of Supabase Row Level Security. Users sessions are created on Supabase using Supabase Database Adaptator
</p>

<br/>

## Dependencies

- [Next.js App router](https://nextjs.org)
- [supabase-js](https://supabase.com/docs/reference/javascript). Supabase's
  isomorphic JavaScript library.
- [NextAuth](https://next-auth.js.org/) offers authentication with cognito, making the user's session available throughout the entire Next.js app, for both client and server.
- [NextAuth Supabase Adapter](https://authjs.dev/reference/adapter/supabase) insert/updapte/delete the user session in supabase.
- [AWS Cognito](https://ap-southeast-2.console.aws.amazon.com/console/home?region=ap-southeast-2#) with an active user pool

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Rename `.env.local.example` to `.env.local` and update the following:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_JWT_SECRET=
```

can be found in [your Supabase project's API settings](https://app.supabase.com/project/_/settings/api)

```
 NEXT_PUBLIC_COGNITO_CALLBACK_URL=
 COGNITO_CLIENT_ID=
 COGNITO_CLIENT_SECRET=
 COGNITO_ISSUER=https://cognito-idp.{region}.amazonaws.com/{poolID}
```

see [point 4](https://github.com/jeromevvb/supabase-cognito-starter#4-configure-aws-cognito) for configuration.

### 3. Create NextAuth Schema

To configure NextAuth Supabase Adapter with Supabase, please follow the steps describe [here](https://authjs.dev/reference/adapter/supabase). You'll have to make sure you create the new NextAuth schema.

### 4. Configure AWS Cognito

<ol>
  <li>Create a user pool on AWS Cognito with the default settings. </li>
  <li>Once its done, go to App-in-Integration and Add new App client</li>
  <li>Create a Public Client. Allow client secret generation. Add a callback url. (Make sure this callback url is exactly the same as variable NEXT_PUBLIC_COGNITO_CALLBACK_URL)</li> 
  <li>Get the Client ID and Client secret under the App Client Information, Add it to to your .env.local (COGNITO_CLIENT_ID, COGNITO_CLIENT_SECRET)</li>
  <li> Get the Region and Pool ID. User PoolID should be find under `User Pool Overview` and region under Cognito domain. (For ex: .ap-southeast-2). Add it to your .env.local (COGNITO_ISSUER) </li>
  </ol>

```
# An example of Cognito issuer.
COGNITO_ISSUER=https://cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_V9v4hV0sw
```

### 5. You can now run the Next.js local development server:

```bash
npm run dev
```

The starter kit should now be running on [localhost:3000](http://localhost:3000/).

> Check out [the docs for Local Development](https://supabase.com/docs/guides/getting-started/local-development) to also run Supabase locally.

## Usage

In order to benefit from the Row Level Security feature in Supabase, make sure to provide the JWT token in the headers upon client instance creation.

```javascript
import { authConfig } from '@/lib/auth'
import { getServerSession } from 'next/auth'
import { createClient } from '@supabase/supabase-js'

async function getUser() {
  const session = await getServerSession(authConfig)
  const supabaseAccessToken = session?.supabaseAccessToken

  if (!supabaseAccessToken) {
    return null
  }

  const supabase =
    createClient <
    Database >
    (process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      global: {
        headers: { Authorization: `Bearer ${supabaseAccessToken}` },
      },
    })

  const { data, error } = await supabase.from('users').select('*').single()

  if (error) return null

  return data
}
```

## Using encryption feature.

Note that column encryption should only be used in highly sensitive scenarios as it has a meaningful impact on statement performance and flexibility. Supabase projects are already encrypted at rest by default.

Go to Supabase Dashboard -> Project Settings -> Vault -> Encryption key -> Add new key -> Copy your ID.

Add a column with the data type 'text' where encryption is needed.  
RUN SQL command to use encryption on this column using you encryption key id.

```
SECURITY LABEL FOR pgsodium	ON COLUMN public.todos.content
  IS 'ENCRYPT WITH KEY ID c0b1ca7c-8023-4136-a13e-ea1aa7602178';
```

This will create a view decrypted_todos, so you can read decrypted data from it. You'll have to allow RLS to work, as views do not enforce RLS by default.
You'll have to drop the table and add `WITH (security_invoker = true)` to the query.

```
DROP VIEW IF EXISTS public.decrypted_todos;

create view
  public.decrypted_todos as
select
  todos.id,
  todos.created_at,
  todos.content,
  case
    when todos.content is null then null::text
    else case
      when 'c0b1ca7c-8023-4136-a13e-ea1aa7602178' is null then null::text
      else convert_from(
        pgsodium.crypto_aead_det_decrypt (
          decode(todos.content, 'base64'::text),
          convert_to(''::text, 'utf8'::name),
          'c0b1ca7c-8023-4136-a13e-ea1aa7602178'::uuid,
          null::bytea
        ),
        'utf8'::name
      )
    end
  end as decrypted_content,
  todos.user_id
from
  todos;

```

Finally, Allow using pgsodium.crypto_aead_det_decrypt for authenticated roles

```
GRANT EXECUTE ON FUNCTION pgsodium.crypto_aead_det_decrypt (bytea, bytea, uuid, bytea) TO authenticated;
GRANT EXECUTE ON FUNCTION pgsodium.crypto_aead_det_encrypt (bytea, bytea, uuid, bytea) TO authenticated;
```
