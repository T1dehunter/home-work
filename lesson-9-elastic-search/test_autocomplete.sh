#! /bin/bash
echo "Start type for test autocomplete:"

while true
do
 IFS= read -r char
 INPUT=$INPUT$char
 echo $INPUT
 curl --silent --request GET 'http://localhost:9200/en_words_autocomplete/_search' \
 --header 'Content-Type: application/json' \
 --data-raw '{
     "size": 5,
     "query": {
        "multi_match": {
          "query": "'"$INPUT"'",
          "type": "bool_prefix",
          "fields": [
            "en_word",
            "en_word._2gram",
            "en_word._3gram"
          ]
        }
     }
 }' | jq '.hits.hits[]._source.en_word' | grep -i "$INPUT"
done