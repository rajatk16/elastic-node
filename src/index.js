import elasticSearch from '@elastic/elasticsearch'

import inventories from './data.json'

const esClient = new elasticSearch.Client({
  node: 'http://ec2-3-236-197-190.compute-1.amazonaws.com:9200/'
})


const bulkIndex = async (index, type, data) => {
  const bulkBody = []

  data.forEach((item) => {
    bulkBody.push({
      index: {
        _index: index,
        _type: type,
        _id: item.id
      }
    })
    bulkBody.push(item)
  })
  try {
    await esClient.bulk({ body: bulkBody })
    console.log(`Successfully indexed this item`)
  } catch (error) {
    console.log(error)
  }
}

const test = () => {
  console.log(`${inventories.length} items parsed from data file`)
  bulkIndex('inventory-store-5', 'products', inventories)
}

test()
