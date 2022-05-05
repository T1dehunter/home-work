import {fetchNextStarWarsCharacter, postEventToGA} from './src/requests/index.js';


(async () => {
    console.log('START SENDING EVENTS TO GA');
    let sequence = fetchNextStarWarsCharacter();
    for await (let char of sequence) {
        console.log(`Sending event "user likes character: ${char.name}"`);

        const eventName = 'user_likes_star_wars_character';
        const eventData = {character: char.name};

        await postEventToGA({eventName, eventData});
    }
    console.log('END SENDING EVENTS TO GA');
})();