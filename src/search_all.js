import elasticSearch from 'elasticsearch'
import awsHttpClient from 'http-aws-es'
import AWS from 'aws-sdk'

AWS.config.region = 'us-east-1'

const client = new elasticSearch.Client({
  host:
    'https://search-movies-pr2bfjoksbrbywtu3apeb2dvhm.us-east-1.es.amazonaws.com',
  connectionClass: awsHttpClient,
  awsConfig: {
    credentials: {
      accessKeyId: 'AKIAJ7INFCW75AJZULIA',
      secretAccessKey: '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'
    },
    region: 'us-east-1'
  },
  apiVersion: '7.4'
})

const run = async () => {
  await client.indices.create(
    {
      index: 'tweets',
      body: {
        mappings: {
          properties: {
            id: {
              type: 'integers'
            },
            text: {
              type: 'text'
            },
            user: {
              type: 'keyword'
            },
            time: {
              type: 'date'
            }
          }
        }
      }
    },
    {
      ignore: [400]
    }
  )

  const dataset = [
    {
      id: 1,
      text: "If I fall, don't bring me back.",
      user: 'jon',
      date: new Date()
    },
    {
      id: 2,
      text: 'Witer is coming',
      user: 'ned',
      date: new Date()
    },
    {
      id: 3,
      text: 'A Lannister always pays his debts.',
      user: 'tyrion',
      date: new Date()
    },
    {
      id: 4,
      text: 'I am the blood of the dragon.',
      user: 'daenerys',
      date: new Date()
    },
    {
      id: 5, // change this value to a string to see the bulk response with errors
      text: "A girl is Arya Stark of Winterfell. And I'm going home.",
      user: 'arya',
      date: new Date()
    }
  ]
}

run().catch(console.log)
