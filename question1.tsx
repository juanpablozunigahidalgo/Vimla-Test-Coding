import * as api from './api';

export class Solution implements api.SolutionInterface {
  private api: api.APICaller;

  constructor(api: api.APICaller) {
    this.api = api;
    console.log('Press run code to see this in the console!')
    // You can initiate and calculate things here
  }

  /**
   * Return the day which you buy silver. The first day has number zero.
   * This method is called first, and only once.
   * 
   * 
   * @return {number (integer)}
   */
  getBuyDay(): number {
    // Write your code here
    const numDays = this.api.getNumDays();
    let minPriceDay=0; 
    let minPrice = this.api.getPriceOnDay(0);
    
    //Loop throudh all days to find the minimium price day to buy
    for (let i = 1 ; i < numDays ; i++) { // Stop at numDays -1 to ensure sell day exists
    const price = this.api.getPriceOnDay(i); 
    if ( price < minPrice) {
      minPrice = price;
      minPriceDay = i ; 
     }
    }

    return minPriceDay ;
  }

  /**
   * Return the day to sell silver on. This day has to be after (greater
   * than) the buy day. The first day has number zero (although this is not
   * a valid sell day). This method is called second, and only once.
   * 
   * 
   * @return {number (integer)}
   */
 getSellDay(): number {
    const numDays = this.api.getNumDays();
    const buyDay = this.getBuyDay();
    
    // Start from the day after the buy day
    let maxPriceDay = -1; // Initialize to -1 to indicate no valid sell day
    let maxPrice = Number.NEGATIVE_INFINITY; // Start with the lowest possible price
    
    // Loop through all days after the buy day
    for (let i = buyDay + 1; i < numDays; i++) {
        const price = this.api.getPriceOnDay(i);
        // Check if the current price is greater than the max price found
        if (price > maxPrice) {
            maxPrice = price;
            maxPriceDay = i; // Update the best day to sell
        }
    }

    return maxPriceDay; // Will return -1 if no valid sell day is found
} 
};
