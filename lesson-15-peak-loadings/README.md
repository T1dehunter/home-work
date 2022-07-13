### Analysis peak loadings for https://www.goal.com/en

1) main page https://www.goal.com/en
    
    When:
   - Important events - semi-finals, finals

    Solutions:
    - Pre increase resources



2) live-scores page https://www.goal.com/en/live-scores

   When:
   - Important events - semi-finals, finals

   Solutions:
   - Caching data using fast storage(redis etc) on event time
   - May be using lightweight websockets or push events for update data



3) match page https://www.goal.com/en/match/sweden-v-switzerland/evg8t4vsqyf7hf60qn9fub7ro

   When:
   - News
   - Important events - semi-finals, finals

   Solutions:
   - Caching data using fast storage(redis etc) on event time
   - Increase resources for geo mirrors (if needed)



4) breaking news page https://www.goal.com/en/news/1

   When:
   - Important events - semi-finals, finals

   Solutions:
   - Using caching static files




5) team page https://www.goal.com/en/team/manchester-united/6eqit8ye8aomdsrrq0hk3v7gh
 
   When:
   - News
   - Important events - semi-finals, finals

   Solutions:
   - Caching static files

