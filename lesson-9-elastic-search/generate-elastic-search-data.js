const fs = require('fs');

const getFileContent = (filePath) => {
    const fileContent = fs.readFileSync(filePath, {encoding:'utf8', flag:'r'});
    return fileContent;
};

const writeFileContent = (filePath, content) => {
    fs.writeFileSync(filePath, `${content}\n`, {flag:'w+'});
};

const convertTextToElasticData = (text) => {
    const commands = text.split('\n').map((line, index) => {
        const id = index + 1;
        const elasticIndex = `{"create" : { "_index" : "english_words", "_id" : ${id}}}`;
        const elasticData = `{"id": ${id}, "en_word" : "${line}"}`;
        return [elasticIndex, elasticData].join('\n');
    }).join('\n');
    return commands;
};

(() => {
    const fileContent = getFileContent('./english_words.txt');
    const elasticSearchData = convertTextToElasticData(fileContent);

    writeFileContent('./elastic_search_data.txt', elasticSearchData)
})();
