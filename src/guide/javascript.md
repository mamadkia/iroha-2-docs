# JavaScript / TypeScript guide

## 1. Iroha 2 Client Setup

The Iroha 2 JavaScript library consists of multiple packages:

| Package                                                   | Description                                                                                                                                        |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `client`                                                  | Submits requests to Iroha Peer                                                                                                                     |
| `data-model`                                              | Provides [SCALE](https://github.com/paritytech/parity-scale-codec) (Simple Concatenated Aggregate Little-Endian)-codecs for the Iroha 2 Data Model |
| `crypto-core`                                             | Contains cryptography types                                                                                                                        |
| `crypto-target-node`                                      | Compiled crypto WASM ([Web Assembly](https://webassembly.org/)) for the Node.js environment                                                        |
| `crypto-target-web`                                       | Compiled crypto WASM for native Web (ESM)                                                                                                          |
| <code class="whitespace-pre">crypto-target-bundler</code> | Compiled crypto WASM to use with bundlers such as Webpack                                                                                          |

All of the are published under scope `@iroha2` into Iroha Nexus Registry. In future, they will be published in the main NPM Registry. To install these packages, firstly you need to setup a registry:

```ini
# .npmrc
@iroha2:registry=https://nexus.iroha.tech/repository/npm-group/
```

Then you can install these packages as any other NPM package:

```bash
npm i @iroha2/client
yarn add @iroha2/data-model
pnpm add @iroha2/crypto-target-web
```

The set of packages that you need to install depends on your intention. Maybe you only need to play with the Data Model to perform (de-)serialisation, in which case the `data-model` package is enough. Maybe you only need to check on a peer in terms of status/health, thus need only the client library, because this API doesn't require any interactions with crypto or Data Model. For the purposes of this tutorial, it’s better to install everything, however, in general the packages are maximally decoupled, so you can minimise the footprint.

Moving on, if you are planning to use the Transaction or Query API, you’ll also need to inject an appropriate `crypto` instance into the client at runtime. This has to be adjusted depending on your particular environment. For example, for Node.js users, such an injection may look like the following:

```ts
import { crypto } from `@iroha2/crypto-target-node`
import { setCrypto } from `@iroha2/client`

setCrypto(crypto)
```

::: info

Please refer to the related `@iroha2/crypto-target-*` package documentation because it may require some specific configuration. For example, the `web` target requires to call an asynchronous `init()` function before usage of `crypto`.

:::

## 2. Configuring Iroha 2

The JavaScript Client is fairly low-level in the sense that it doesn’t expose any convenience features like a `TransactionBuilder` or a `ConfigBuilder`. Work on implementing those is underway, and these features will very likely be available with the second round of this tutorial’s release. Thus, on the plus side: configuration of the client is simple, on the negative side you have to prepare a lot is done manually.

A basic client setup looks straightforward:

```ts
import { Client } from '@iroha2/client'

const client = Client.create({
  torii: {
    // specify it if you want to use Transactions API,
    // Query API, Events API or health check
    apiURL: 'http://127.0.0.1:8080',

    // specify it if you want to perform status check
    statusURL: 'http://127.0.0.1:8081',
  },
})
```

That's enough to perform health or status check, but if you need to use transactions or queries, you’ll need to prepare a key pair.

Let's assume that you have stringified public & private keys, more on that later. Thus, a key-pair generation could look like this:

```ts
import { crypto } from '@iroha2/crypto-target-node'
import { KeyPair } from '@iroha2/crypto-core'

// just some package for hex-bytes transform
import { hexToBytes } from 'hada'

function generateKeyPair(params: {
  publicKeyMultihash: string
  privateKey: {
    digestFunction: string
    payload: string
  }
}): KeyPair {
  const multihashBytes = Uint8Array.from(
    hexToBytes(params.publicKeyMultihash),
  )
  const multihash = crypto.createMultihashFromBytes(multihashBytes)
  const publicKey = crypto.createPublicKeyFromMultihash(multihash)
  const privateKey = crypto.createPrivateKeyFromJsKey(params.privateKey)

  const keyPair = crypto.createKeyPairFromKeys(publicKey, privateKey)

  // don't forget to "free" created structures
  for (const x of [publicKey, privateKey, multihash]) {
    x.free()
  }

  return keyPair
}

const kp = generateKeyPair({
  publicKeyMultihash:
    'ed0120e555d194e8822da35ac541ce9eec8b45058f4d294d9426ef97ba92698766f7d3',
  privateKey: {
    digestFunction: 'ed25519',
    payload:
      'de757bcb79f4c63e8fa0795edc26f86dfdba189b846e903d0b732bb644607720e555d194e8822da35ac541ce9eec8b45058f4d294d9426ef97ba92698766f7d3',
  },
})
```

## 3. Registering a Domain

Here we see how similar the JavaScript code is to the Rust counterpart. It should be emphasised that the JavaScript library is a thin wrapper: It doesn’t provide any special builder structures, meaning you have to work with bare-bones compiled Data Model structures and define all internal fields explicitly. Doubly so, since JavaScript employs many implicit conversions, we highly recommend that you employ typescript. This makes many errors far easier to debug, but unfortunately results in more boiler-plate.

Let’s register a new domain with the name `looking_glass` our current account: _alice@wondeland_.

```ts
import { Client } from '@iroha2/client'
import { KeyPair } from '@iroha2/crypto-core'
import {
  AccountId,
  Expression,
  IdentifiableBox,
  Instruction,
  OptionU32,
  QueryBox,
  QueryPayload,
  RegisterBox,
  TransactionPayload,
  Value,
} from '@iroha2/data-model'

const client: Client = /* snip */ ___
const KEY_PAIR: KeyPair = /* snip */ ___
const ACCOUNT_ID = AccountId.defineUnwrap({
  name: 'Alice',
  domain_name: 'Wonderland',
})
```

To register a new domain, we need to submit a transaction with one instruction: to register a new domain. Let’s wrap it all in an async function:

```ts
async function registerDomain(domainName: string) {
  const registerBox = RegisterBox.defineUnwrap({
    object: {
      expression: Expression.variantsUnwrapped.Raw(
        Value.variantsUnwrapped.Identifiable(
          IdentifiableBox.variantsUnwrapped.Domain({
            name: domainName,
            accounts: new Map(),
            metadata: {
              map: new Map(),
            },
            asset_definitions: new Map(),
          }),
        ),
      ),
    },
  })

  const instruction = Instruction.variantsUnwrapped.Register(registerBox)

  const payload = TransactionPayload.defineUnwrap({
    account_id: ACCOUNT_ID,
    instructions: [instruction],
    time_to_live_ms: 100_000n,
    creation_time: BigInt(Date.now()),
    metadata: new Map(),
    nonce: OptionU32.variantsUnwrapped.None,
  })

  await client.submitTransaction({
    payload: TransactionPayload.wrap(payload),
    signing: KEY_PAIR,
  })
}
```

Which we use to register the domain like so:

```ts
await registerDomain('looking_glass')
```

We can also ensure that new domain is created using Query API. Let’s create another function that wraps that functionality:

```ts
async function ensureDomainExistence(domainName: string) {
  const result = await client.makeQuery({
    payload: QueryPayload.wrap({
      query: QueryBox.variantsUnwrapped.FindAllDomains(null),
      timestamp_ms: BigInt(Date.now()),
      account_id: ACCOUNT_ID,
    }),
    signing: KEY_PAIR,
  })

  const domain = result
    .as('Ok')
    .unwrap()
    .as('Vec')
    .map((x) => x.as('Identifiable').as('Domain'))
    .find((x) => x.name === domainName)

  if (!domain) throw new Error('Not found')
}
```

Now you can ensure that domain is created by calling:

```ts
await ensureDomainExistence('looking_glass')
```

## 4. Registering an Account

Registering an account is a bit more involved than registering a domain. With a domain, the only concern is the domain name, however, with an account, there are a few more things to worry about.

First of all, we need to create an `AccountId`. Note, that we can only register an account to an existing domain. The best UX design practices dictate that you should check if the requested domain exists _now_, and if it doesn’t — suggest a fix to the user. After that, we can create a new account, that we name _late_bunny._

```ts
import { AccountId } from '@iroha2/data-model'

const id = AccountId.defineUnwrap({
  name: 'late_bunny',
  domain_name: 'looking_glass',
})
```

Second, you should provide the account with a public key. It is tempting to generate both it and the private key at this time, but it isn't the brightest idea. Remember, that _the late_bunny_ trusts _you, alice@wonderland,_ to create an account for them in the domain _looking_glass, **but doesn't want you to have access to that account after creation**._ If you gave _late_bunny_ a key that you generated yourself, how would they know if you don't have a copy of their private key? Instead, the best way is to **ask** _late_bunny_ to generate a new key-pair, and give you the public half of it.

```ts
import { PublicKey } from '@iroha2/data-model'

const key = PublicKey.defineUnwrap({
  payload: new Uint8Array([
    /* ... */
  ]),
  digest_function: 'some_digest',
})
```

Only then do we build an instruction from it:

```ts
import {
  RegisterBox,
  Expression,
  Value,
  IdentifiableBox,
} from '@iroha2/data-model'

RegisterBox.defineUnwrap({
  object: {
    expression: Expression.variantsUnwrapped.Raw(
      Value.variantsUnwrapped.Identifiable(
        IdentifiableBox.variantsUnwrapped.NewAccount({
          id,
          signatories: [key],
          metadata: { map: new Map() },
        }),
      ),
    ),
  },
})
```

Which is then wrapped in a transaction and submitted to the peer as in the previous section.

## 5. Registering and minting assets

Now we must talk a little about assets. Iroha has been built with few underlying assumptions about what the assets need to be. The assets can be fungible (every £1 is exactly the same as every other £1), or non-fungible (a £1 bill signed by the Queen of Hearts is not the same as a £1 bill signed by the King of Spades), mintable (you can make more of them) and non-mintable (you can only specify their initial quantity in the genesis block). Additionally, the assets have different underlying value types.

Specifically, we have `AssetValueType::Quantity` which is effectively an unsigned 32-bit integer, a `BigQuantity` which is an unsigned 128 bit integer, which is enough to trade all possible IPV6 addresses, and quite possibly individual grains of sand on the surface of the earth and `Fixed`, which is a positive (though signed) 64-bit fixed-precision number with nine significant digits after the decimal point. It doesn't quite use binary-coded decimal for performance reasons. All three types can be registered as either **mintable** or **non-mintable**.

In JS, you can create a new asset with the following instruction:

```ts
const time = AssetDefinition.defineUnwrap({
  value_type: AssetValueType.variantsUnwrapped.Quantity,
  id: {
    name: 'time',
    domain_name: 'looking_glass',
  },
  metadata: { map: new Map() },
  mintable: false,
})

const register = RegisterBox.defineUnwrap({
  object: {
    expression: Expression.variantsUnwrapped.Raw(
      Value.variantsUnwrapped.Identifiable(
        IdentifiableBox.variantsUnwrapped.AssetDefinition(time),
      ),
    ),
  },
})
```

Pay attention to that we have defined the asset as `mintable: false`. What this means is that we cannot create more of `time`. The late bunny will always be late, because even the super-user of the blockchain cannot mint more of `time` than already exists in the genesis block.

This means that no matter how hard the _late_bunny_ tries, the time that he has is the time that was given to him at genesis. And since we haven’t defined any time in the domain _looking_glass at_ genesis and defined time in a non-mintable fashion afterwards, the _late_bunny_ is doomed to always be late.

We can however mint a pre-existing `mintable: true` asset that belongs to Alice.

```ts
const mint = MintBox.defineUnwrap({
  object: {
    expression: Expression.variantsUnwrapped.Raw(
      Value.variantsUnwrapped.U32(42),
    ),
  },
  destination_id: {
    expression: Expression.variantsUnwrapped.Raw(
      Value.variantsUnwrapped.Id(
        IdBox.variantsUnwrapped.AssetDefinitionId({
          name: 'roses',
          domain_name: 'wonderland',
        }),
      ),
    ),
  },
})
```

Again it should be emphasised that an Iroha 2 network is strongly typed. You need to take special care to make sure that only unsigned integers are passed to the `Value.variantsUnwrapped.U32` factory method. Fixed precision values also need to be taken into consideration. Any attempt to add to or subtract from a negative Fixed-precision value will result in an error.

## 6. Visualizing outputs

Finally, we should talk about visualising data. The Rust API is currently the most complete in terms of available queries and instructions. After all, this is the language in which Iroha 2 was built.

Let's build simple Vue 3 Listener component that uses Events API to catch pipeline events and renders them!

::: info

The example above uses Composition API + `<script setup>` syntax.

:::

In our component we will render a button to toggle listening state, and a list with registered events. Our events filter is set up to catch any transaction status change.

```ts
import { SetupEventsReturn } from '@iroha2/client'
import {
  EntityType,
  EventFilter,
  OptionEntityType,
  OptionHash,
} from '@iroha2/data-model'
import { shallowReactive, shallowRef, computed } from 'vue'
import { bytesToHex } from 'hada'

// Let's assume that you already have initialized client
import { client } from '../client'

// Where and how to store collected events

type EventData = {
  hash: string
  status: string
}

const events = shallowReactive<EventData[]>([])

const currentListener = shallowRef<null | SetupEventsReturn>(null)

const isListening = computed(() => !!currentListener.value)

async function startListening() {
  currentListener.value = await client.listenForEvents({
    filter: EventFilter.wrap(
      EventFilter.variantsUnwrapped.Pipeline({
        entity: OptionEntityType.variantsUnwrapped.Some(
          EntityType.variantsUnwrapped.Transaction,
        ),
        hash: OptionHash.variantsUnwrapped.None,
      }),
    ),
  })

  currentListener.value.ee.on('event', (event) => {
    const { hash, status } = event.unwrap().as('Pipeline')

    events.push({
      hash: bytesToHex([...hash]),
      status: status.match({
        Validating: () => 'validating',
        Committed: () => 'committed',
        Rejected: (_reason) => 'rejected with some reason',
      }),
    })
  })
}

function stopListening() {
  currentListener.value?.close()
  currentListener.value = null
}
```

And finally, our component’s template:

```vue-html
<div>
  <p>
    <button v-if="isListening" @click="stopListening">
      Stop listening
    </button>
    <button v-else @click="startListening">Listen</button>
  </p>

  <p>Events:</p>

  <ul>
    <li v-for="{ hash, status } in events">
      Transaction
      <code>{{ hash }}</code> status: {{ status }}
    </li>
  </ul>
</div>
```

That’s it! Here is a small demo with usage of this component:

<div class="border border-solid border-gray-300 rounded-md">

![Output visualization](/img/javascript-output.gif)

</div>
